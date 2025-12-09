const cards = Array.from(document.querySelectorAll(".card"));
const viewer = document.getElementById("viewer");
const frame = viewer === null || viewer === void 0 ? void 0 : viewer.querySelector("iframe");
const closeBtn = viewer === null || viewer === void 0 ? void 0 : viewer.querySelector(".viewer__close");
const VERSION_TAG = "v=20251210";
const openDemo = (id) => {
    if (!viewer || !frame)
        return;
    frame.src = `./demos/${encodeURIComponent(id)}.html?${VERSION_TAG}`;
    viewer.classList.remove("hidden");
    document.body.classList.add("no-scroll");
};
const closeDemo = () => {
    if (!viewer || !frame)
        return;
    viewer.classList.add("hidden");
    document.body.classList.remove("no-scroll");
    frame.src = "about:blank";
};
const initNavigation = () => {
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const id = card.id;
            if (id)
                openDemo(id);
        });
    });
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", closeDemo);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape")
            closeDemo();
    });
};
document.addEventListener("DOMContentLoaded", initNavigation);
