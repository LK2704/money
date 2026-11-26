/* Brief ~3.4s cinematic aperture signature on fresh open: two optical filaments converge,
   trace the geometric AI prism mark, then part open cleanly. Click/key/scroll skips. */
(() => {
  "use strict";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.documentElement;
  try {
    if (localStorage.getItem("proposal_recipient") === "bo") {
      root.dataset.recipient = "bo";
      document.title = document.title.replace(/Mẹ/g, "Bố");
    }
  } catch {}
  root.classList.add("has-intro");
  let closed = false;
  const finish = () => {
    if (closed) return;
    closed = true;
    root.classList.remove("has-intro");
    document.getElementById("aperture-intro")?.remove();
  };
  const timer = setTimeout(finish, 3650);
  const skip = () => {
    clearTimeout(timer);
    finish();
  };
  addEventListener("pointerdown", skip, { once: true, passive: true });
  addEventListener("keydown", skip, { once: true });
  addEventListener("wheel", skip, { once: true, passive: true });
})();
