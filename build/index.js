const cards = Array.from(document.querySelectorAll(".card img"));
const handleCardClick = (img) => {
    const parent = img.parentElement;
    if (!parent || !parent.id)
        return;
    window.location.href = `./demos/${parent.id}.html`;
};
const initNavigation = () => {
    cards.forEach((img) => {
        img.addEventListener("click", () => handleCardClick(img));
    });
};
document.addEventListener("DOMContentLoaded", initNavigation);
