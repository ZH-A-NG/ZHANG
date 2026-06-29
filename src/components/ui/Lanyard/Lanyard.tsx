// @ts-nocheck
/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import cardGLB from "./card.glb";
import lanyardTexture from "./lanyard.png";
import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

function createWovenLanyardTexture() {
  if (typeof document === "undefined") return new THREE.Texture();

  const width = 96;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const edge = Math.abs(x - width / 2) / (width / 2);
      const warp = x % 8 < 4 ? 12 : -8;
      const weft = y % 18 < 3 ? 8 : y % 18 > 14 ? -5 : 0;
      const grain = (x * 13 + y * 7) % 17 < 5 ? 4 : -3;
      const edgePress = x < 7 || x > width - 8 ? -34 : 0;
      const softCenter = 188 - edge * 28;
      const shade = Math.max(118, Math.min(226, softCenter + warp + weft + grain + edgePress));
      ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(width * 0.36, 0, 2, height);
  ctx.fillRect(width * 0.63, 0, 1, height);
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(4, 0, 3, height);
  ctx.fillRect(width - 7, 0, 3, height);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardScale?: number;
  className?: string;
  style?: CSSProperties;
};

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  cardScale = 2.25,
  className = "",
  style,
}: LanyardProps) {
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1440));
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotion = () => setReducedMotion(media.matches);

    handleResize();
    handleMotion();
    window.addEventListener("resize", handleResize);
    media.addEventListener?.("change", handleMotion);
    return () => {
      window.removeEventListener("resize", handleResize);
      media.removeEventListener?.("change", handleMotion);
    };
  }, []);

  const isMobile = viewportWidth < 768;
  const isCompact = viewportWidth < 1180;
  const scaleFactor = isMobile ? 0.72 : isCompact ? 0.84 : 1;
  const activeCardScale = cardScale * scaleFactor;
  const activeLanyardWidth = lanyardWidth * (isMobile ? 0.86 : isCompact ? 0.92 : 1);
  const activeFov = fov + (isMobile ? 3 : isCompact ? 1.5 : 0);
  const activePosition: [number, number, number] = [
    position[0],
    position[1],
    position[2] * (isMobile ? 1.18 : isCompact ? 1.08 : 1),
  ];
  const activeGravity: [number, number, number] = reducedMotion ? [gravity[0], -18, gravity[2]] : gravity;

  return (
    <div className={`lanyard-wrapper ${className}`.trim()} style={style}>
      <Canvas
        camera={{ position: activePosition, fov: activeFov }}
        dpr={[1, isMobile ? 1.35 : 2]}
        gl={{ alpha: transparent, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI * 0.78} />
        <Physics gravity={activeGravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={activeLanyardWidth}
            cardScale={activeCardScale}
          />
        </Physics>
        <Environment blur={0.82}>
          <Lightformer intensity={1.6} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={2.5} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={2.4} color="#fff4ee" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={6} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  reducedMotion = false,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  cardScale = 2.25,
}) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const sourceTexture = useTexture(lanyardImage || lanyardTexture);
  const wovenTexture = useMemo(() => createWovenLanyardTexture(), []);
  const texture = lanyardImage ? sourceTexture : wovenTexture;
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);
  const whiteMetalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f4f1ea",
        metalness: 0.78,
        roughness: 0.26,
        clearcoat: 0.55,
        clearcoatRoughness: 0.18,
      }),
    []
  );

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const canvas = document.createElement("canvas");
    canvas.width = baseImg.width;
    canvas.height = baseImg.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

    const drawFitted = (img, rect) => {
      const rx = rect.x * canvas.width;
      const ry = rect.y * canvas.height;
      const rw = rect.w * canvas.width;
      const rh = rect.h * canvas.height;
      const pick = imageFit === "contain" ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const scaleRatio = cardScale / 2.25;
  const cardHalfWidth = 0.8 * scaleRatio;
  const cardHalfHeight = 1.125 * scaleRatio;
  const cardJointY = 1.5 * scaleRatio;
  const visualOffsetY = -1.2 * scaleRatio;

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, cardJointY, 0]]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x * (reducedMotion ? 0.72 : 1), y: ang.y - rot.y * 0.25, z: ang.z * (reducedMotion ? 0.72 : 1) });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[cardHalfWidth, cardHalfHeight, 0.018 * scaleRatio]} />
          <group
            scale={cardScale}
            position={[0, visualOffsetY, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              event.target.releasePointerCapture(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event) => {
              event.target.setPointerCapture(event.pointerId);
              drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={cardMap} map-anisotropy={16} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={whiteMetalMaterial} />
            <mesh geometry={nodes.clamp.geometry} material={whiteMetalMaterial} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#3766A5"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-10, 1]}
          lineWidth={lanyardWidth}
          alphaTest={0.02}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);
