// check if element has been clicked or enter/space pressed on focus
function setClickListener(el, listener) {
    el.addEventListener("keydown", function (e) {
        if (e.code === "Enter" || e.code === "Space") {
            e.preventDefault();
            listener(e);
        }
    });
    el.addEventListener("click", listener);
}

// check if element has been hovered or focused
function setHoverListener(el, listener) {
    el.addEventListener("mouseenter", listener);
    el.addEventListener("focus", listener);
}

// check if element has lost focus or hover
function setUnhoverListener(el, listener) {
    el.addEventListener("mouseleave", listener);
    el.addEventListener("blur", listener);
    document.addEventListener("keyup", (e) => {
        if (e.code === "Escape" && (el == document.activeElement || el.matches(":hover"))) {
            listener(e);
        }
    });
}