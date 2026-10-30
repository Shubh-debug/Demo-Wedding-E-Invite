"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function PortalTransition({
  active = false,
  onComplete,
  onDone,
}) {
  const containerRef = useRef(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  const particlesRef = useRef(null);
  const bokehRef = useRef(null);

  const animationFrameRef = useRef(null);
  const timelineRef = useRef(null);

  const atmosphereRef = useRef(null);
  const flashRef = useRef(null);

  const onCompleteRef = useRef(onComplete);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onDoneRef.current = onDone;
  }, [onComplete, onDone]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.15, 9);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const isMobile = window.innerWidth < 768;
    const particleCount = reducedMotion ? 650 : isMobile ? 1250 : 2400;
    const bokehCount = reducedMotion ? 20 : isMobile ? 45 : 90;

    // Organic cloud concentrated around the raised card center
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * 0.95;

      positions[i3] =
        Math.cos(angle) * radius * (0.95 + Math.random() * 0.45);
      positions[i3 + 1] =
        Math.sin(angle) * radius * (0.65 + Math.random() * 0.35) + 0.45;
      positions[i3 + 2] = (Math.random() - 0.5) * 2.8;

      randoms[i] = Math.random();
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "aRandom",
      new THREE.BufferAttribute(randoms, 1)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4af63,
      size: isMobile ? 0.045 : 0.038,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.position.set(0, 0, 0);
    particles.rotation.x = -0.08;
    scene.add(particles);
    particlesRef.current = particles;

    // Soft Gold Bokeh
    const bokehGeometry = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);

    for (let i = 0; i < bokehCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.25 + Math.sqrt(Math.random()) * 1.15;

      bokehPositions[i3] = Math.cos(angle) * radius * 1.15;
      bokehPositions[i3 + 1] = Math.sin(angle) * radius * 0.75 + 0.45;
      bokehPositions[i3 + 2] = -0.8 + Math.random() * 2.5;
    }

    bokehGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(bokehPositions, 3)
    );

    const bokehMaterial = new THREE.PointsMaterial({
      color: 0xe4c985,
      size: isMobile ? 0.095 : 0.075,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const bokeh = new THREE.Points(bokehGeometry, bokehMaterial);
    scene.add(bokeh);
    bokehRef.current = bokeh;

    // Atmosphere Glow
    const atmosphere = document.createElement("div");
    atmosphere.style.position = "absolute";
    atmosphere.style.inset = "0";
    atmosphere.style.pointerEvents = "none";
    atmosphere.style.opacity = "0";
    atmosphere.style.transform = "scale(0.7)";
    atmosphere.style.background =
      "radial-gradient(circle at 50% 47%, rgba(253,248,235,0.42) 0%, rgba(246,237,219,0.24) 30%, rgba(234,217,184,0.10) 55%, rgba(234,217,184,0) 78%)";
    container.appendChild(atmosphere);
    atmosphereRef.current = atmosphere;

    // Champagne Wipe Overlay
    const flash = document.createElement("div");
    flash.style.position = "absolute";
    flash.style.inset = "0";
    flash.style.pointerEvents = "none";
    flash.style.opacity = "0";
    flash.style.background =
      "radial-gradient(circle at 50% 47%, rgba(253,248,235,0.92) 0%, rgba(246,237,219,0.70) 50%, rgba(234,217,184,1.0) 100%)";
    container.appendChild(flash);
    flashRef.current = flash;

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      if (particlesRef.current) {
        particlesRef.current.rotation.z = elapsed * 0.018;
        particlesRef.current.rotation.y = Math.sin(elapsed * 0.22) * 0.035;
      }

      if (bokehRef.current) {
        bokehRef.current.rotation.z = -elapsed * 0.012;
        bokehRef.current.position.y = Math.sin(elapsed * 0.35) * 0.035;
      }

      renderer.render(scene, camera);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      timelineRef.current?.kill();

      particleGeometry.dispose();
      particleMaterial.dispose();
      bokehGeometry.dispose();
      bokehMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      if (atmosphere.parentNode === container) {
        container.removeChild(atmosphere);
      }
      if (flash.parentNode === container) {
        container.removeChild(flash);
      }
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    if (
      !particlesRef.current ||
      !bokehRef.current ||
      !cameraRef.current ||
      !atmosphereRef.current ||
      !flashRef.current
    ) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      onCompleteRef.current?.();
      onDoneRef.current?.();
      return;
    }

    timelineRef.current?.kill();

    const particles = particlesRef.current;
    const bokeh = bokehRef.current;
    const camera = cameraRef.current;
    const atmosphere = atmosphereRef.current;
    const flash = flashRef.current;

    gsap.set(particles.scale, { x: 0.72, y: 0.72, z: 0.72 });
    gsap.set(particles.material, { opacity: 0 });
    gsap.set(bokeh.scale, { x: 0.7, y: 0.7, z: 0.7 });
    gsap.set(bokeh.material, { opacity: 0 });
    gsap.set(camera.position, { x: 0, y: 0.15, z: 9 });
    gsap.set(atmosphere, { opacity: 0, scale: 0.72 });
    gsap.set(flash, { opacity: 0 });

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // 1. Warm Glow
    tl.to(
      atmosphere,
      {
        opacity: 0.72,
        scale: 1.35,
        duration: 0.95,
        ease: "power2.out",
      },
      0
    );

    // 2. Gold Dust Blooms Outward
    tl.to(
      particles.material,
      {
        opacity: 0.72,
        duration: 0.75,
        ease: "power2.out",
      },
      0.4
    );

    tl.to(
      particles.scale,
      {
        x: 3.7,
        y: 3.7,
        z: 3.7,
        duration: 1.45,
        ease: "power2.out",
      },
      0.4
    );

    // 3. Bokeh Motes
    tl.to(
      bokeh.material,
      {
        opacity: 0.48,
        duration: 0.8,
        ease: "power1.out",
      },
      0.5
    );

    tl.to(
      bokeh.scale,
      {
        x: 2.2,
        y: 2.2,
        z: 2.2,
        duration: 1.4,
        ease: "power2.out",
      },
      0.5
    );

    // 4. Camera Depth
    tl.to(
      camera.position,
      {
        z: 7.2,
        duration: 1.45,
        ease: "power2.inOut",
      },
      0.5
    );

    // 5. Build Champagne Flash
    tl.to(
      atmosphere,
      {
        opacity: 0.95,
        scale: 1.7,
        duration: 0.7,
        ease: "power2.in",
      },
      1.1
    );

    tl.to(
      flash,
      {
        opacity: 0.88,
        duration: 0.65,
        ease: "power2.in",
      },
      1.25
    );

    // 6. Seamless Handoff to Hero Page
    tl.call(
      () => {
        onCompleteRef.current?.();
      },
      null,
      1.8
    );

    // 7. Dissolve Champagne Veil & Dust Over Landing Page
    tl.to(
      particles.material,
      {
        opacity: 0.18,
        duration: 0.45,
        ease: "power1.out",
      },
      1.85
    );

    tl.to(
      bokeh.material,
      {
        opacity: 0.1,
        duration: 0.45,
        ease: "power1.out",
      },
      1.85
    );

    tl.to(
      flash,
      {
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
      },
      1.85
    );

    tl.to(
      atmosphere,
      {
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
      },
      1.85
    );

    // 8. Unmount Portal Component After Dissolve Completes
    tl.call(
      () => {
        onDoneRef.current?.();
      },
      null,
      2.6
    );
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="
        fixed
        inset-0
        z-[200]
        pointer-events-none
        overflow-hidden
      "
      aria-hidden="true"
    />
  );
}