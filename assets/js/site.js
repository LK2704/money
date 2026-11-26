/* ==========================================================================
   SCROLL CHOREOGRAPHY & INTERACTIVE INVESTMENT PROPOSAL LOGIC (site.js)
   - GSAP ScrollTrigger pinned 3-AI 3D logo showcase (ChatGPT, Claude, Antigravity)
   - Hero 3D Workstation Laptop camera scroll scrub
   - Parent-friendly Career & ROI Tabs, Live Salary-Ratio / Web-Income / 3D Light,
     15M Salary-anchored 10K/day Budget Worksheet, Q&A & Decision Console.
   ========================================================================== */
(() => {
  "use strict";

  const byId = (id) => document.getElementById(id);
  const all = (sel) => [...document.querySelectorAll(sel)];
  const fmtNum = (n) => Math.round(n).toLocaleString("vi-VN");
  const fmtVnd = (n) => `${fmtNum(n)} ₫`;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  const DAILY_SALARY = 500000; // 15.000.000 ₫ / 30 ngày
  const DAILY_AI_COST = 10000;
  const BASIC_WEB_VALUE = 2000000; // Giá trị thị trường phổ biến 1 trang Web giới thiệu/bán hàng cơ bản

  /* ========================================================================
     0. STEALTH RECIPIENT MODE ("me" <-> "bo")
        Controlled via the tiny unlit micro-dot at bottom-right (or Alt+P).
     ======================================================================== */
  let recipient = "me";
  try {
    if (localStorage.getItem("proposal_recipient") === "bo") {
      recipient = "bo";
    }
  } catch {}

  const adapt = (str) => {
    if (recipient !== "bo" || typeof str !== "string") return str;
    return str
      .replace(/hai mẹ con/g, "hai bố con")
      .replace(/Mẹ/g, "Bố")
      .replace(/mẹ/g, "bố");
  };

  const baseTitle = "Khoản Đầu Tư Cho Tương Lai — 10.000 ₫/ngày học làm Web cùng AI";
  const trackedNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let tNode;
  while ((tNode = walker.nextNode())) {
    if (/[Mm]ẹ/.test(tNode.nodeValue)) {
      trackedNodes.push({ node: tNode, base: tNode.nodeValue });
    }
  }
  const trackedAria = all("[aria-label]").filter((el) => /[Mm]ẹ/.test(el.getAttribute("aria-label") || ""));
  const baseAria = new Map(trackedAria.map((el) => [el, el.getAttribute("aria-label")]));

  // Dynamic Vietnamese date stamp
  const now = new Date();
  const dateEl = byId("letter-date");
  if (dateEl) {
    dateEl.textContent = `${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}`;
  }

  /* ========================================================================
     1. MOBILE MENU TOGGLE
     ======================================================================== */
  const nav = document.querySelector(".nav");
  const menuBtn = document.querySelector(".menu-toggle");
  if (nav && menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    all(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ========================================================================
     2. THREE REAL-WORLD WEB BENEFITS & CAREER TABS (#lydo — PARENT-FRIENDLY)
     ======================================================================== */
  const STUDIES = {
    web: {
      title: "Tự tay xây dựng hoàn chỉnh một trang Web chạy thật.",
      desc: "Con được rèn bài bản từ kiến trúc cấu trúc trang, mỹ thuật trình bày hiện đại, thuật toán xử lý tương tác cho đến đồ họa không gian 3 chiều trực tiếp trên trình duyệt. Nhờ có AI phân tích từng khối mã nguồn và sửa lỗi ngay lập tức, con vừa hiểu sâu nguyên lý vừa ra sản phẩm nhanh gấp nhiều lần cách học mò mẫm thông thường.",
      tools: ["Kiến trúc & Mỹ thuật Web", "Thuật toán tương tác", "Đồ họa 3 chiều thực tế"],
      caption: "Học đến đâu có sản phẩm hoàn chỉnh chạy trên điện thoại và máy tính đến đó.",
      detail: "Kiểm chứng rõ ràng: mỗi Chủ Nhật con đều mở trang Web mới tự làm cho Mẹ xem trực tiếp."
    },
    career: {
      title: "Đi trước 2–3 năm trong ngành nghề công nghệ có thu nhập cao.",
      desc: "Mọi doanh nghiệp, cửa hàng và thương hiệu hiện nay đều cần hệ thống Website chuyên nghiệp để kinh doanh. Làm chủ kỹ thuật thiết kế, lập trình giao diện và điều phối trí tuệ nhân tạo từ sớm giúp con có lợi thế vượt trội cho các vị trí kỹ sư thiết kế Website, chuyên viên đồ họa tương tác hoặc nhận dự án độc lập cho doanh nghiệp.",
      tools: ["Kỹ sư giao diện Web", "Đồ họa tương tác 3D", "Nhận dự án độc lập"],
      caption: "Xây dựng bộ hồ sơ năng lực thực tế trước cả khi bước vào đại học và đi làm.",
      detail: "Bộ sản phẩm Web chạy thật là lợi thế thuyết phục nhất khi xét học bổng, đi thực tập và ứng tuyển sau này."
    },
    roi: {
      title: "Cơ hội nhận dự án thiết kế Web và tự hoàn lại toàn bộ vốn.",
      desc: "Khác với nhiều khoản học phí khó thấy kết quả ngay, làm Website tạo ra sản phẩm có giá trị giao dịch thực tế. Một trang Web giới thiệu sản phẩm cho cửa hàng nhỏ có giá thị trường 2 – 3 triệu ₫; Website trọn gói cho doanh nghiệp từ 4 – 8 triệu ₫.",
      tools: ["Web bán hàng: 2–3tr", "Web công ty: 4–8tr", "Chăm sóc & nâng cấp"],
      caption: "Chỉ cần nhận 1 dự án nhỏ đầu tiên là đủ hoàn lại 6 – 10 tháng chi phí AI.",
      detail: "Mục tiêu thực tế của con: từ tháng thứ 4 bắt đầu tự nhận dự án nhỏ và tự trang trải khoản 10.000 ₫/ngày."
    }
  };

  const studyTabs = all("[data-study]");
  function selectStudy(btn) {
    const data = STUDIES[btn.dataset.study];
    if (!data) return;
    studyTabs.forEach((t) => {
      const active = t === btn;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    byId("study-title").textContent = adapt(data.title);
    byId("study-description").textContent = adapt(data.desc);
    byId("study-tool-a").textContent = data.tools[0];
    byId("study-tool-b").textContent = data.tools[1];
    byId("study-tool-c").textContent = data.tools[2];
    byId("study-map-caption").textContent = adapt(data.caption);
    byId("study-detail").textContent = adapt(data.detail);
    byId("study-panel").setAttribute("aria-labelledby", btn.id);
  }

  studyTabs.forEach((btn, i) => {
    btn.addEventListener("click", () => selectStudy(btn));
    btn.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      const step = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : -1;
      const next = studyTabs[(i + step + studyTabs.length) % studyTabs.length];
      selectStudy(next);
      next.focus();
    });
  });

  /* ========================================================================
     3. PINNED SCROLL-DRIVEN 3D AI LOGO SHOWCASE (#congcu — PURELY 3 AIs)
     ======================================================================== */
  const CHAPTERS = [
    {
      feature: "ChatGPT",
      logoId: "#logo-openai",
      label: "OpenAI · Giảng giải nguyên lý & tư duy thuật toán 24/7",
      title: "Người thầy giảng giải cặn kẽ mọi nguyên lý lập trình.",
      desc: "Mỗi khi gặp một tính năng Web phức tạp hay một bài toán logic hóc búa, ChatGPT phân tích bản chất từng bước bằng ví dụ thực tế dễ hiểu, giúp con nắm chắc gốc rễ thuật toán và cấu trúc vận hành trước khi bắt tay vào xây dựng.",
      insight: "Giống như có một kỹ sư lập trình giàu kinh nghiệm ngồi kèm riêng ngay tại bàn học.",
      accent: [0.18, 0.85, 0.64], // Jade Emerald
      colorCss: "#5ce6b8"
    },
    {
      feature: "Claude",
      logoId: "#logo-claude",
      label: "Anthropic · Mã nguồn chuẩn mực & thẩm mỹ trình bày",
      title: "Chuyên gia tối ưu mã nguồn và thiết kế Website chỉn chu.",
      desc: "Trong lĩnh vực xây dựng Website chuyên nghiệp, Claude dẫn đầu ở khả năng sắp xếp cấu trúc trang mạch lạc, tối ưu hiển thị đẹp trên cả điện thoại lẫn máy tính và phát hiện sớm lỗi kỹ thuật giúp con rèn tác phong làm nghề bài bản.",
      insight: "Giúp sản phẩm Web con làm đạt độ hoàn thiện đủ chuẩn bàn giao cho khách hàng.",
      accent: [0.90, 0.50, 0.36], // Warm Copper-Terracotta
      colorCss: "#f09a7e"
    },
    {
      feature: "Antigravity",
      logoId: "#logo-antigravity",
      label: "Google DeepMind · Môi trường tự động dựng trọn dự án Web",
      title: "Biến ý tưởng thành Website thương mại hoàn chỉnh.",
      desc: "Khác với khung hỏi đáp đơn lẻ, Google Antigravity là không gian làm việc thế hệ mới giúp kết nối đồng bộ toàn bộ bố cục giao diện, hiệu ứng chuyển động mượt và đồ họa 3 chiều — chính là công cụ đã cùng con hoàn thiện trang thuyết trình này.",
      insight: "Rút ngắn thời gian hoàn thiện một Website từ nhiều tuần xuống chỉ còn vài buổi tối.",
      accent: [0.44, 0.74, 0.98], // Arctic Celestial Blue
      colorCss: "#84c5ff"
    }
  ];

  // Dwell-plateau scroll mapping across the 3 AI logos (0.0 -> 1.0 -> 2.0)
  function scrollToMorph(progress) {
    const p = Math.max(0, Math.min(1, progress));
    const smooth = (a, b, x) => {
      const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    if (p < 0.24) return 0;
    if (p < 0.42) return smooth(0.24, 0.42, p);
    if (p < 0.58) return 1;
    if (p < 0.76) return 1 + smooth(0.58, 0.76, p);
    return 2;
  }

  const partBtns = all("[data-part]");
  let activeChapter = 0;
  const g = window.gsap;

  function activateChapter(index, fromScroll = false) {
    const clamped = Math.max(0, Math.min(CHAPTERS.length - 1, index));
    const ch = CHAPTERS[clamped];

    partBtns.forEach((btn, i) => {
      btn.setAttribute("aria-pressed", String(i === clamped));
    });

    if (window.AICore3D?.showcase) {
      if (!fromScroll) {
        window.AICore3D.showcase.setMorph(clamped, true);
      }
      window.AICore3D.showcase.setAccent(ch.accent);
    }

    if (clamped === activeChapter && fromScroll) return;
    activeChapter = clamped;

    const featEl = byId("stage-feature");
    const logoMarkEl = byId("stage-logo-mark");
    const logoUseEl = byId("stage-logo-use");
    const labelEl = byId("stage-feature-label");
    const titleEl = byId("part-title");
    const descEl = byId("part-description");
    const insightEl = byId("showcase-insight");

    featEl.textContent = ch.feature;
    featEl.style.color = ch.colorCss;
    if (logoMarkEl) logoMarkEl.style.color = ch.colorCss;
    if (logoUseEl) logoUseEl.setAttribute("href", ch.logoId);
    labelEl.textContent = adapt(ch.label);
    titleEl.textContent = adapt(ch.title);
    descEl.textContent = adapt(ch.desc);
    insightEl.textContent = adapt(ch.insight);

    if (g && !reduced.matches) {
      g.fromTo(
        [titleEl, descEl, insightEl],
        { y: 10, opacity: 0.35 },
        { y: 0, opacity: 1, duration: 0.48, stagger: 0.04, ease: "expo.out" }
      );
      g.fromTo(
        ".stage-marker",
        { y: 10, opacity: 0.35 },
        { y: 0, opacity: 1, duration: 0.48, ease: "expo.out" }
      );
    }
  }

  partBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.part);
      activateChapter(idx, false);
      const story = byId("product-story");
      if (story && document.documentElement.classList.contains("motion-ready")) {
        const anchors = [0.12, 0.50, 0.88];
        const top = story.getBoundingClientRect().top + window.scrollY;
        const span = Math.max(0, story.offsetHeight - window.innerHeight);
        const targetScroll = top + (anchors[idx] ?? 0) * span;
        window.scrollTo({ top: targetScroll, behavior: reduced.matches ? "auto" : "smooth" });
      }
    });
  });

  // GSAP + ScrollTrigger Continuous Choreography
  if (g && window.ScrollTrigger) {
    g.registerPlugin(window.ScrollTrigger);
    const mm = g.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      g.fromTo(
        ".hero h1 > span",
        { yPercent: 24, clipPath: "inset(0 0 100% 0)" },
        {
          yPercent: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.05,
          stagger: 0.11,
          ease: "expo.out",
          clearProps: "all"
        }
      );

      window.ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          window.AICore3D?.hero?.setScrollTilt(self.progress * 0.40);
        }
      });

      all(".reveal").forEach((el) => {
        g.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "expo.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true
            }
          }
        );
      });
    });

    // Desktop Pinned Sticky 3D AI Showcase (3 crisp chapters)
    mm.add("(min-width: 961px) and (prefers-reduced-motion: no-preference)", () => {
      const story = byId("product-story");
      if (!story) return;

      document.documentElement.classList.add("motion-ready");
      const progressWrap = document.createElement("div");
      progressWrap.className = "story-progress";
      progressWrap.setAttribute("aria-hidden", "true");
      progressWrap.innerHTML = "<span></span>";
      story.querySelector(".story-sticky").prepend(progressWrap);

      const storyTop = () => story.getBoundingClientRect().top + window.scrollY;
      const st = window.ScrollTrigger.create({
        trigger: story,
        start: storyTop,
        end: () => storyTop() + story.offsetHeight - window.innerHeight,
        onUpdate: (self) => {
          progressWrap.firstElementChild.style.transform = `scaleX(${self.progress})`;
          const morphed = scrollToMorph(self.progress);
          window.AICore3D?.showcase?.setMorph(morphed);

          const idx = Math.min(CHAPTERS.length - 1, Math.floor(self.progress * (CHAPTERS.length - 0.01)));
          if (idx !== activeChapter) {
            activateChapter(idx, true);
          }
        }
      });

      return () => {
        st.kill();
        progressWrap.remove();
        document.documentElement.classList.remove("motion-ready");
      };
    });

    document.addEventListener(
      "toggle",
      (e) => {
        if (e.target instanceof HTMLDetailsElement) {
          requestAnimationFrame(() => window.ScrollTrigger.refresh());
        }
      },
      true
    );
    document.fonts?.ready.then(() => window.ScrollTrigger.refresh());
  }

  /* ========================================================================
     4. LIVE PROOF WORKBENCH (#vibecode): SALARY RATIO · WEB ROI · 3D LIGHT
     ======================================================================== */
  const DEMOS = {
    ratio: {
      file: "ti-le-luong-ngay.js",
      lesson:
        "Tỷ lệ thực tế: với mức lương ~15 triệu ₫/tháng (500.000 ₫/ngày), 10.000 ₫ chỉ là 2% — giữ nguyên 98% thu nhập cho sinh hoạt gia đình.",
      getCode() {
        return `<span class="c-cmt">// Đối chiếu khoản đầu tư AI với thu nhập ~15.000.000 ₫/tháng</span>
<span class="c-kw">const</span> luongThang = 15000000;
<span class="c-kw">const</span> luongNgay = luongThang / 30;  <span class="c-cmt">// 500.000 ₫ / ngày</span>
<span class="c-kw">const</span> dauTuAI = 10000;              <span class="c-cmt">// 10.000 ₫ / ngày</span>

<span class="c-kw">const</span> tyLe = (dauTuAI / luongNgay) * 100; <span class="c-cmt">// Đúng 2.0% (~9,6 phút / 8h làm)</span>`;
      },
      renderLive(host) {
        let monthlyMode = false;
        function draw() {
          const income = monthlyMode ? DAILY_SALARY * 30 : DAILY_SALARY;
          const aiCost = monthlyMode ? DAILY_AI_COST * 30 : DAILY_AI_COST;
          const keep = income - aiCost;
          const periodLabel = monthlyMode ? "1 tháng (30 ngày)" : "1 ngày làm việc";
          host.innerHTML = `
            <div>
              <div class="demo-ledger-row">
                <span>${adapt(`Thu nhập ${periodLabel} của Mẹ`)}</span>
                <strong>${fmtVnd(income)}</strong>
              </div>
              <div class="demo-ledger-row">
                <span>Khoản đầu tư bộ 3 AI học làm Web (2%)</span>
                <strong style="color:var(--signal)">${fmtVnd(aiCost)}</strong>
              </div>
              <div class="demo-ledger-row">
                <span>Thu nhập còn nguyên cho gia đình (98%)</span>
                <strong>${fmtVnd(keep)}</strong>
              </div>
              <div class="demo-ledger-total">
                <span>Quy đổi theo 8 tiếng làm việc mỗi ngày</span>
                <span>Chỉ ~10 phút / 480 phút</span>
              </div>
              <button type="button" class="demo-action-link" id="demo-ratio-toggle">
                ${monthlyMode ? "↺ Xem quy đổi theo 1 ngày (500.000 ₫)" : "→ Xem quy đổi theo cả tháng (15.000.000 ₫)"}
              </button>
            </div>
          `;
          host.querySelector("#demo-ratio-toggle").addEventListener("click", () => {
            monthlyMode = !monthlyMode;
            draw();
          });
        }
        draw();
      }
    },
    roi: {
      file: "uoc-tinh-hoan-von-web.js",
      lesson:
        "Chỉ cần thành thạo và nhận 1 dự án Website thực tế đầu tiên là đủ hoàn lại toàn bộ chi phí đầu tư AI của nhiều tháng liền.",
      getCode() {
        return `<span class="c-cmt">// Tính số tháng tiền AI (300.000 ₫/tháng) được hoàn lại từ 1 dự án Web</span>
<span class="c-kw">const</span> duAnWeb = [
  { loai: <span class="c-str">"Trang Web giới thiệu bán hàng"</span>, giaTri: 2000000 },
  { loai: <span class="c-str">"Website giới thiệu công ty"</span>, giaTri: 4500000 },
  { loai: <span class="c-str">"Website thương hiệu đồ họa 3D"</span>, giaTri: 6000000 }
];
<span class="c-kw">const</span> soThangHoanVon = (giaTri) => (giaTri / 300000).toFixed(1);`;
      },
      renderLive(host) {
        const projects = [
          {
            btn: "Web bán hàng cơ bản",
            name: "Trang Web giới thiệu sản phẩm & đặt hàng",
            price: 2000000,
            desc: "Phù hợp cho cửa hàng trực tuyến, tiệm làm đẹp, quán ăn hoặc dịch vụ địa phương."
          },
          {
            btn: "Web doanh nghiệp",
            name: "Website giới thiệu cửa hàng / công ty",
            price: 4500000,
            desc: "Gồm trang chủ, danh mục sản phẩm, bảng giá minh bạch và mục nhận liên hệ khách hàng."
          },
          {
            btn: "Web đồ họa 3D",
            name: "Website thương hiệu có mô hình 3D tương tác",
            price: 6000000,
            desc: "Giao diện cao cấp có hiệu ứng chuyển động mượt và đồ họa 3 chiều giống trang này."
          }
        ];
        let idx = 0;
        function draw() {
          const p = projects[idx];
          const monthsCovered = (p.price / 300000).toFixed(1).replace(".0", "");
          host.innerHTML = `
            <div>
              <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px;">
                ${projects
                  .map(
                    (item, i) => `
                  <button type="button" class="small-control" data-roi-idx="${i}" aria-pressed="${i === idx}">
                    ${item.btn}
                  </button>`
                  )
                  .join("")}
              </div>
              <div class="demo-ledger-row">
                <span>${p.name}</span>
                <strong>${fmtVnd(p.price)}</strong>
              </div>
              <div class="demo-ledger-row">
                <span>Chi phí AI 1 tháng (10K / ngày)</span>
                <span>300.000 ₫</span>
              </div>
              <div class="demo-ledger-total">
                <span>1 dự án này hoàn vốn được</span>
                <span>${monthsCovered} tháng tiền AI</span>
              </div>
              <p style="font-size:13px; color:var(--text-muted); margin-top:12px;">${p.desc}</p>
            </div>
          `;
          host.querySelectorAll("[data-roi-idx]").forEach((b) => {
            b.addEventListener("click", () => {
              idx = Number(b.dataset.roiIdx);
              draw();
            });
          });
        }
        draw();
      }
    },
    shader: {
      file: "anh-sang-do-hoa-3d.glsl",
      lesson:
        "Minh chứng tay nghề lập trình đồ họa: khi Mẹ bấm đổi màu nguồn sáng bên cạnh, toàn bộ mô hình 3D trên trang sẽ tự tính lại ánh sáng kim loại ngay tức thì.",
      getCode() {
        return `<span class="c-cmt">// Công thức tính phản xạ ánh sáng viền kim loại trên mô hình 3 chiều</span>
<span class="c-kw">vec3</span> huongMat = calcNormal(viTri3D);
<span class="c-kw">float</span> vienSang = pow(1.0 - max(dot(huongMat, huongNhin), 0.0), 3.2);
<span class="c-kw">vec3</span> mauKimLoai = mauNen * doSang + mauNguonSang * vienSang;`;
      },
      renderLive(host) {
        const presets = [
          { label: "Ngọc lục bảo (ChatGPT)", rgb: [0.18, 0.85, 0.64] },
          { label: "Đồng ấm (Claude)", rgb: [0.90, 0.50, 0.36] },
          { label: "Băng lam (Antigravity)", rgb: [0.44, 0.74, 0.98] },
          { label: "Vàng kim (Tương lai)", rgb: [0.90, 0.77, 0.50] }
        ];
        let current = 0;
        function draw() {
          host.innerHTML = `
            <div>
              <p style="font-size:14.5px; color:var(--text-muted); margin-bottom:16px;">
                ${adapt("Mẹ bấm đổi nguồn sáng bên dưới — mô hình Laptop 3D và 3 logo AI phía trên sẽ đổi màu ánh kim tức thì:")}
              </p>
              <div style="display:flex; flex-wrap:wrap; gap:8px;">
                ${presets
                  .map(
                    (p, i) => `
                  <button type="button" class="small-control" data-light-idx="${i}" aria-pressed="${i === current}">
                    ${p.label}
                  </button>`
                  )
                  .join("")}
              </div>
            </div>
          `;
          host.querySelectorAll("[data-light-idx]").forEach((b) => {
            b.addEventListener("click", () => {
              current = Number(b.dataset.lightIdx);
              const chosen = presets[current];
              window.AICore3D?.showcase?.setAccent(chosen.rgb);
              window.AICore3D?.hero?.setAccent(chosen.rgb);
              draw();
            });
          });
        }
        draw();
      }
    }
  };

  let currentDemoKey = "ratio";
  let currentWbView = "live";

  function renderWorkbench() {
    const demo = DEMOS[currentDemoKey];
    if (!demo) return;
    byId("wb-filename").textContent = demo.file;
    byId("workbench-lesson").innerHTML = adapt(demo.lesson);

    const host = byId("wb-body");
    if (currentWbView === "code") {
      host.innerHTML = `<pre class="wb-code">${demo.getCode()}</pre>`;
    } else {
      demo.renderLive(host);
    }
  }

  all("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentDemoKey = btn.dataset.demo;
      all("[data-demo]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      renderWorkbench();
    });
  });

  all("[data-wbview]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentWbView = btn.dataset.wbview;
      all("[data-wbview]").forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
      renderWorkbench();
    });
  });

  renderWorkbench();

  /* ========================================================================
     5. PLAN OPTIONS (#phuongan) & 15M SALARY BUDGET WORKSHEET (#chiphi)
     ======================================================================== */
  const PLANS = [
    {
      days: 7,
      heroPrice: "70.000 ₫ / tuần đầu",
      heroSub: "Chưa tới 0,5% lương tháng (15 triệu) · Thử nghiệm kiểm chứng",
      reason:
        "Phương án thử nghiệm 7 ngày chỉ tốn 70.000 ₫ (bằng 0,47% lương tháng 15 triệu của Mẹ) để kiểm chứng thái độ tự học trước. Hết tuần đầu tiên, nếu con hoàn thành đúng sản phẩm Web mới như đã hứa thì Mẹ mới duyệt tiếp theo tháng."
    },
    {
      days: 30,
      heroPrice: "10.000 ₫ / ngày",
      heroSub: "Chỉ 2% lương ngày của Mẹ (300.000 ₫ / 15 triệu)",
      reason:
        "Gói chuẩn 300.000 ₫ mỗi tháng chỉ chiếm đúng 2% trong tổng thu nhập 15.000.000 ₫ — để nguyên 14.700.000 ₫ cho gia đình, trong khi Mẹ vẫn giữ toàn quyền dừng cấp vốn bất kỳ lúc nào nếu con không có sản phẩm mới."
    },
    {
      days: 90,
      heroPrice: "10.000 ₫ / ngày",
      heroSub: "900.000 ₫ cho 3 tháng vững nghề · Hoàn vốn chỉ sau 1 dự án nhỏ",
      reason:
        "Lộ trình 3 tháng (900.000 ₫ — vẫn chỉ 2% tổng thu nhập 45 triệu trong 3 tháng) đưa con từ nền tảng cơ bản tới lúc sở hữu trọn bộ dự án Web thực tế và đủ năng lực nhận dự án đầu tiên để tự hoàn lại toàn bộ số vốn này."
    }
  ];

  let selectedPlanIdx = 1;
  const daysInput = byId("days-range");

  function updateWorksheet(daysVal) {
    const days = Math.max(7, Math.min(180, Number(daysVal) || 30));
    daysInput.value = String(days);
    byId("days-output").value = `${days} ngày`;

    const total = days * DAILY_AI_COST;
    const periodIncome = days * DAILY_SALARY;
    const familyKeep = periodIncome - total;

    byId("total-price").textContent = fmtVnd(total);
    byId("budget-equivalent").textContent = adapt(
      `Chiếm đúng 2% trong ${fmtVnd(periodIncome)} thu nhập ${days} ngày của Mẹ — giữ nguyên ${fmtVnd(familyKeep)} (98%) cho gia đình và rẻ hơn gần 10 lần so với học trung tâm.`
    );

    const ratioAiEl = byId("ratio-bar-ai-text");
    const ratioKeepEl = byId("ratio-bar-keep-text");
    if (ratioAiEl) ratioAiEl.textContent = `2% (${fmtVnd(total)} / ${days} ngày)`;
    if (ratioKeepEl) ratioKeepEl.textContent = `98% (${fmtVnd(familyKeep)})`;

    const projects = Math.max(1, Math.round(days / 7));
    byId("committed-output").textContent = `Cam kết tối thiểu ${projects} sản phẩm Web`;

    const roiEl = byId("roi-payback-note");
    if (roiEl) {
      if (total <= BASIC_WEB_VALUE) {
        const multiple = (BASIC_WEB_VALUE / total).toFixed(1).replace(".0", "");
        roiEl.textContent = `Chỉ cần nhận 1 trang Web giới thiệu cơ bản (2.000.000 ₫) sau khi thành thạo là thu hồi gấp ${multiple} lần toàn bộ khoản đầu tư này.`;
      } else {
        roiEl.textContent = `Chỉ cần nhận 1 dự án Website cửa hàng / công ty (4.500.000 ₫) sau khi thành thạo là vượt xa toàn bộ khoản đầu tư ${days} ngày này.`;
      }
    }

    let milestone = "";
    if (days <= 14) {
      milestone = `Sau ${days} ngày: nắm chắc kiến trúc dàn trang chuẩn mực và hoàn thiện ngay trang Web đầu tay báo cáo Mẹ.`;
    } else if (days <= 45) {
      milestone = `Sau ${days} ngày: nắm vững kiến trúc dàn trang, thuật toán tương tác và tự xây dựng 4–5 sản phẩm Web thực tế chạy mượt trên điện thoại và máy tính.`;
    } else if (days <= 105) {
      milestone = `Sau ${days} ngày: phối hợp thành thạo ChatGPT, Claude, Antigravity để dựng Website nhiều tệp và sở hữu bộ hồ sơ dự án đủ chuẩn đi nhận việc.`;
    } else {
      milestone = `Sau ${days} ngày: đủ năng lực thiết kế Website thương mại trọn gói — hướng tới tự tạo thu nhập và hoàn lại khoản đầu tư 10.000 ₫/ngày.`;
    }
    byId("milestone-summary").textContent = adapt(milestone);

    all("[data-days]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(Number(btn.dataset.days) === days));
    });
  }

  all("[data-plan]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.plan);
      const plan = PLANS[idx];
      if (!plan) return;
      selectedPlanIdx = idx;
      all("[data-plan]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      byId("hero-price").textContent = plan.heroPrice;
      byId("hero-price-sub").textContent = adapt(plan.heroSub);
      byId("plan-reason").textContent = adapt(plan.reason);
      updateWorksheet(plan.days);
    });
  });

  all("[data-days]").forEach((btn) => {
    btn.addEventListener("click", () => updateWorksheet(Number(btn.dataset.days)));
  });

  daysInput.addEventListener("input", () => updateWorksheet(daysInput.value));
  updateWorksheet(30);

  /* ========================================================================
     6. HOVER-REVEAL / CLICK-PIN QUESTIONS (#giaidap)
     ======================================================================== */
  (() => {
    const qGroup = document.querySelector(".questions");
    if (!qGroup || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const detailsList = [...qGroup.querySelectorAll("details")];
    detailsList.forEach((d) => {
      let closeTimer;
      d.addEventListener("mouseenter", () => {
        clearTimeout(closeTimer);
        detailsList.forEach((other) => {
          if (other !== d && other.dataset.hoverOpen) {
            other.open = false;
            delete other.dataset.hoverOpen;
          }
        });
        if (!d.open) {
          d.open = true;
          d.dataset.hoverOpen = "1";
        }
      });
      d.addEventListener("mouseleave", () => {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
          if (d.dataset.hoverOpen && !d.matches(":hover")) {
            d.open = false;
            delete d.dataset.hoverOpen;
          }
        }, 220);
      });
      d.querySelector("summary").addEventListener("click", (e) => {
        if (d.dataset.hoverOpen) {
          e.preventDefault();
          delete d.dataset.hoverOpen;
        }
      });
    });
  })();

  /* ========================================================================
     7. CLOSING INVESTMENT DECISION CONSOLE (#quyetdinh) & STEALTH TOGGLE
     ======================================================================== */
  const resultBox = byId("decision-result");
  const discussionBox = byId("discussion");
  const discussBtn = byId("discuss-btn");
  let lastDecisionBase = "";

  function setDecisionMessage(baseMsg) {
    lastDecisionBase = baseMsg;
    resultBox.textContent = adapt(baseMsg);
  }

  byId("agree-standard").addEventListener("click", () => {
    discussionBox.hidden = true;
    discussBtn.setAttribute("aria-expanded", "false");
    setDecisionMessage(
      "Con cảm ơn Mẹ đã tin tưởng duyệt khoản đầu tư 10.000 ₫/ngày cho tương lai nghề Web của con. Ngay tuần này, con sẽ giữ kỷ luật tắt máy đúng 23:00, học chắc trên lớp và hoàn thiện sản phẩm Web đầu tiên để Chủ Nhật mở báo cáo Mẹ."
    );
    window.OpticalFilament?.pulseDecision();
  });

  byId("agree-trial").addEventListener("click", () => {
    discussionBox.hidden = true;
    discussBtn.setAttribute("aria-expanded", "false");
    setDecisionMessage(
      "Con cảm ơn Mẹ đã duyệt gói thử nghiệm 7 ngày đầu tiên (70.000 ₫). Con xin nhận cam kết hoàn thành một trang Web hoàn chỉnh vào Chủ Nhật tới để Mẹ trực tiếp kiểm chứng hiệu quả đầu tư."
    );
    window.OpticalFilament?.pulseDecision();
  });

  discussBtn.addEventListener("click", () => {
    const opening = discussionBox.hidden;
    discussionBox.hidden = !opening;
    discussBtn.setAttribute("aria-expanded", String(opening));
    setDecisionMessage(
      opening
        ? "Con sẵn sàng giải trình chi tiết thêm bất kỳ điều kiện nào Mẹ muốn thống nhất trước khi bắt đầu."
        : ""
    );
  });

  all("[data-topic]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextState = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", String(nextState));
      const chosen = all('[data-topic][aria-pressed="true"]').map((b) => b.dataset.topic);
      setDecisionMessage(
        chosen.length
          ? `Con xin ghi nhận và sẽ trình bày cụ thể hơn cùng Mẹ về ${chosen.join(", ")} trước khi bắt đầu.`
          : "Kính mời Mẹ chọn nội dung cần con làm rõ thêm."
      );
    });
  });

  function applyRecipientMode() {
    document.documentElement.dataset.recipient = recipient;
    document.title = adapt(baseTitle);

    for (const item of trackedNodes) {
      item.node.nodeValue = adapt(item.base);
    }
    for (const [el, baseVal] of baseAria.entries()) {
      el.setAttribute("aria-label", adapt(baseVal));
    }

    const activeStudyBtn = studyTabs.find((b) => b.getAttribute("aria-selected") === "true") || studyTabs[0];
    if (activeStudyBtn) selectStudy(activeStudyBtn);

    const ch = CHAPTERS[activeChapter];
    if (ch) {
      byId("stage-feature-label").textContent = adapt(ch.label);
      byId("part-title").textContent = adapt(ch.title);
      byId("part-description").textContent = adapt(ch.desc);
      byId("showcase-insight").textContent = adapt(ch.insight);
    }

    const plan = PLANS[selectedPlanIdx];
    if (plan) {
      byId("hero-price-sub").textContent = adapt(plan.heroSub);
      byId("plan-reason").textContent = adapt(plan.reason);
    }

    renderWorkbench();
    updateWorksheet(daysInput.value);

    if (lastDecisionBase) {
      resultBox.textContent = adapt(lastDecisionBase);
    }
  }

  function toggleRecipientMode() {
    recipient = recipient === "me" ? "bo" : "me";
    try {
      localStorage.setItem("proposal_recipient", recipient);
    } catch {}
    applyRecipientMode();
  }

  byId("stealth-role-switch")?.addEventListener("click", toggleRecipientMode);
  window.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "p" || e.key === "P")) {
      e.preventDefault();
      toggleRecipientMode();
    }
  });

  if (recipient === "bo") {
    applyRecipientMode();
  }
})();
