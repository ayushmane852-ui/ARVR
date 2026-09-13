import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WebXRHitTestManager({
  active,
  placed,
  onPlace,
  reticleRef,
}) {
  const { gl } = useThree();
  const hitTestSourceRef = useRef(null);
  const localRefSpaceRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const session = gl.xr?.getSession?.();
    if (!session) return;

    let hitSource = null;

    // 1. Request viewer reference space for raycasting from the center of camera viewport
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
        if (onPlace) {
          onPlace([pos.x, pos.y, pos.z]);
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
    };
  }, [active, gl.xr, onPlace, reticleRef]);

  // Query real-world surface hit results from ARCore on every XR frame
  useFrame((state, delta, frame) => {
    if (!active || placed || !frame || !hitTestSourceRef.current || !reticleRef.current) return;

    const referenceSpace = localRefSpaceRef.current || gl.xr.getReferenceSpace();
    if (!referenceSpace) return;

    const hitTestResults = frame.getHitTestResults(hitTestSourceRef.current);
    if (hitTestResults.length > 0) {
      const hit = hitTestResults[0];
      const pose = hit.getPose(referenceSpace);
      if (pose) {
        reticleRef.current.visible = true;
        reticleRef.current.matrix.fromArray(pose.transform.matrix);
      }
    } else {
      reticleRef.current.visible = false;
    }
  });

  return null;
}
