const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));
const viewer = document.getElementById("viewer") as HTMLElement | null;
const frame = viewer?.querySelector("iframe") as HTMLIFrameElement | null;
const closeBtn = viewer?.querySelector(".viewer__close") as HTMLButtonElement | null;
const VERSION_TAG = "v=20251214";

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
    if (e.key === "Escape") closeDemo();
  });
};

document.addEventListener("DOMContentLoaded", initNavigation);
