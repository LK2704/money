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
    width = document.documentElement.clientWidth || window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, width <= 768 ? 1.75 : 1.35);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const desktop = width > 1080;
    const scroll = window.scrollY;
    const marginX = desktop ? Math.max(24, Math.min(54, width * 0.032)) : 10;
    const leftMarginX = marginX;
    const rightMarginX = width - marginX;

    const segments = [];
    let side = -1;
    let prevX = leftMarginX;
    let prevY = 0;

    stops.forEach((sec, idx) => {
      const r = sec.getBoundingClientRect();
      const st = getComputedStyle(sec);
      const top = r.top + scroll;
      const bottom = r.bottom + scroll;
      const padTop = parseFloat(st.paddingTop) || 0;
      const startY = top + padTop;

      if (idx > 0 && desktop) side = -side;
      const targetX = desktop ? (side < 0 ? leftMarginX : rightMarginX) : leftMarginX;

      if (idx === 0) {
        prevX = targetX;
        prevY = Math.max(0, top - 120);
        segments.push({ x0: prevX, y0: prevY, x1: targetX, y1: startY, curve: false });
      } else {
        const swoop = desktop && Math.abs(prevX - targetX) > 1;
        segments.push({ x0: prevX, y0: prevY, x1: targetX, y1: startY, curve: swoop });
      }

      segments.push({ x0: targetX, y0: startY, x1: targetX, y1: bottom, curve: false });
      prevX = targetX;
      prevY = bottom;
    });

    segments.push({ x0: prevX, y0: prevY, x1: prevX, y1: prevY + 200, curve: false });

    // Overshoot-free C2 quintic S-curve for horizontal swoops, strict vertical rails elsewhere
    const denseX = [];
    const denseY = [];
    for (const seg of segments) {
      const steps = seg.curve ? 48 : Math.max(2, Math.ceil(Math.abs(seg.y1 - seg.y0) / 36));
      for (let k = 0; k < steps; k++) {
        const s = k / steps;
        const easeX = seg.curve ? s * s * s * (s * (s * 6 - 15) + 10) : s;
        denseX.push(seg.x0 + (seg.x1 - seg.x0) * easeX);
        denseY.push(seg.y0 + (seg.y1 - seg.y0) * s);
      }
    }
    const lastSeg = segments[segments.length - 1];
    if (lastSeg) {
      denseX.push(lastSeg.x1);
      denseY.push(lastSeg.y1);
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
    if (!xs.length || document.documentElement.classList.contains("has-intro")) return;

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
      const mobile = width <= 1080;
      const strands = [
        { color: "#1d9e75", width: mobile ? 5 : 8, alpha: mobile ? 0.045 : 0.05, phase: 0 },
        { color: "#5ce6b8", width: mobile ? 1.25 : 1.5, alpha: mobile ? 0.36 : 0.34, phase: 0 },
        { color: "#e4c482", width: mobile ? 0.95 : 1.1, alpha: mobile ? 0.24 : 0.24, phase: 2.1 },
        { color: "#68b5f8", width: mobile ? 0.95 : 1.1, alpha: mobile ? 0.20 : 0.2, phase: 4.2 }
      ];

      for (const st of strands) {
        ctx.strokeStyle = st.color;
        ctx.lineWidth = st.width;
        ctx.globalAlpha = st.alpha;
        ctx.beginPath();
        for (let i = first; i <= last; i += 2) {
          const braid = Math.sin(i * 0.035 + st.phase + (reduced.matches ? 0 : now * 0.0012)) * (mobile ? 2.0 : 7);
          const px = Math.max(6, Math.min(width - 6, xs[i] + braid));
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
      const tail = Math.max(0, head - (mobile ? 22 : 28));
      for (let i = tail; i <= head; i++) {
        const k = (i - tail) / Math.max(1, head - tail);
        ctx.strokeStyle = "#dffaf0";
        ctx.globalAlpha = k * k * 0.85;
        ctx.lineWidth = (mobile ? 0.7 : 0.8) + k * (mobile ? 1.8 : 2.4);
        ctx.beginPath();
        ctx.moveTo(xs[i], ys[i]);
        ctx.lineTo(xs[i + 1], ys[i + 1]);
        ctx.stroke();
      }

      const hx = xs[head];
      const hy = ys[head];
      const glowR = mobile ? 14 : 24;
      const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, glowR);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.28, "rgba(92, 230, 184, 0.65)");
      g.addColorStop(1, "rgba(29, 158, 117, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = g;
      ctx.fillRect(hx - glowR, hy - glowR, glowR * 2, glowR * 2);

      // Station rings & ripples
      let activeAnim = Math.abs(targetIdx - cometIdx) > 0.4;
      const ringR = mobile ? 4.2 : 6.5;
      for (const s of stations) {
        if (!s.litAt && cometIdx >= s.idx - 2) {
          s.litAt = now || 1;
        }
        const sx = xs[s.idx];
        const sy = ys[s.idx];
        if (sy < scroll - 80 || sy > scroll + height + 80) continue;

        ctx.globalAlpha = s.litAt ? 0.85 : 0.28;
        ctx.strokeStyle = s.litAt ? "#9ef3d8" : "#4b6b63";
        ctx.lineWidth = mobile ? 1.15 : 1.3;
        ctx.beginPath();
        ctx.arc(sx, sy, ringR, 0, Math.PI * 2);
        ctx.stroke();

        if (s.litAt && !reduced.matches) {
          const p = (now - s.litAt) / 1100;
          if (p < 1) {
            activeAnim = true;
            const ease = 1 - Math.pow(1 - p, 3);
            ctx.globalAlpha = (1 - p) * (mobile ? 0.52 : 0.65);
            ctx.beginPath();
            ctx.arc(sx, sy, ringR + 2 + ease * (mobile ? 28 : 58), 0, Math.PI * 2);
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

  window.addEventListener("intro:done", () => {
    computePath();
    requestTick();
  }, { once: true });

  if (!document.documentElement.classList.contains("has-intro")) {
    requestAnimationFrame(computePath);
  }
})();
