/* ==========================================================================
   REAL-TIME GPU WEBGL 3D STUDIO RENDERER (ai-core-3d.js)
   Exact 2D Euclidean Distance Transform (EDT) + Raymarched 3D Beveled Sculptures:
   - Hero Stage: 3D CNC Titanium Studio Laptop projecting floating 3D Website UI
     layers powered by the cycling 3D AI Logo Core (ChatGPT · Claude · Antigravity)
   - Showcase Stage: 360°-rotatable CNC-machined titanium & crystal 3D AI Logos:
       0.0 -> ChatGPT · OpenAI (Full 6-Petal Blossom Knot + Hollow Orbital Ring)
       1.0 -> Claude · Anthropic (Full 12-Ray Starburst Spark + Hollow Meridian)
       2.0 -> Google Antigravity (Zero-G Delta Wing + DeepMind Star + Hollow Halo)
   ========================================================================== */
(() => {
  "use strict";

  const LOGO_SPECS = [
    {
      // 0: ChatGPT / OpenAI 6-Fold Blossom Knot
      viewBox: 24,
      fill: 0.67,
      offsetY: 0,
      fillRule: "evenodd",
      d: "M22.282 9.821a6 6 0 0 0-.516-4.91a6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a6 6 0 0 0-3.998 2.9a6.05 6.05 0 0 0 .743 7.097a5.98 5.98 0 0 0 .51 4.911a6.05 6.05 0 0 0 6.515 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206a6 6 0 0 0 3.997-2.9a6.06 6.06 0 0 0-.747-7.073M13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081l4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085l4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354l-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667m2.01-3.023l-.141-.085l-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.8.8 0 0 0-.393.681zm1.097-2.365l2.602-1.5l2.607 1.5v2.999l-2.597 1.5l-2.607-1.5Z"
    },
    {
      // 1: Claude / Anthropic Radial Starburst Spark
      viewBox: 16,
      fill: 0.69,
      offsetY: 0,
      fillRule: "nonzero",
      d: "m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39Z"
    },
    {
      // 2: Google Antigravity Swept Delta-Arch Wing
      viewBox: 24,
      fill: 0.66,
      offsetY: -0.04,
      fillRule: "nonzero",
      d: "M12.006 3.02q1.736-.02 2.682 1.303q.945 1.323 1.648 2.985q.612 1.46 1.212 3.288q.6 1.829 1.256 3.683q.65 1.779 1.387 3.342q.736 1.564 1.703 2.643q.123.148.118.323t-.13.284q-.142.129-.31.135t-.31-.117q-1.745-1.627-2.933-3.434q-1.189-1.807-2.296-3.02q-.85-.95-1.823-1.51q-.972-.56-2.204-.54q-1.233-.02-2.205.54t-1.822 1.51q-1.108 1.213-2.296 3.02T2.75 20.889q-.14.123-.31.117t-.311-.135q-.123-.11-.129-.284t.117-.323q.967-1.06 1.704-2.633t1.387-3.352q.655-1.854 1.255-3.683t1.212-3.288q.704-1.662 1.649-2.985t2.682-1.304Z"
    }
  ];

  const SDF_SIZE = 512;
  const SDF_EXTENT = 1.68;

  let cachedAtlas = null;

  function buildLogoSdfAtlas() {
    if (cachedAtlas) return cachedAtlas;

    const S = SDF_SIZE;
    const N = S * S;
    const worldPerPx = (2.0 * SDF_EXTENT) / S;

    const cScratch = document.createElement("canvas");
    cScratch.width = S;
    cScratch.height = S;
    const ctx = cScratch.getContext("2d", { willReadFrequently: true });

    const INF = 1e9;
    const f = new Float64Array(S);
    const d1 = new Float64Array(S);
    const v = new Int32Array(S);
    const z = new Float64Array(S + 1);
    const gridOut = new Float32Array(N);
    const gridIn = new Float32Array(N);
    const rawSdf = new Float32Array(N);
    const tmpBlur = new Float32Array(N);

    function edt1d(len) {
      v[0] = 0;
      z[0] = -1e20;
      z[1] = 1e20;
      let k = 0;
      for (let q = 1; q < len; q++) {
        let s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        while (k > 0 && s <= z[k]) {
          k--;
          s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        }
        k++;
        v[k] = q;
        z[k] = s;
        z[k + 1] = 1e20;
      }
      k = 0;
      for (let q = 0; q < len; q++) {
        while (z[k + 1] < q) k++;
        const dx = q - v[k];
        d1[q] = dx * dx + f[v[k]];
      }
    }

    function edt2d(grid) {
      for (let x = 0; x < S; x++) {
        for (let y = 0; y < S; y++) f[y] = grid[y * S + x];
        edt1d(S);
        for (let y = 0; y < S; y++) grid[y * S + x] = d1[y];
      }
      for (let y = 0; y < S; y++) {
        const row = y * S;
        for (let x = 0; x < S; x++) f[x] = grid[row + x];
        edt1d(S);
        for (let x = 0; x < S; x++) grid[row + x] = d1[x];
      }
    }

    function drawPath(spec, scale, tx, ty) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, S, S);
      ctx.save();
      ctx.translate(tx, ty);
      ctx.scale(scale, scale);
      const p2d = new Path2D(spec.d);
      ctx.fillStyle = "#ffffff";
      ctx.fill(p2d, spec.fillRule || "nonzero");
      ctx.restore();
    }

    const atlasFloat = new Float32Array(N * 4);
    for (let i = 3; i < atlasFloat.length; i += 4) atlasFloat[i] = 1.0;

    for (let ch = 0; ch < LOGO_SPECS.length; ch++) {
      const spec = LOGO_SPECS[ch];
      const initScale = (S * 0.72) / spec.viewBox;
      const initOff = S * 0.5 - spec.viewBox * 0.5 * initScale;
      drawPath(spec, initScale, initOff, initOff);

      const data0 = ctx.getImageData(0, 0, S, S).data;
      let minX = S,
        maxX = 0,
        minY = S,
        maxY = 0;
      for (let y = 0; y < S; y++) {
        const row = y * S;
        for (let x = 0; x < S; x++) {
          if (data0[(row + x) * 4 + 3] > 24) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (maxX > minX && maxY > minY) {
        const span = Math.max(maxX - minX, maxY - minY);
        const targetSpan = S * spec.fill;
        const ratio = targetSpan / span;
        const cx0 = 0.5 * (minX + maxX);
        const cy0 = 0.5 * (minY + maxY);
        const finalScale = initScale * ratio;
        const finalTx = S * 0.5 + (initOff - cx0) * ratio;
        const finalTy = S * (0.5 + (spec.offsetY || 0)) + (initOff - cy0) * ratio;
        drawPath(spec, finalScale, finalTx, finalTy);
      }

      const alphaData = ctx.getImageData(0, 0, S, S).data;
      for (let i = 0; i < N; i++) {
        const a = alphaData[i * 4 + 3];
        if (a >= 128) {
          gridOut[i] = 0;
          gridIn[i] = INF;
        } else {
          gridOut[i] = INF;
          gridIn[i] = 0;
        }
      }

      edt2d(gridOut);
      edt2d(gridIn);

      for (let i = 0; i < N; i++) {
        const a = alphaData[i * 4 + 3] / 255.0;
        if (a > 0.02 && a < 0.98) {
          rawSdf[i] = (0.5 - a) * worldPerPx;
        } else if (a >= 0.5) {
          rawSdf[i] = -(Math.sqrt(gridIn[i]) - 0.5) * worldPerPx;
        } else {
          rawSdf[i] = (Math.sqrt(gridOut[i]) - 0.5) * worldPerPx;
        }
      }

      for (let y = 0; y < S; y++) {
        const row = y * S;
        for (let x = 0; x < S; x++) {
          const xm = x > 0 ? x - 1 : 0;
          const xp = x + 1 < S ? x + 1 : S - 1;
          tmpBlur[row + x] = 0.25 * (rawSdf[row + xm] + 2.0 * rawSdf[row + x] + rawSdf[row + xp]);
        }
      }
      for (let y = 0; y < S; y++) {
        const ym = (y > 0 ? y - 1 : 0) * S;
        const yc = y * S;
        const yp = (y + 1 < S ? y + 1 : S - 1) * S;
        for (let x = 0; x < S; x++) {
          atlasFloat[(yc + x) * 4 + ch] = 0.25 * (tmpBlur[ym + x] + 2.0 * tmpBlur[yc + x] + tmpBlur[yp + x]);
        }
      }
    }

    cachedAtlas = { size: S, floatData: atlasFloat };
    return cachedAtlas;
  }

  const VERT_GL2 = `#version 300 es
    in vec2 aPos;
    out vec2 vUv;
    void main() {
      vUv = aPos;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;

  const VERT_GL1 = `
    attribute vec2 aPos;
    varying vec2 vUv;
    void main() {
      vUv = aPos;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;

  const FRAG_BODY = `
    uniform vec2 uRes;
    uniform float uTime;
    uniform float uMode;       // 0.0 = Hero 3D Web Studio Laptop, 1.0 = AI Logo Showcase
    uniform float uMorph;      // 0.0..2.0 chapter morph across 3 AI logos
    uniform vec2 uRot;         // Interactive turntable yaw/pitch
    uniform float uScrollTilt;
    uniform vec3 uAccent;      // Studio rim/core light RGB
    uniform sampler2D uSdfTex; // RGB = (ChatGPT, Claude, Antigravity)
    uniform float uSdfDecode;  // 0.0 = native float tex, >0 = uint8 range decode

    const float EXTENT = 1.68;

    mat2 rot2(float a) {
      float c = cos(a), s = sin(a);
      return mat2(c, -s, s, c);
    }

    float smin(float a, float b, float k) {
      float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
      return mix(b, a, h) - k * h * (1.0 - h);
    }

    float sdRoundBox(vec3 p, vec3 b, float r) {
      vec3 q = abs(p) - b;
      return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
    }

    // TRUE HOLLOW CNC-machined ring around Y axis (abs keeps center 100% open!)
    float sdHollowRing(vec3 p, float radius, float halfWidth, float halfThick) {
      vec2 d = vec2(abs(length(p.xz) - radius), abs(p.y));
      vec2 q = d - vec2(halfWidth, halfThick);
      return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.010;
    }

    float sdOctahedron(vec3 p, float s) {
      p = abs(p);
      return (p.x + p.y + p.z - s) * 0.57735027;
    }

    // Exact conservative 2D SDF lookup for the 3 AI logos in 1 non-divergent LOD0 fetch
    vec3 sampleLogoSdfs(vec2 pxy) {
      vec2 clamped = clamp(pxy, -EXTENT, EXTENT);
      vec2 uv = vec2(
        0.5 + clamped.x / (2.0 * EXTENT),
        0.5 - clamped.y / (2.0 * EXTENT)
      );
      vec3 d = SAMPLE_SDF(uSdfTex, clamp(uv, 0.002, 0.998)).rgb;
      if (uSdfDecode > 0.0) {
        d = (d - 0.5) * 2.0 * uSdfDecode;
      }
      vec2 outVec = max(abs(pxy) - EXTENT, 0.0);
      float outSq = dot(outVec, outVec);
      if (outSq > 0.0) {
        d = sqrt(d * d + outSq);
      }
      return d;
    }

    // Zero-bloat CNC chamfered 3D extrusion preserving exact vector contour at z=0
    float sdExtrudeBevel(float d2d, float z, float h, float bevel) {
      vec2 w = vec2(d2d + bevel, abs(z) - max(h - bevel, 0.004));
      return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - bevel;
    }

    // Dual-material sculpted 3D AI Logo (Titanium Bezel + Crystal Face Inlay & Side Seam)
    vec2 sdSculptedLogo(float d2d, float z, float halfDepth, float inlayInset) {
      float dome = clamp(-d2d, 0.0, 0.15) * 0.28;
      float h = halfDepth + dome;

      float dMetal = sdExtrudeBevel(d2d, z, h, 0.032);
      float dFaceInlay = sdExtrudeBevel(d2d + inlayInset, z, h + 0.008, 0.010);
      float dSideSeam = sdExtrudeBevel(d2d + 0.004, z, 0.020, 0.006);
      float dCrystal = min(dFaceInlay, dSideSeam);

      return (dCrystal < dMetal) ? vec2(dCrystal, 2.0) : vec2(dMetal, 1.0);
    }

    // Form A (HERO): 3D Studio Workstation Laptop projecting layered Holographic Website UI
    // powered by a levitating cycling 3D AI Logo Hologram above the screen!
    vec2 mapHero(vec3 p, float t) {
      vec3 q = p - vec3(0.0, -0.20 + sin(t * 1.15) * 0.04, 0.0);
      q.xz = rot2(sin(t * 0.45) * 0.14 - 0.16) * q.xz;
      q.yz = rot2(0.14) * q.yz;

      // 1. Sleek CNC-machined titanium laptop base with recessed keyboard deck
      vec3 baseP = q - vec3(0.0, -0.52, 0.24);
      float baseOuter = sdRoundBox(baseP, vec3(1.16, 0.042, 0.78), 0.028);
      float kbRecess = sdRoundBox(baseP - vec3(0.0, 0.052, -0.08), vec3(0.92, 0.032, 0.34), 0.014);
      float base = max(baseOuter, -kbRecess);

      // Subtle glowing trackpad outline on base deck
      float trackpad = sdRoundBox(baseP - vec3(0.0, 0.042, 0.46), vec3(0.28, 0.006, 0.16), 0.010);

      // 2. Slim open titanium display lid with precision screen recess
      vec3 lidP = q - vec3(0.0, 0.16, -0.58);
      lidP.yz = rot2(-0.18) * lidP.yz;
      float lidOuter = sdRoundBox(lidP, vec3(1.16, 0.72, 0.030), 0.026);
      float screenWell = sdRoundBox(lidP - vec3(0.0, 0.0, 0.030), vec3(1.06, 0.62, 0.020), 0.012);
      float lid = max(lidOuter, -screenWell);

      float chassis = smin(base, lid, 0.036);

      // 3. Precision hollow titanium studio orbit ring beneath the workstation
      vec3 ringP = q - vec3(0.0, -0.78, 0.04);
      float baseRing = sdHollowRing(ringP, 1.46, 0.020, 0.018);

      // 4. Layered 3D Holographic Website UI floating OUT of the screen!
      float uiNav = sdRoundBox(lidP - vec3(0.0, 0.44, 0.16), vec3(0.92, 0.056, 0.012), 0.014);
      float uiHeroCard = sdRoundBox(
        lidP - vec3(-0.44, -0.02, 0.30 + sin(t * 1.25) * 0.024),
        vec3(0.42, 0.31, 0.013),
        0.020
      );
      float uiBlockA = sdRoundBox(
        lidP - vec3(0.42, 0.14, 0.24 + cos(t * 1.15) * 0.024),
        vec3(0.42, 0.14, 0.013),
        0.018
      );
      float uiBlockB = sdRoundBox(
        lidP - vec3(0.42, -0.20, 0.38 + sin(t * 1.45) * 0.024),
        vec3(0.42, 0.12, 0.013),
        0.018
      );
      // Floating bottom progress / code bar
      float uiBar = sdRoundBox(lidP - vec3(0.0, -0.45, 0.22), vec3(0.82, 0.032, 0.010), 0.010);

      float holoUI = min(uiNav, min(uiHeroCard, min(uiBlockA, min(uiBlockB, min(uiBar, trackpad)))));

      // 5. Levitating 3D AI Logo Engine above the Laptop Screen (ChatGPT -> Claude -> Antigravity)
      float coreScale = 0.40;
      vec3 aiCenter = q - vec3(0.0, 1.24 + sin(t * 1.5) * 0.035, -0.14);
      vec3 pc = aiCenter / coreScale;
      pc.xz = rot2(sin(t * 0.65) * 0.24) * pc.xz;

      vec3 sdfs = sampleLogoSdfs(pc.xy);
      float cyc = mod(t * 0.24, 3.0);
      float dLogo;
      if (cyc < 1.0) {
        dLogo = mix(sdfs.x, sdfs.y, smoothstep(0.66, 0.96, cyc));
      } else if (cyc < 2.0) {
        dLogo = mix(sdfs.y, sdfs.z, smoothstep(1.66, 1.96, cyc));
      } else {
        dLogo = mix(sdfs.z, sdfs.x, smoothstep(2.66, 2.96, cyc));
      }
      vec2 aiLogo = sdSculptedLogo(dLogo, pc.z, 0.20, 0.022);
      aiLogo.x *= coreScale;

      // Thin hollow orbital halo framing the floating AI Logo + 3 glowing AI satellites
      vec3 aiRingP = aiCenter;
      aiRingP.xy = rot2(0.32) * aiRingP.xy;
      aiRingP.yz = rot2(1.18) * aiRingP.yz;
      float aiRing = sdHollowRing(aiRingP, 0.62, 0.012, 0.014);

      float orbs = 10.0;
      for (int i = 0; i < 3; i++) {
        float fi = float(i) * 2.0943951 + t * 0.75;
        vec3 sp = ringP - vec3(cos(fi) * 1.46, 0.0, sin(fi) * 1.46);
        orbs = min(orbs, length(sp) - 0.048);
      }

      float metalAll = min(chassis, min(baseRing, aiRing));
      if (aiLogo.y < 1.5) metalAll = min(metalAll, aiLogo.x);

      float crysAll = min(holoUI, orbs);
      if (aiLogo.y > 1.5) crysAll = min(crysAll, aiLogo.x);

      return (crysAll < metalAll) ? vec2(crysAll, 2.0) : vec2(metalAll, 1.0);
    }

    // Showcase Form 0: ChatGPT (Full OpenAI 3D Blossom Knot + Sleek Hollow Orbital Ring)
    vec2 evalChatGPT(vec3 p, float dLogo0, float t) {
      float rXY = length(p.xy);
      float safeX = (rXY < 0.001) ? 0.001 : p.x;
      float weaveMask = smoothstep(0.24, 0.68, rXY);
      float weaveZ = p.z + 0.020 * weaveMask * sin(6.0 * atan(p.y, safeX));
      vec2 logo = sdSculptedLogo(dLogo0, weaveZ, 0.165, 0.024);

      vec3 rp = p;
      rp.xy = rot2(0.38) * rp.xy;
      rp.yz = rot2(1.22) * rp.yz;
      float ring = sdHollowRing(rp, 1.56, 0.018, 0.022);

      float nodes = 10.0;
      for (int i = 0; i < 6; i++) {
        float a = float(i) * 1.0471975 + t * 0.34;
        vec3 np = rp - vec3(cos(a) * 1.56, 0.0, sin(a) * 1.56);
        nodes = min(nodes, length(np) - 0.048);
      }

      float dMet = (logo.y < 1.5) ? min(logo.x, ring) : ring;
      float dCry = (logo.y > 1.5) ? min(logo.x, nodes) : nodes;
      return (dCry < dMet) ? vec2(dCry, 2.0) : vec2(dMet, 1.0);
    }

    // Showcase Form 1: Claude (Full Anthropic 12-Ray Starburst Spark + Sleek Hollow Meridian)
    vec2 evalClaude(vec3 p, float dLogo1, float t) {
      float radialHub = 0.075 * exp(-dot(p.xy, p.xy) * 2.4);
      vec2 logo = sdSculptedLogo(dLogo1, p.z, 0.145 + radialHub, 0.020);

      vec3 rp = p;
      rp.xy = rot2(-0.42) * rp.xy;
      rp.yz = rot2(1.18) * rp.yz;
      float ring = sdHollowRing(rp, 1.56, 0.018, 0.022);

      float sparks = 10.0;
      for (int i = 0; i < 4; i++) {
        float a = float(i) * 1.5707963 - t * 0.38;
        vec3 sp = rp - vec3(cos(a) * 1.56, 0.0, sin(a) * 1.56);
        sparks = min(sparks, sdOctahedron(sp, 0.082));
      }

      float dMet = (logo.y < 1.5) ? min(logo.x, ring) : ring;
      float dCry = (logo.y > 1.5) ? min(logo.x, sparks) : sparks;
      return (dCry < dMet) ? vec2(dCry, 2.0) : vec2(dMet, 1.0);
    }

    // Showcase Form 2: Google Antigravity (Levitating 3D Delta-Wing + DeepMind Star + Hollow Halo)
    vec2 evalAntigravity(vec3 p, float dLogo2, float t) {
      float sweepZ = p.z - 0.032 * p.y;
      vec2 logo = sdSculptedLogo(dLogo2, sweepZ, 0.17, 0.024);

      vec3 sp = p - vec3(0.0, -0.44 + sin(t * 1.6) * 0.045, 0.0);
      sp.xz = rot2(t * 0.75) * sp.xz;
      vec3 starScale = vec3(sp.x, sp.y * 0.78, sp.z);
      float star = sdOctahedron(starScale, 0.24) - 0.012;

      vec3 hp = p - vec3(0.0, -1.24, 0.0);
      hp.yz = rot2(0.10) * hp.yz;
      float halo = sdHollowRing(hp, 1.16, 0.020, 0.018);

      float orbs = 10.0;
      for (int i = 0; i < 3; i++) {
        float a = float(i) * 2.0943951 + t * 0.7;
        vec3 op = hp - vec3(cos(a) * 1.16, 0.0, sin(a) * 1.16);
        orbs = min(orbs, length(op) - 0.048);
      }

      float dMet = (logo.y < 1.5) ? min(logo.x, halo) : halo;
      float dCry = min(star, orbs);
      if (logo.y > 1.5) dCry = min(dCry, logo.x);
      return (dCry < dMet) ? vec2(dCry, 2.0) : vec2(dMet, 1.0);
    }

    vec2 mapScene(vec3 p) {
      if (uMode < 0.5) {
        return mapHero(p, uTime);
      }

      vec3 q = p - vec3(0.0, sin(uTime * 1.15) * 0.05, 0.0);
      q.xz = rot2(sin(uTime * 0.62) * 0.14) * q.xz;
      q.yz = rot2(cos(uTime * 0.48) * 0.055) * q.yz;

      vec3 sdfs = sampleLogoSdfs(q.xy);
      float m = clamp(uMorph, 0.0, 2.0);

      if (m < 0.01) {
        return evalChatGPT(q, sdfs.x, uTime);
      } else if (m < 1.0) {
        float f = smoothstep(0.0, 1.0, m);
        vec2 a = evalChatGPT(q, sdfs.x, uTime);
        vec2 b = evalClaude(q, sdfs.y, uTime);
        return vec2(mix(a.x, b.x, f), (f < 0.5) ? a.y : b.y);
      } else if (m < 1.01) {
        return evalClaude(q, sdfs.y, uTime);
      } else if (m < 1.99) {
        float f = smoothstep(1.0, 2.0, m);
        vec2 a = evalClaude(q, sdfs.y, uTime);
        vec2 b = evalAntigravity(q, sdfs.z, uTime);
        return vec2(mix(a.x, b.x, f), (f < 0.5) ? a.y : b.y);
      } else {
        return evalAntigravity(q, sdfs.z, uTime);
      }
    }

    vec3 calcNormal(vec3 p) {
      vec2 e = vec2(0.0032, -0.0032);
      return normalize(
        e.xyy * mapScene(p + e.xyy).x +
        e.yyx * mapScene(p + e.yyx).x +
        e.yxy * mapScene(p + e.yxy).x +
        e.xxx * mapScene(p + e.xxx).x
      );
    }

    float calcAO(vec3 pos, vec3 nor) {
      float occ = 0.0;
      float sca = 1.0;
      for (int i = 0; i < 4; i++) {
        float h = 0.03 + 0.11 * float(i) / 3.0;
        float d = mapScene(pos + h * nor).x;
        occ += (h - d) * sca;
        sca *= 0.72;
      }
      return clamp(1.0 - 2.3 * occ, 0.0, 1.0);
    }

    vec3 acesFilm(vec3 x) {
      return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
    }

    void main() {
      vec2 uv = vUv;
      uv.x *= uRes.x / max(uRes.y, 1.0);

      vec3 ro = vec3(0.0, 0.0, 4.72);
      vec3 rd = normalize(vec3(uv, -1.72));

      float pitch = uRot.y + uScrollTilt;
      float yaw = uRot.x;
      ro.yz = rot2(pitch) * ro.yz;
      rd.yz = rot2(pitch) * rd.yz;
      ro.xz = rot2(yaw) * ro.xz;
      rd.xz = rot2(yaw) * rd.xz;

      // Analytical bounding-sphere early exit (R = 2.86) for 60fps efficiency
      float b = dot(ro, rd);
      float c = dot(ro, ro) - 8.2;
      float disc = b * b - c;

      float radial = length(uv);
      vec3 bgGlow = uAccent * (0.08 * exp(-radial * 1.48));

      if (disc < 0.0) {
        float a = clamp(length(bgGlow) * 2.2, 0.0, 1.0);
        fragColor = vec4(bgGlow, a);
        return;
      }

      float tMin = max(0.0, -b - sqrt(disc));
      float tMax = -b + sqrt(disc);
      float t = tMin;

      float hitMat = 0.0;
      float glowAcc = 0.0;

      for (int i = 0; i < 72; i++) {
        vec3 pos = ro + rd * t;
        vec2 res = mapScene(pos);
        float stepDist = max(res.x, 0.002) * 0.88;
        if (res.y > 1.5) {
          glowAcc += stepDist * 0.12 / (0.055 + res.x * res.x * 10.0);
        } else {
          glowAcc += stepDist * 0.022 / (0.08 + res.x * res.x * 12.0);
        }
        if (res.x < 0.002) {
          hitMat = res.y;
          break;
        }
        t += stepDist;
        if (t > tMax) break;
      }

      vec3 col = bgGlow + uAccent * glowAcc * 0.40;
      float alpha = clamp(length(col) * 1.85, 0.0, 0.92);

      if (hitMat > 0.5) {
        vec3 pos = ro + rd * t;
        vec3 N = calcNormal(pos);
        vec3 V = -rd;
        float ao = calcAO(pos, N);

        // Ultra-fine satin micro-sheen (clean, smooth CNC titanium without striping)
        float groove = sin(pos.y * 95.0 + pos.x * 35.0) * 0.006;
        N = normalize(N + vec3(groove, 0.0, -groove));

        vec3 L1 = normalize(vec3(1.35, 1.75, 1.65)); // Studio Warm-White Key Light
        vec3 L2 = normalize(vec3(-1.6, 0.45, -0.8)); // Colored Studio Rim Light
        vec3 L3 = normalize(vec3(0.0, -1.4, 0.9));   // Subtle Warm Bounce

        float diff1 = max(dot(N, L1), 0.0);
        float diff2 = max(dot(N, L2), 0.0);
        float diff3 = max(dot(N, L3), 0.0);

        vec3 H1 = normalize(L1 + V);
        vec3 H2 = normalize(L2 + V);
        float spec1 = pow(max(dot(N, H1), 0.0), 52.0);
        float spec2 = pow(max(dot(N, H2), 0.0), 24.0);
        float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.2);

        if (hitMat < 1.5) {
          // Dark Anodized Satin Titanium Material
          vec3 baseAlbedo = vec3(0.095, 0.115, 0.132);
          vec3 metalCol = baseAlbedo * (0.36 + diff1 * 1.24) * ao;
          metalCol += uAccent * (diff2 * 0.56 + spec2 * 0.88 + fresnel * 0.82) * ao;
          metalCol += vec3(0.97, 0.95, 0.90) * spec1 * 1.05;
          metalCol += vec3(0.89, 0.77, 0.51) * diff3 * 0.14 * ao;
          float centerDist = length(pos);
          metalCol += uAccent * exp(-centerDist * 1.7) * 0.28 * ao;
          col = metalCol + uAccent * glowAcc * 0.18;
        } else {
          // Emissive Crystalline Logo Inlay & Holographic Web UI Material
          vec3 coreBase = mix(uAccent, vec3(0.99, 0.97, 0.92), 0.20);
          col = coreBase * (0.58 + diff1 * 0.68 + diff2 * 0.22)
              + vec3(1.0) * spec1 * 1.15
              + uAccent * fresnel * 1.05;
          col += uAccent * glowAcc * 0.24;
        }
        alpha = 1.0;
      }

      col = acesFilm(col);
      col = pow(col, vec3(0.92));
      fragColor = vec4(col * alpha, alpha);
    }
  `;

  function uploadSdfTexture(gl, atlas) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const isWebGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
    if (isWebGL2) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, atlas.size, atlas.size, 0, gl.RGBA, gl.FLOAT, atlas.floatData);
      if (gl.getError() === gl.NO_ERROR) {
        return { tex, decodeRange: 0.0 };
      }
    } else {
      const extF = gl.getExtension("OES_texture_float");
      const extL = gl.getExtension("OES_texture_float_linear");
      if (extF && extL) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, atlas.size, atlas.size, 0, gl.RGBA, gl.FLOAT, atlas.floatData);
        if (gl.getError() === gl.NO_ERROR) {
          return { tex, decodeRange: 0.0 };
        }
      }
    }

    const range = 0.72;
    const u8 = new Uint8Array(atlas.floatData.length);
    for (let i = 0; i < atlas.floatData.length; i++) {
      const norm = Math.max(0, Math.min(1, 0.5 + (0.5 * atlas.floatData[i]) / range));
      u8[i] = Math.round(norm * 255);
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, atlas.size, atlas.size, 0, gl.RGBA, gl.UNSIGNED_BYTE, u8);
    return { tex, decodeRange: range };
  }

  function createStage(canvasId, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctxOpts = { alpha: true, antialias: true, premultipliedAlpha: true };
    const gl =
      canvas.getContext("webgl2", ctxOpts) ||
      canvas.getContext("webgl", ctxOpts) ||
      canvas.getContext("experimental-webgl", ctxOpts);

    if (!gl) return null;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn("WebGL shader compile warning:", gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }

    const isGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
    const hasLodExt = !isGL2 && !!gl.getExtension("EXT_shader_texture_lod");

    const vsSrc = isGL2 ? VERT_GL2 : VERT_GL1;
    const fsHeader = isGL2
      ? [
          "#version 300 es",
          "precision highp float;",
          "in vec2 vUv;",
          "out vec4 fragColor;",
          "#define SAMPLE_SDF(tex, uv) textureLod(tex, uv, 0.0)",
          ""
        ].join("\n")
      : [
          hasLodExt ? "#extension GL_EXT_shader_texture_lod : enable" : "",
          "precision highp float;",
          "varying vec2 vUv;",
          "#define fragColor gl_FragColor",
          hasLodExt
            ? "#define SAMPLE_SDF(tex, uv) texture2DLodEXT(tex, uv, 0.0)"
            : "#define SAMPLE_SDF(tex, uv) texture2D(tex, uv)",
          ""
        ]
          .filter(Boolean)
          .join("\n") + "\n";

    const vs = compile(gl.VERTEX_SHADER, vsSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fsHeader + FRAG_BODY);
    if (!vs || !fs) return null;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const atlas = buildLogoSdfAtlas();
    const { tex: sdfTex, decodeRange } = uploadSdfTexture(gl, atlas);

    const locs = {
      uRes: gl.getUniformLocation(prog, "uRes"),
      uTime: gl.getUniformLocation(prog, "uTime"),
      uMode: gl.getUniformLocation(prog, "uMode"),
      uMorph: gl.getUniformLocation(prog, "uMorph"),
      uRot: gl.getUniformLocation(prog, "uRot"),
      uScrollTilt: gl.getUniformLocation(prog, "uScrollTilt"),
      uAccent: gl.getUniformLocation(prog, "uAccent"),
      uSdfTex: gl.getUniformLocation(prog, "uSdfTex"),
      uSdfDecode: gl.getUniformLocation(prog, "uSdfDecode")
    };

    const defaultYaw = options.mode === 0 ? -0.24 : -0.20;
    const defaultPitch = options.mode === 0 ? 0.16 : 0.12;

    const state = {
      mode: options.mode || 0,
      morph: 0,
      targetMorph: 0,
      accent: options.accent ? [...options.accent] : [0.18, 0.85, 0.64],
      targetAccent: options.accent ? [...options.accent] : [0.18, 0.85, 0.64],
      rotX: defaultYaw,
      rotY: defaultPitch,
      baseRotX: defaultYaw,
      baseRotY: defaultPitch,
      hoverX: 0,
      hoverY: 0,
      scrollTilt: 0,
      dragging: false,
      lastX: 0,
      lastY: 0,
      visible: true
    };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(2, Math.round(rect.width * dpr));
      const h = Math.max(2, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const host = canvas.parentElement || canvas;

    host.addEventListener("pointerdown", (e) => {
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      host.setPointerCapture?.(e.pointerId);
    });

    host.addEventListener("pointermove", (e) => {
      if (state.dragging) {
        const dx = e.clientX - state.lastX;
        const dy = e.clientY - state.lastY;
        state.lastX = e.clientX;
        state.lastY = e.clientY;
        state.baseRotX -= dx * 0.0105;
        state.baseRotY = Math.max(-1.18, Math.min(1.18, state.baseRotY + dy * 0.0085));
      } else if (matchMedia("(pointer: fine)").matches) {
        const r = host.getBoundingClientRect();
        const nx = (e.clientX - r.left) / Math.max(r.width, 1) - 0.5;
        const ny = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5;
        state.hoverX = -nx * 0.26;
        state.hoverY = ny * 0.20;
      }
    });

    host.addEventListener("pointerleave", () => {
      if (!state.dragging) {
        state.hoverX = 0;
        state.hoverY = 0;
      }
    });

    host.addEventListener("dblclick", () => {
      state.baseRotX = defaultYaw;
      state.baseRotY = defaultPitch;
    });

    const release = () => {
      state.dragging = false;
    };
    host.addEventListener("pointerup", release);
    host.addEventListener("pointercancel", release);

    const io = new IntersectionObserver(
      (entries) => {
        state.visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "160px" }
    );
    io.observe(canvas);

    window.addEventListener("resize", resize);
    resize();

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const t0 = performance.now();

    function tick(now) {
      requestAnimationFrame(tick);
      if (!state.visible) return;

      resize();
      const elapsed = reduced.matches ? 2.4 : (now - t0) * 0.001;

      const targetX = state.baseRotX + state.hoverX;
      const targetY = Math.max(-1.25, Math.min(1.25, state.baseRotY + state.hoverY));

      state.morph += (state.targetMorph - state.morph) * 0.095;
      state.rotX += (targetX - state.rotX) * 0.09;
      state.rotY += (targetY - state.rotY) * 0.09;
      for (let k = 0; k < 3; k++) {
        state.accent[k] += (state.targetAccent[k] - state.accent[k]) * 0.08;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(prog);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, sdfTex);
      gl.uniform1i(locs.uSdfTex, 0);
      gl.uniform1f(locs.uSdfDecode, decodeRange);

      gl.uniform2f(locs.uRes, canvas.width, canvas.height);
      gl.uniform1f(locs.uTime, elapsed);
      gl.uniform1f(locs.uMode, state.mode);
      gl.uniform1f(locs.uMorph, state.morph);
      gl.uniform2f(locs.uRot, state.rotX, state.rotY);
      gl.uniform1f(locs.uScrollTilt, state.scrollTilt);
      gl.uniform3f(locs.uAccent, state.accent[0], state.accent[1], state.accent[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    requestAnimationFrame(tick);

    return {
      setMorph(val, resetAngle = false) {
        state.targetMorph = val;
        if (resetAngle && !state.dragging) {
          const twoPi = Math.PI * 2;
          const turns = Math.round((state.baseRotX - defaultYaw) / twoPi);
          state.baseRotX = defaultYaw + turns * twoPi;
          state.baseRotY = defaultPitch;
        }
      },
      setAccent(rgb) {
        state.targetAccent = rgb;
      },
      setScrollTilt(rad) {
        state.scrollTilt = rad;
      }
    };
  }

  window.AICore3D = {
    hero: createStage("hero-3d-canvas", { mode: 0, accent: [0.18, 0.85, 0.64] }),
    showcase: createStage("showcase-3d-canvas", { mode: 1, accent: [0.18, 0.85, 0.64] })
  };
})();
