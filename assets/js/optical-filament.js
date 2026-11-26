/* ==========================================================================
   OPTICAL FILAMENT RIBBON (optical-filament.js)
   Braided jade & warm-champagne filaments glide strictly along the outer page
   margins, swooping across deep section gaps as a scroll-tracking light pulse
   illuminates each chapter station. Never crosses readable body copy.
   ========================================================================== */
(() => {
  "use strict";
  const main = document.querySelector("main");
  if (!main) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const stops = [...main.children].filter((el) => el.matches("header, section"));

  const canvas = document.createElement("canvas");
  canvas.className = "optical-ribbon";
  canvas.setAttribute("aria-hidden", "true");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  document.body.prepend(canvas);

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.35);
  let xs = [];
  let ys = [];
  let stations = [];
  let cometIdx = 0;
  let rafId = 0;
  let celebrationTime = 0;

  function computePath() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.35);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const desktop = width > 1080;
    const scroll = window.scrollY;
    const anchors = [];
    let side = -1;

    stops.forEach((sec, idx) => {
      const r = sec.getBoundingClientRect();
      const st = getComputedStyle(sec);
      const top = r.top + scroll;
      const bottom = r.bottom + scroll;
      const padTop = parseFloat(st.paddingTop) || 0;
      const startY = top + padTop;

      const leftMarginX = Math.max(16, Math.min(54, width * 0.032));
      const rightMarginX = Math.min(width - 16, Math.max(width - 54, width * 0.968));

      if (idx > 0 && desktop) side = -side;
      const targetX = desktop ? (side < 0 ? leftMarginX : rightMarginX) : 14;

      if (idx === 0) {
        anchors.push({ x: targetX, y: Math.max(0, top - 120) });
        anchors.push({ x: targetX, y: startY });
      } else {
        const prev = anchors[anchors.length - 1];
        if (desktop && Math.abs(prev.x - targetX) > width * 0.4 && padTop > 100) {
          anchors.push({ x: prev.x + (targetX - prev.x) * 0.35, y: top + padTop * 0.36 });
          anchors.push({ x: prev.x + (targetX - prev.x) * 0.68, y: top + padTop * 0.66 });
        }
        anchors.push({ x: targetX, y: startY });
      }

      anchors.push({ x: targetX, y: bottom });
    });

    const last = anchors[anchors.length - 1] || { x: 24, y: 1000 };
    anchors.push({ x: last.x, y: last.y + 200 });

    // Catmull-Rom spline interpolation
    const denseX = [];
    const denseY = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      const a = anchors[Math.max(0, i - 1)];
      const b = anchors[i];
      const c = anchors[i + 1];
      const d = anchors[Math.min(anchors.length - 1, i + 2)];
      for (let s = 0; s < 1; s += 1 / 28) {
        const s2 = s * s;
        const s3 = s2 * s;
        const interp = (q0, q1, q2, q3) =>
          0.5 *
          (2 * q1 +
            (q2 - q0) * s +
            (2 * q0 - 5 * q1 + 4 * q2 - q3) * s2 +
            (3 * q1 - q0 - 3 * q2 + q3) * s3);
        denseX.push(interp(a.x, b.x, c.x, d.x));
        denseY.push(interp(a.y, b.y, c.y, d.y));
      }
    }

    // Resample every 8px
    xs = [denseX[0]];
    ys = [denseY[0]];
    let carry = 0;
    const STEP = 8;
    for (let i = 1; i < denseX.length; i++) {
      const dx = denseX[i] - denseX[i - 1];
      const dy = denseY[i] - denseY[i - 1];
      const seg = Math.hypot(dx, dy);
      let at = STEP - carry;
      while (at <= seg) {
        const t = at / seg;
        xs.push(denseX[i - 1] + dx * t);
        ys.push(denseY[i - 1] + dy * t);
        at += STEP;
      }
      carry = seg - (at - STEP);
    }

    stations = stops.map((sec) => {
      const sy = sec.getBoundingClientRect().top + scroll + (parseFloat(getComputedStyle(sec).paddingTop) || 0);
      let k = 0;
      while (k < ys.length - 1 && ys[k] < sy) k++;
      return { idx: k, litAt: 0 };
    });

    requestTick();
  }

  function render(now) {
    rafId = 0;
    if (!xs.length) return;

    const scroll = window.scrollY;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(0, -scroll);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let first = 0;
    let last = ys.length - 1;
    while (first < ys.length && ys[first] < scroll - 140) first++;
    while (last > 0 && ys[last] > scroll + height + 140) last--;

    if (last > first) {
      const strands = [
        { color: "#1d9e75", width: 8, alpha: 0.05, phase: 0 },
        { color: "#5ce6b8", width: 1.5, alpha: 0.34, phase: 0 },
        { color: "#e4c482", width: 1.1, alpha: 0.24, phase: 2.1 },
        { color: "#68b5f8", width: 1.1, alpha: 0.2, phase: 4.2 }
      ];

      for (const st of strands) {
        ctx.strokeStyle = st.color;
        ctx.lineWidth = st.width;
        ctx.globalAlpha = st.alpha;
        ctx.beginPath();
        for (let i = first; i <= last; i += 2) {
          const braid = Math.sin(i * 0.035 + st.phase + (reduced.matches ? 0 : now * 0.0012)) * (width > 1080 ? 9 : 3.5);
          const px = xs[i] + braid;
          const py = ys[i];
          if (i === first) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Scroll-tracking comet head
      const focalY = scroll + height * 0.44;
      let targetIdx = first;
      while (targetIdx < ys.length - 1 && ys[targetIdx] < focalY) targetIdx++;

      if (reduced.matches || cometIdx === 0) {
        cometIdx = targetIdx;
      } else {
        cometIdx += (targetIdx - cometIdx) * 0.14;
      }

      const head = Math.min(ys.length - 2, Math.max(1, Math.floor(cometIdx)));
      const tail = Math.max(0, head - 28);
      for (let i = tail; i <= head; i++) {
        const k = (i - tail) / Math.max(1, head - tail);
        ctx.strokeStyle = "#dffaf0";
        ctx.globalAlpha = k * k * 0.85;
        ctx.lineWidth = 0.8 + k * 2.4;
        ctx.beginPath();
        ctx.moveTo(xs[i], ys[i]);
        ctx.lineTo(xs[i + 1], ys[i + 1]);
        ctx.stroke();
      }

      const hx = xs[head];
      const hy = ys[head];
      const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 24);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.25, "rgba(92, 230, 184, 0.65)");
      g.addColorStop(1, "rgba(29, 158, 117, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = g;
      ctx.fillRect(hx - 24, hy - 24, 48, 48);

      // Station rings & ripples
      let activeAnim = Math.abs(targetIdx - cometIdx) > 0.4;
      for (const s of stations) {
        if (!s.litAt && cometIdx >= s.idx - 2) {
          s.litAt = now || 1;
        }
        const sx = xs[s.idx];
        const sy = ys[s.idx];
        if (sy < scroll - 80 || sy > scroll + height + 80) continue;

        ctx.globalAlpha = s.litAt ? 0.85 : 0.28;
        ctx.strokeStyle = s.litAt ? "#9ef3d8" : "#4b6b63";
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(sx, sy, 6.5, 0, Math.PI * 2);
        ctx.stroke();

        if (s.litAt && !reduced.matches) {
          const p = (now - s.litAt) / 1100;
          if (p < 1) {
            activeAnim = true;
            const ease = 1 - Math.pow(1 - p, 3);
            ctx.globalAlpha = (1 - p) * 0.65;
            ctx.beginPath();
            ctx.arc(sx, sy, 8 + ease * 58, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      if (celebrationTime > 0 && now - celebrationTime < 1800) {
        activeAnim = true;
        const p = (now - celebrationTime) / 1800;
        const cx = width * 0.5;
        const cy = scroll + height * 0.55;
        ctx.globalAlpha = (1 - p) * 0.45;
        ctx.strokeStyle = "#5ce6b8";
        ctx.lineWidth = 2 * (1 - p);
        ctx.beginPath();
        ctx.arc(cx, cy, 30 + p * 420, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (!reduced.matches || activeAnim) {
        requestTick();
      }
    }

    ctx.restore();
  }

  function requestTick() {
    if (!rafId) rafId = requestAnimationFrame(render);
  }

  let resizeTimer;
  const scheduleRebuild = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(computePath, 160);
  };

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", scheduleRebuild);
  document.addEventListener("toggle", scheduleRebuild, true);
  document.fonts?.ready.then(scheduleRebuild);
  window.addEventListener("load", scheduleRebuild, { once: true });

  window.OpticalFilament = {
    pulseDecision() {
      celebrationTime = performance.now();
      requestTick();
    }
  };

  computePath();
})();
