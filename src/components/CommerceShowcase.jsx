import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, OrbitControls, useGLTF } from "@react-three/drei";

const COMMERCE_MODEL_URL = "/models/commerce/switch-controller-pbr-v2.glb";
const COMMERCE_MODEL_INITIAL_ROTATION = [0, 0, 0];

function getModuleCoverItem(module) {
  if (module.coverSrc) {
    const coverItem = module.works.find((item) => item.src === module.coverSrc);
    return coverItem || { src: module.coverSrc, media: "image", title: module.title };
  }

  return module.works.find((item) => item.media !== "video") || module.works[0] || { src: "", media: "image", title: module.title };
}

function CommerceIntroPanel() {
  return (
    <div className="commerce-intro-panel">
      <span>E-COMMERCE VISUAL</span>
      <h3>产品模型</h3>
    </div>
  );
}

function CommerceModelAsset({ modelUrl, onReady }) {
  const { scene } = useGLTF(modelUrl, false, true);

  useEffect(() => {
    onReady();
  }, [onReady, scene]);

  return (
    <group rotation={COMMERCE_MODEL_INITIAL_ROTATION}>
      <primitive object={scene} />
    </group>
  );
}

function CommerceModelScene({ modelUrl, onReady }) {
  return (
    <>
      <color attach="background" args={["#090b0d"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 6]} intensity={2.5} />
      <directionalLight position={[-4, 2, -3]} intensity={1.2} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={0.82}>
          <Center precise>
            <CommerceModelAsset modelUrl={modelUrl} onReady={onReady} />
          </Center>
        </Bounds>
      </Suspense>
    </>
  );
}

function CommerceModelViewer({ modelUrl, posterSrc }) {
  const [isReady, setIsReady] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const resumeTimerRef = useRef(null);
  const handleModelReady = useCallback(() => setIsReady(true), []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) setAutoRotate(false);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseAutoRotate = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    setAutoRotate(false);
    setHasInteracted(true);
  }, []);

  const resumeAutoRotateLater = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      resumeTimerRef.current = window.setTimeout(() => setAutoRotate(true), 4000);
    }
  }, []);

  return (
    <div className={`commerce-model-viewer${isReady ? " is-ready" : ""}`}>
      <Canvas
        className="commerce-model-canvas"
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <CommerceModelScene
          modelUrl={modelUrl}
          onReady={handleModelReady}
        />
        <OrbitControls
          makeDefault
          enableRotate={true}
          enableZoom={true}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.9}
          onStart={pauseAutoRotate}
          onEnd={resumeAutoRotateLater}
        />
      </Canvas>
      <div className="commerce-model-poster" aria-hidden={isReady}>
        <img src={posterSrc} alt="" loading="lazy" decoding="async" />
        <span>LOADING 3D MODEL</span>
        <i />
      </div>
      <span className={`commerce-model-hint${hasInteracted ? " is-hidden" : ""}`}>拖动旋转 / 滚轮缩放</span>
    </div>
  );
}

export default function CommerceShowcase({ module }) {
  const coverItem = getModuleCoverItem(module);

  return (
    <div className="commerce-showcase">
      <div className="commerce-showcase-main">
        <CommerceIntroPanel />
        <CommerceModelViewer modelUrl={COMMERCE_MODEL_URL} posterSrc={coverItem.src} />
      </div>
    </div>
  );
}
