import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Reusable scratch math objects to guarantee zero GC allocations during 60-120Hz XR frame loops
const _rawMat = new THREE.Matrix4();
const _rawPos = new THREE.Vector3();
const _rawQuat = new THREE.Quaternion();
const _rawScale = new THREE.Vector3();
const _anchorQuat = new THREE.Quaternion();
const _unitScale = new THREE.Vector3(1, 1, 1);
const _selectPos = new THREE.Vector3();
const _selectQuat = new THREE.Quaternion();
const _selectScale = new THREE.Vector3();
const _surfaceNormal = new THREE.Vector3();

export default function WebXRHitTestManager({
  active,
  placed,
  onPlace,
  onAnchorUpdate,
  onSurfaceStatusChange,
  onTrackingStateChange,
  reticleRef,
}) {
  const { gl } = useThree();
  const hitTestSourceRef = useRef(null);
  const localRefSpaceRef = useRef(null);
  const lastHitRef = useRef(null);
  const anchorRef = useRef(null);

  // Damping targets for smooth reticle tracking across low-texture or reflective floors
  const targetPos = useRef(new THREE.Vector3());
  const targetQuat = useRef(new THREE.Quaternion());
  const currentPos = useRef(new THREE.Vector3());
  const currentQuat = useRef(new THREE.Quaternion());
  const hasFirstPose = useRef(false);
  const prevSurfaceStatus = useRef('none');

  useEffect(() => {
    if (!active) {
      anchorRef.current = null;
      lastHitRef.current = null;
      hasFirstPose.current = false;
      return;
    }

    const session = gl.xr?.getSession?.();
    if (!session) return;

    let hitSource = null;

    // 1. Request viewer reference space for raycasting from camera center
    session.requestReferenceSpace('viewer').then((viewerSpace) => {
      session.requestHitTestSource({ space: viewerSpace }).then((source) => {
        hitSource = source;
        hitTestSourceRef.current = source;
      }).catch((err) => {
        console.warn('Hit test source request error:', err);
      });
    }).catch((err) => {
      console.warn('Viewer reference space request error:', err);
    });

    // 2. Request local-floor reference space for real-world horizontal surface coordinates
    session.requestReferenceSpace('local-floor').then((refSpace) => {
      localRefSpaceRef.current = refSpace;
    }).catch(() => {
      session.requestReferenceSpace('local').then((refSpace) => {
        localRefSpaceRef.current = refSpace;
      }).catch(() => {});
    });

    // 3. Listen for screen tap to anchor Lord Ganesha onto the detected surface
    const handleSelect = () => {
      if (reticleRef.current && reticleRef.current.visible) {
        // Enforce accurate plain surface calculation: only anchor on true horizontal floor/table surfaces
        if (reticleRef.current.userData && reticleRef.current.userData.isValidSurface === false) {
          return;
        }

        reticleRef.current.matrix.decompose(_selectPos, _selectQuat, _selectScale);

        // Attempt WebXR Anchor creation for millimeter-precision drift-free anchoring
        if (lastHitRef.current && typeof lastHitRef.current.createAnchor === 'function') {
          lastHitRef.current.createAnchor().then((anchor) => {
            anchorRef.current = anchor;
          }).catch((err) => {
            console.warn('XRAnchor creation fallback to pose:', err);
          });
        }

        if (onPlace) {
          onPlace([_selectPos.x, _selectPos.y, _selectPos.z], _selectQuat.clone());
        }
      }
    };

    session.addEventListener('select', handleSelect);

    return () => {
      if (hitSource) {
        try {
          hitSource.cancel();
        } catch {}
        hitTestSourceRef.current = null;
      }
      session.removeEventListener('select', handleSelect);
      anchorRef.current = null;
      lastHitRef.current = null;
    };
  }, [active, gl.xr, onPlace, reticleRef]);

  // Query real-world surface hit results and track anchors on every XR frame
  useFrame((state, delta, frame) => {
    if (!active || !frame) return;

    const referenceSpace = localRefSpaceRef.current || gl.xr.getReferenceSpace();
    if (!referenceSpace) return;

    // Track active XRAnchor once placed for zero-drift lock
    if (placed && anchorRef.current) {
      if (frame.trackedAnchors && !frame.trackedAnchors.has(anchorRef.current)) {
        if (onTrackingStateChange) onTrackingStateChange('lost');
        return;
      }

      const anchorPose = frame.getPose(anchorRef.current.anchorSpace, referenceSpace);
      if (anchorPose) {
        const aPos = anchorPose.transform.position;
        const aOri = anchorPose.transform.orientation;
        _anchorQuat.set(aOri.x, aOri.y, aOri.z, aOri.w);

        if (onAnchorUpdate) {
          onAnchorUpdate([aPos.x, aPos.y, aPos.z], _anchorQuat);
        }
        if (onTrackingStateChange) {
          const trackingState = anchorRef.current.trackingState || 'tracking';
          onTrackingStateChange(trackingState);
        }
      }
      return;
    }

    // Unplaced state: query hit test results from ARCore
    if (!placed && hitTestSourceRef.current && reticleRef.current) {
      const hitTestResults = frame.getHitTestResults(hitTestSourceRef.current);
      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        lastHitRef.current = hit;
        const pose = hit.getPose(referenceSpace);

        if (pose) {
          // Decompose pose matrix into position and orientation using reusable objects
          _rawMat.fromArray(pose.transform.matrix);
          _rawMat.decompose(_rawPos, _rawQuat, _rawScale);

          // Calculate surface normal vector to distinguish horizontal floors/tables from vertical walls
          _surfaceNormal.set(0, 1, 0).applyQuaternion(_rawQuat);
          // Normal.y > 0.72 corresponds to within ~44° of true vertical ground
          const isHorizontal = _surfaceNormal.y > 0.72;

          targetPos.current.copy(_rawPos);
          targetQuat.current.copy(_rawQuat);

          if (!hasFirstPose.current) {
            currentPos.current.copy(_rawPos);
            currentQuat.current.copy(_rawQuat);
            hasFirstPose.current = true;
          } else {
            // Smooth damping to eliminate jitter on reflective tiles or low-texture floors
            currentPos.current.lerp(targetPos.current, 0.45);
            currentQuat.current.slerp(targetQuat.current, 0.45);
          }

          reticleRef.current.matrix.compose(
            currentPos.current,
            currentQuat.current,
            _unitScale
          );
          reticleRef.current.visible = true;

          if (!reticleRef.current.userData) reticleRef.current.userData = {};
          reticleRef.current.userData.isValidSurface = isHorizontal;

          const statusString = isHorizontal ? 'horizontal' : 'vertical_wall';
          if (prevSurfaceStatus.current !== statusString) {
            prevSurfaceStatus.current = statusString;
            if (onSurfaceStatusChange) onSurfaceStatusChange(isHorizontal, statusString);
          }
        }
      } else {
        reticleRef.current.visible = false;
        hasFirstPose.current = false;
        if (reticleRef.current.userData) reticleRef.current.userData.isValidSurface = false;
        if (prevSurfaceStatus.current !== 'none') {
          prevSurfaceStatus.current = 'none';
          if (onSurfaceStatusChange) onSurfaceStatusChange(false, 'none');
        }
      }
    }
  });

  return null;
}
