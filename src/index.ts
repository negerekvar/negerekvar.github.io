const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));
const viewer = document.getElementById("viewer") as HTMLElement | null;
const frame = viewer?.querySelector("iframe") as HTMLIFrameElement | null;
const closeBtn = viewer?.querySelector(".viewer__close") as HTMLButtonElement | null;
const VERSION_TAG = "v=20251218";

const codeModal = document.getElementById("code-modal") as HTMLElement | null;
const codeModalDesc = document.getElementById("code-modal-desc") as HTMLElement | null;
const codeModalCode = document.getElementById("code-modal-code") as HTMLElement | null;
const codeModalLink = document.getElementById("code-modal-link") as HTMLAnchorElement | null;
const codeCloseTargets = Array.from(document.querySelectorAll("[data-close-code]")) as HTMLElement[];

const explanations: Record<string, string> = {
  PerlinGrid: "Perlin gürültüsünü kare ızgaraya boyar; hız/zoom/hücre boyutunu kaydırıcılardan değiştir."
};

const palette = [
  "var(--charcoal-blue)",
  "var(--pine-blue)",
  "var(--verdigris)",
  "var(--tuscan-sun)",
  "var(--sunlit-clay)",
  "var(--sandy-brown)",
  "var(--sandy-brown-2)",
  "var(--burnt-peach)",
  "var(--burnt-peach-2)",
  "var(--burnt-peach-3)"
];

const parseRgb = (value: string): { r: number; g: number; b: number } | null => {
  const m = value.match(/rgba?\\(([^)]+)\\)/);
  if (!m) return null;
  const [r, g, b] = m[1].split(",").slice(0, 3).map((n) => parseFloat(n.trim()));
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return { r, g, b };
};

const getComputedRgb = (value: string): { r: number; g: number; b: number } | null => {
  const el = document.createElement("div");
  el.style.color = value;
  document.body.appendChild(el);
  const rgb = parseRgb(getComputedStyle(el).color);
  document.body.removeChild(el);
  return rgb;
};

const addCodeButtons = (): void => {
  cards.forEach((card) => {
    if (card.querySelector(".card__code-btn")) return;
    const btn = document.createElement("button");
    btn.className = "card__code-btn";
    btn.type = "button";
    btn.title = "Kodu göster";
    btn.setAttribute("aria-label", "Kodu göster");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = card.id;
      if (id) openCodeModal(id);
    });
    card.appendChild(btn);
  });
};

const applyInitials = (): void => {
  cards.forEach((card) => {
    if (card.dataset.initialized === "true") return;
    card.dataset.initialized = "true";
  });
};

const fetchCode = async (id: string): Promise<string> => {
  const res = await fetch(`/src/jss/${encodeURIComponent(id)}.ts`);
  if (!res.ok) throw new Error("Kod yüklenemedi");
  return res.text();
};

const openCodeModal = (id: string): void => {
  if (!codeModal || !codeModalDesc || !codeModalCode || !codeModalLink) return;
  codeModal.classList.remove("hidden");
  document.body.classList.add("no-scroll");
  codeModalDesc.textContent = explanations[id] ?? `${id} demosunun kaynağı.`;
  codeModalCode.textContent = "Yükleniyor...";
  codeModalLink.href = `https://github.com/negerekvar/negerekvar.github.io/blob/master/src/jss/${encodeURIComponent(id)}.ts`;

  fetchCode(id)
    .then((code) => {
      codeModalCode.textContent = code;
    })
    .catch(() => {
      codeModalCode.textContent = "Kod yüklenemedi.";
    });
};

const closeCodeModal = (): void => {
  if (!codeModal) return;
  codeModal.classList.add("hidden");
  document.body.classList.remove("no-scroll");
};

const openDemo = (id: string): void => {
  if (!viewer || !frame) return;
  frame.src = `./demos/${encodeURIComponent(id)}.html?${VERSION_TAG}`;
  viewer.classList.remove("hidden");
  document.body.classList.add("no-scroll");
};

const closeDemo = (): void => {
  if (!viewer || !frame) return;
  viewer.classList.add("hidden");
  document.body.classList.remove("no-scroll");
  frame.src = "about:blank";
};

const initNavigation = (): void => {
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.id;
      if (id) openDemo(id);
    });
  });
  closeBtn?.addEventListener("click", closeDemo);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!codeModal?.classList.contains("hidden")) {
        closeCodeModal();
      } else {
        closeDemo();
      }
    }
  });
  codeCloseTargets.forEach((el) => el.addEventListener("click", closeCodeModal));
};

document.addEventListener("DOMContentLoaded", initNavigation);
document.addEventListener("DOMContentLoaded", applyInitials);
document.addEventListener("DOMContentLoaded", addCodeButtons);
