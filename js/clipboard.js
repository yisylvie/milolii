let copy = document.querySelectorAll(".copy");

// if we can copy to the clipboard
if (navigator.clipboard && window.isSecureContext) {
    const directions = ["bottom", "right", "top", "left"];

    let observer = new IntersectionObserver(function (entries) {
        // no intersection with screen
        // console.log(entries[0].intersectionRatio);
        // console.log(entries[0].target.classList);
        if (entries[0].intersectionRatio === 1) {
            entries[0].target.classList.remove("hidden");
            entries[0].target.classList.add("pop");
            return;
        } else {
            // partially intersects with screen
            // cycle through positions for tooltip until one fits on the screen
            let pos = entries[0].target.classList;
            for (let i = 0; i < directions.length; i++) {
                if (pos.contains(directions[i])) {
                    pos.remove(directions[i]);
                    pos.add(directions[(i + 1) % directions.length]);
                    observer.unobserve(entries[0].target);
                    observer.observe(entries[0].target);
                    return;
                }
            }
        }
    }, { threshold: [0, 1], });

    // create tooltip popup
    // copy item to clipboard when clicked
    for (const item of copy) {
        let tooltip = item.querySelector(".tooltip");
        let tooltipInner = tooltip.firstElementChild;
        let tooltipInnerText = tooltipInner.innerHTML;

        tooltip.addEventListener("animationend", function (e) {
            if (tooltip.classList.contains("fade")) {
                observer.unobserve(tooltip);
                tooltip.classList.remove(...directions);
                tooltip.classList.add("bottom");
                tooltip.classList.remove("fade");
                tooltip.classList.add("hidden");
                tooltipInner.innerHTML = tooltipInnerText;
            }
            if (tooltip.classList.contains("pop")) {
                tooltip.classList.remove("pop")
            }
        });

        setHoverListener(item, () => {
            // behavior for when user hovers and focuses simultaneously
            if (!tooltip.classList.contains("hidden")) {
                return;
            }

            // behavior for when user spam hovers
            if (tooltip.getAnimations().length > 0) {
                observer.unobserve(tooltip);
                tooltip.classList.remove("fade");
                tooltip.classList.remove("pop");
                tooltip.classList.add("hidden");
            }
            observer.observe(tooltip);
        });

        setUnhoverListener(item, () => {
            // behavior for when user unhovers and unfocuses simultaneously
            if (tooltip.classList.contains("hidden")) {
                return;
            }

            tooltip.classList.add("fade");
        });

        setClickListener(item, () => {
            try {
                const content = item.innerText;
                navigator.clipboard.writeText(content);
                tooltip.firstElementChild.innerText = "Copied!";
                if (tooltip.classList.contains("hidden")) {
                    observer.observe(tooltip);
                }
            } catch (e) {
                console.log(e);
            }
        });
    }
} else {
    for (const item of copy) {
        item.classList.add("no-clipboard");
    }
}