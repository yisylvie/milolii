let hamburgerButton = document.getElementById("hamburger-button");
let header = document.getElementById("header");
let dropdowns = document.getElementsByClassName("dropdown");
let footer = document.querySelector("#everything > footer");
let tabbableFoot = footer.querySelectorAll("[tabindex='0'], a");

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
    if (e.target.width > 700) {
        if (header.open) {
            header.close();
        }
    }
});

for (const dropdown of dropdowns) {
    dropdown.addEventListener("click", (e) => {
        e.preventDefault();
        let liClass = dropdown.parentNode.classList;
        if (liClass.contains("open")) {
            liClass.remove("open");
        } else {
            liClass.add("open");
            document.activeElement.blur();
        }
    });
}

hamburgerButton.addEventListener("click", function (e) {
    if (!header.open) {
        header.showModal();
        document.activeElement.blur();
        hamburgerButton.ariaExpanded = true;
    } else {
        header.close();
    }
});

xOutMenu();

function xOutMenu() {
    // x out menu if clicking anywhere outside the menu
    header.addEventListener("click", function (e) {
        if (header.open) {
            let outside = true;

            // check if clicking navbar
            for (const el of header.children) {
                if (el.contains(e.target)) {
                    outside = false;
                }
            }

            if (outside) {
                header.close();
            }
        }
    });

    header.addEventListener("close", function (e) {
        body.style.overflow = "unset";
        document.activeElement.blur();
        body.className = "closed";
        hamburgerButton.ariaExpanded = false;
    });
}

// make sure sticky footer scrolls into view when tabbed to
tabbableFoot.forEach(el => {
    el.addEventListener("focus", (e) => {
        console.log("focused");
        window.scrollTo(0, document.body.scrollHeight);
    });
});