import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
  const prevSurfaceDetected = useRef(false);

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
        const mat = reticleRef.current.matrix;
        const pos = new THREE.Vector3();
        const quat = new THREE.Quaternion();
        const scale = new THREE.Vector3();
        mat.decompose(pos, quat, scale);

        // Attempt WebXR Anchor creation for millimeter-precision drift-free anchoring
        if (lastHitRef.current && typeof lastHitRef.current.createAnchor === 'function') {
          lastHitRef.current.createAnchor().then((anchor) => {
            anchorRef.current = anchor;
          }).catch((err) => {
            console.warn('XRAnchor creation fallback to pose:', err);
          });
        }

        if (onPlace) {
          onPlace([pos.x, pos.y, pos.z], quat);
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
        const anchorQuat = new THREE.Quaternion(aOri.x, aOri.y, aOri.z, aOri.w);

        if (onAnchorUpdate) {
          onAnchorUpdate([aPos.x, aPos.y, aPos.z], anchorQuat);
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
          reticleRef.current.visible = true;

          // Decompose pose matrix into position and orientation
          const rawMat = new THREE.Matrix4().fromArray(pose.transform.matrix);
          const rawPos = new THREE.Vector3();
          const rawQuat = new THREE.Quaternion();
          const rawScale = new THREE.Vector3();
          rawMat.decompose(rawPos, rawQuat, rawScale);

          targetPos.current.copy(rawPos);
          targetQuat.current.copy(rawQuat);

          if (!hasFirstPose.current) {
            currentPos.current.copy(rawPos);
            currentQuat.current.copy(rawQuat);
            hasFirstPose.current = true;
          } else {
            // Smooth damping to eliminate jitter on reflective tiles or low-texture floors
            currentPos.current.lerp(targetPos.current, 0.45);
            currentQuat.current.slerp(targetQuat.current, 0.45);
          }

          reticleRef.current.matrix.compose(
            currentPos.current,
            currentQuat.current,
            new THREE.Vector3(1, 1, 1)
          );

          if (!prevSurfaceDetected.current) {
            prevSurfaceDetected.current = true;
            if (onSurfaceStatusChange) onSurfaceStatusChange(true);
          }
        }
      } else {
        reticleRef.current.visible = false;
        hasFirstPose.current = false;
        if (prevSurfaceDetected.current) {
          prevSurfaceDetected.current = false;
          if (onSurfaceStatusChange) onSurfaceStatusChange(false);
        }
      }
    }
  });

  return null;
}
