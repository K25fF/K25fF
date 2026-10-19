const popup = document.createElement("div");
popup.className = "footnote-popup";
popup.role="tooltip";
popup.hidden = true;
document.body.appendChild(popup);
let hideTimer;

let footnotes = document.querySelectorAll("a.footnote");
footnotes.forEach(link => {
    link.addEventListener("mouseenter", () => displayTooltip(link));
    link.addEventListener("focus", () => displayTooltip(link));
    link.addEventListener("mouseleave", () => hideTooltip());
    link.addEventListener("blur", () => hideTooltip());    
});

popup.addEventListener("mouseenter", () => clearTimeout(hideTimer));
popup.addEventListener("mouseleave", () => hideTooltip());

document.addEventListener("keydown", event => {if(event.key === "Escape") {popup.hidden = true}});

function findNote(link) {
    const linkHash = link.hash.slice(1);
    return document.getElementById(linkHash);
}

function displayTooltip(link) {
    clearTimeout(hideTimer);
    const note = findNote(link);
    popup.innerHTML = note.innerHTML;
    popup.querySelector(".reversefootnote").remove();
    popup.hidden = false;
    positionPopup(link);
}

function positionPopup(link) {
    const windowWide = window.innerWidth;
    const windowTall = window.innerHeight;

    const popupWide = popup.offsetWidth;
    const popupTall = popup.offsetHeight;
    
    const linkPosition = link.getBoundingClientRect();
    let popupTop = linkPosition.bottom + 5;
    const popupLeft = Math.max(8, Math.min(linkPosition.left, windowWide - popupWide - 8)) + window.scrollX;

    if (popupTop + popupTall > windowTall) {
        popupTop = linkPosition.top - 5 - popupTall + window.scrollY;
    } else {
        popupTop = popupTop + window.scrollY;
    }

    popup.style.top = popupTop + "px";
    popup.style.left = popupLeft + "px";
}

function hideTooltip() {
    hideTimer = setTimeout(() => popup.hidden = true, 200);
}