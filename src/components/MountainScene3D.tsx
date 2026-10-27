import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export const MountainScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.6, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Procedural Mountain Geometry (High-Detail Alpine Peaks)
    const gridSize = 256;
    const planeGeo = new THREE.PlaneGeometry(16, 16, gridSize, gridSize);
    planeGeo.rotateX(-Math.PI / 2);

    const posAttr = planeGeo.attributes.position;
    const vertexCount = posAttr.count;

    function hash(x: number, z: number) {
      const n = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
      return n - Math.floor(n);
    }

    function smoothNoise(x: number, z: number) {
      const ix = Math.floor(x);
      const iz = Math.floor(z);
      const fx = x - ix;
      const fz = z - iz;

      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uz = fz * fz * (3.0 - 2.0 * fz);

      const a = hash(ix, iz);
      const b = hash(ix + 1, iz);
      const c = hash(ix, iz + 1);
      const d = hash(ix + 1, iz + 1);

      return (
        a * (1.0 - ux) * (1.0 - uz) +
        b * ux * (1.0 - uz) +
        c * (1.0 - ux) * uz +
        d * ux * uz
      );
    }

    function ridgedFbm(x: number, z: number) {
      let value = 0.0;
      let amp = 0.52;
      let freq = 0.95;
      let weight = 1.0;

      for (let i = 0; i < 5; i++) {
        let n = smoothNoise(x * freq, z * freq);
        n = 1.0 - Math.abs(n * 2.0 - 1.0);
        n = n * n * weight;
        weight = Math.min(1.0, Math.max(0.0, n * 2.0));

        value += n * amp;
        freq *= 2.08;
        amp *= 0.47;
      }
      return value;
    }

    // Sculpt towering alpine pyramid on the right-center
    for (let i = 0; i < vertexCount; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);

      // Summit peak centered at x=1.5, z=-0.8
      const dx = x - 1.5;
      const dz = z - (-0.8);
      const distToSummit = Math.sqrt(dx * dx + dz * dz);

      // Primary peak mass
      const primaryPeak = Math.exp(-distToSummit * 0.44);

      // Secondary sprawling ridge to the left
      const secondaryDist = Math.sqrt((x + 2.8) * (x + 2.8) * 0.38 + (z + 1.8) * (z + 1.8));
      const secondaryRidge = Math.exp(-secondaryDist * 0.42) * 0.68;

      const ridgeNoise = ridgedFbm(x * 0.65, z * 0.65);
      const detailNoise = smoothNoise(x * 2.4, z * 2.4) * 0.14;

      let heightVal = (primaryPeak * 4.1 + secondaryRidge * 2.3) * (ridgeNoise + detailNoise);

      // Edge falloff
      const edgeDist = Math.max(Math.abs(x) / 7.6, Math.abs(z) / 7.6);
      const edgeFalloff = Math.max(0.0, 1.0 - Math.pow(edgeDist, 3.0));

      heightVal *= edgeFalloff;

      posAttr.setY(i, heightVal);
    }

    planeGeo.computeVertexNormals();

    // 3. PURE WHITE & GREYISH ALPINE SHADER (NO ORANGE, NO RED)
    const customUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uSunPosition: { value: new THREE.Vector3(-3.5, 6.5, 4.0).normalize() },
      uIsDark: { value: themeRef.current === 'dark' ? 1.0 : 0.0 },

      // Pure White & Greyish Tones (Dark Mode)
      uDarkSunColor: { value: new THREE.Color('#FFFFFF') },
      uDarkSkyColor: { value: new THREE.Color('#0E1110') },
      uDarkRockColor: { value: new THREE.Color('#1E242B') },      // Deep Slate Grey
      uDarkRockMidColor: { value: new THREE.Color('#4A5568') },   // Cool Mid Grey
      uDarkSnowColor: { value: new THREE.Color('#FFFFFF') },      // Radiant Snow White

      // Pure White & Greyish Tones (Light Mode)
      uLightSunColor: { value: new THREE.Color('#FFFFFF') },
      uLightSkyColor: { value: new THREE.Color('#F5F2EC') },
      uLightRockColor: { value: new THREE.Color('#333D47') },     // Charcoal Granite
      uLightRockMidColor: { value: new THREE.Color('#64748B') },  // Slate Grey
      uLightSnowColor: { value: new THREE.Color('#FFFFFF') },     // Pure Snow White
    };

    const mountainMaterial = new THREE.ShaderMaterial({
      uniforms: customUniforms,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying float vElevation;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          vElevation = position.y;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform float uIsDark;
        uniform vec3 uSunPosition;

        uniform vec3 uDarkSunColor;
        uniform vec3 uDarkSkyColor;
        uniform vec3 uDarkRockColor;
        uniform vec3 uDarkRockMidColor;
        uniform vec3 uDarkSnowColor;

        uniform vec3 uLightSunColor;
        uniform vec3 uLightSkyColor;
        uniform vec3 uLightRockColor;
        uniform vec3 uLightRockMidColor;
        uniform vec3 uLightSnowColor;

        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying float vElevation;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 sunDir = normalize(uSunPosition);

          // Interpolate theme colors (Strictly White & Greyish)
          vec3 sunColor     = mix(uLightSunColor, uDarkSunColor, uIsDark);
          vec3 skyColor     = mix(uLightSkyColor, uDarkSkyColor, uIsDark);
          vec3 rockDark     = mix(uLightRockColor, uDarkRockColor, uIsDark);
          vec3 rockMid      = mix(uLightRockMidColor, uDarkRockMidColor, uIsDark);
          vec3 snowColor    = mix(uLightSnowColor, uDarkSnowColor, uIsDark);

          // 1. Natural Granite Grey Gradient (Dark Rock Shadows -> Mid Grey Sunlit Ridges)
          float rockFacing = clamp(dot(normal, sunDir) * 0.5 + 0.5, 0.0, 1.0);
          vec3 rockColor = mix(rockDark, rockMid, rockFacing);

          // 2. High-Altitude White Snow Coverage
          // Flatter slope + higher elevation = pure snow
          float slope = clamp(normal.y, 0.0, 1.0);
          float elevationFactor = smoothstep(0.35, 2.5, vElevation);
          
          // Generous crisp snow along summits and slopes
          float snowMask = smoothstep(0.42, 0.65, slope + elevationFactor * 0.5);

          // White & Greyish Base Color
          vec3 surfaceColor = mix(rockColor, snowColor, snowMask);

          // 3. Crisp White Alpine Lighting
          float NdotL = max(dot(normal, sunDir), 0.0);
          
          // Specular glint on icy snow
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          vec3 halfDir = normalize(sunDir + viewDir);
          float specAngle = max(dot(normal, halfDir), 0.0);
          float specular = pow(specAngle, 28.0) * snowMask * 0.6;

          // Ambient & Direct light
          vec3 ambient = skyColor * (0.35 + normal.y * 0.22);
          vec3 direct = sunColor * NdotL * 1.45;

          // Pure white Fresnel edge highlight on summit ridges
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.2);
          vec3 rimLight = vec3(0.95, 0.98, 1.0) * fresnel * 0.6;

          vec3 finalColor = surfaceColor * (ambient + direct) + vec3(1.0) * specular + rimLight;

          // 4. Rolling Valley Fog & Low Mist (Greyish White)
          float fogWave = sin(vWorldPosition.x * 0.5 + uTime * 0.22) * 0.18 + cos(vWorldPosition.z * 0.45 + uTime * 0.16) * 0.18;
          float valleyMist = smoothstep(1.4 + fogWave, -0.2, vElevation) * 0.85;

          // Distance fog
          float dist = length(vWorldPosition - cameraPosition);
          float distFog = smoothstep(6.0, 13.0, dist);

          float totalMist = clamp(valleyMist + distFog, 0.0, 1.0);
          
          vec3 mistColor = skyColor;
          finalColor = mix(finalColor, mistColor, totalMist);

          float alpha = 1.0 - smoothstep(10.0, 14.0, dist);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: true,
      side: THREE.DoubleSide,
    });

    const mountainMesh = new THREE.Mesh(planeGeo, mountainMaterial);
    mountainMesh.position.set(0, -0.9, -1.2);
    scene.add(mountainMesh);

    // 4. VOLUMETRIC BILLOWING CLOUD LAYERS (3D MIST & CLOUDS AROUND THE PEAK)
    function createCloudTexture() {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const cCtx = c.getContext('2d');
      if (cCtx) {
        const grad = cCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.35, 'rgba(240, 245, 250, 0.6)');
        grad.addColorStop(0.7, 'rgba(220, 230, 240, 0.18)');
        grad.addColorStop(1, 'rgba(200, 215, 230, 0)');
        cCtx.fillStyle = grad;
        cCtx.fillRect(0, 0, 128, 128);
      }
      return new THREE.CanvasTexture(c);
    }

    const cloudTexture = createCloudTexture();
    const cloudGroup = new THREE.Group();

    const cloudCount = 8;
    const cloudMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < cloudCount; i++) {
      const cloudGeo = new THREE.PlaneGeometry(6 + Math.random() * 3, 2.5 + Math.random() * 1.5);
      const cloudMat = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: themeRef.current === 'dark' ? 0.35 : 0.22,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const cloud = new THREE.Mesh(cloudGeo, cloudMat);
      // Place clouds at various elevations around the mountain base
      cloud.position.set(
        (Math.random() - 0.5) * 8 + 0.5,
        -0.2 + (i / cloudCount) * 1.6,
        (Math.random() - 0.5) * 4 - 0.5
      );
      cloud.rotation.z = (Math.random() - 0.5) * 0.1;
      cloudGroup.add(cloud);
      cloudMeshes.push(cloud);
    }
    scene.add(cloudGroup);

    // 5. PROMINENT 3D FALLING SNOW PARTICLES SYSTEM (650 SNOWFLAKES)
    const snowCount = 650;
    const snowGeo = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowCount * 3);
    const snowVelocities = new Float32Array(snowCount * 3);

    for (let i = 0; i < snowCount; i++) {
      snowPositions[i * 3] = (Math.random() - 0.5) * 16;       // x
      snowPositions[i * 3 + 1] = Math.random() * 9 - 1;         // y
      snowPositions[i * 3 + 2] = Math.random() * 10 - 1.5;      // z

      snowVelocities[i * 3] = (Math.random() - 0.5) * 0.007;    // drift x
      snowVelocities[i * 3 + 1] = 0.01 + Math.random() * 0.016; // falling speed
      snowVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;// drift z
    }

    snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));

    // High-visibility circular soft snowflake texture
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 64;
    sCanvas.height = 64;
    const sCtx = sCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 64, 64);
    }
    const snowTexture = new THREE.CanvasTexture(sCanvas);

    const snowMat = new THREE.PointsMaterial({
      size: 0.085,
      map: snowTexture,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.9 : 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const snowParticles = new THREE.Points(snowGeo, snowMat);
    scene.add(snowParticles);

    // 6. Interactive Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Scroll Tracking for 3D Camera Glide
    let currentScroll = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = container.clientHeight || window.innerHeight;
      currentScroll = Math.min(Math.max(scrollY / heroHeight, 0), 1.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 8. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Update shader uniforms
      customUniforms.uTime.value = elapsedTime;
      customUniforms.uScroll.value = currentScroll;
      const isDarkTarget = themeRef.current === 'dark' ? 1.0 : 0.0;
      customUniforms.uIsDark.value += (isDarkTarget - customUniforms.uIsDark.value) * 0.08;

      snowMat.opacity = themeRef.current === 'dark' ? 0.9 : 0.65;

      // Drift Clouds slowly in 3D space
      cloudMeshes.forEach((cloud, idx) => {
        cloud.position.x += 0.0015 * (idx % 2 === 0 ? 1 : -1);
        if (cloud.position.x > 5.5) cloud.position.x = -5.5;
        if (cloud.position.x < -5.5) cloud.position.x = 5.5;
        (cloud.material as THREE.MeshBasicMaterial).opacity = themeRef.current === 'dark' ? 0.35 : 0.22;
      });

      // Update Falling Snowflakes Animation
      const posArray = snowGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < snowCount; i++) {
        // Fall down
        posArray[i * 3 + 1] -= snowVelocities[i * 3 + 1];

        // Horizontal sinusoidal drift (wind flutter)
        posArray[i * 3] += Math.sin(elapsedTime * 0.85 + i) * 0.003 + snowVelocities[i * 3];
        posArray[i * 3 + 2] += Math.cos(elapsedTime * 0.65 + i) * 0.002;

        // Reset to top when passing below bottom
        if (posArray[i * 3 + 1] < -1.8) {
          posArray[i * 3 + 1] = 6.8;
          posArray[i * 3] = (Math.random() - 0.5) * 16;
        }
      }
      snowGeo.attributes.position.needsUpdate = true;

      // Camera parallax
      if (!prefersReducedMotion) {
        camera.position.x = currentMouseX * 0.65;
        camera.position.y = 1.6 + currentMouseY * 0.3 + currentScroll * 0.75;
        camera.position.z = 8.2 - currentScroll * 2.2;
        camera.lookAt(0.75, 1.25 + currentScroll * 0.4, 0);

        mountainMesh.rotation.y = -0.04 + currentMouseX * 0.045 + currentScroll * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeo.dispose();
      mountainMaterial.dispose();
      snowGeo.dispose();
      snowMat.dispose();
      snowTexture.dispose();
      cloudTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
