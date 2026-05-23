let hamburgerButton = document.getElementById("hamburger-button");
let header = document.getElementById("header");
let dropdowns = document.getElementsByClassName("dropdown");
let footer = document.querySelector("#everything > footer");
let tabbableFoot = footer.querySelectorAll("[tabindex='0'], a");
const breakpoint2 = 700;
const breakpointh1 = 450;
let scrollPos = window.scrollY;
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

visualViewport.addEventListener("resize", function (e) {
    if (e.target.width > breakpoint2) {
        if (header.open) {
            scrollPos = window.scrollY;
            header.close();
        }
    }
});

// inner nav function on mobile
for (const dropdown of dropdowns) {
    dropdown.addEventListener("click", (e) => {
        if (window.matchMedia("(hover: none)").matches) {
            e.preventDefault();
        }
        if (window.matchMedia("(width <= " + breakpoint2 + "px), (height <= " + breakpointh1 + "px)").matches) {
            e.preventDefault();
            let liClass = dropdown.parentNode.classList;
            if (liClass.contains("open")) {
                liClass.remove("open");
            } else {
                liClass.add("open");
                document.activeElement.blur();
            }
        }
    });
}

hamburgerButton.addEventListener("click", function (e) {
    if (!header.open) {
        body.className = "opened";
        header.showModal();
        document.activeElement.blur();
        hamburgerButton.ariaExpanded = true;
    } else {
        scrollPos = window.scrollY;
        header.close();
    }
});

xOutMenu();

function xOutMenu() {
    // x out menu if clicking anywhere outside the menu
    header.addEventListener("click", function (e) {
        if (window.innerWidth <= breakpoint2 && header.open) {
            let outside = true;

            // check if clicking navbar
            for (const el of header.children) {
                if (el.contains(e.target)) {
                    outside = false;
                }
            }

            if (outside) {
                scrollPos = window.scrollY;
                header.close();
            }
        }
    });

    header.addEventListener("close", function (e) {
        document.activeElement.blur();
        body.classList.remove("opened");
        hamburgerButton.ariaExpanded = false;
        window.scrollTo(0, scrollPos);
        for (const dropdown of dropdowns) {
            let liClass = dropdown.parentNode.classList;
            liClass.remove("open");
        }
    });
}

// make sure sticky footer scrolls into view when tabbed to
tabbableFoot.forEach(el => {
    el.addEventListener("focus", (e) => {
        console.log("focused");
        window.scrollTo(0, document.body.scrollHeight);
    });
});