function sticky() {
    const screenWidth = document.documentElement.scrollWidth;
    const SELECTOR = ".sticky-info";
    let stickyElement = document.querySelector(SELECTOR);

    if (stickyElement === null) {
        console.error(`Не найден селектор '${SELECTOR}'`);
        return;
    }

    function scrollHandler() {
        if (document.scrollingElement.scrollTop > 50) {
            stickyElement.style.backgroundColor = "#05255588";
        } else {
            stickyElement.style.backgroundColor = "#052555";
        }
    }

    const MIN_WINDOW_SIZE = 768;

    if (screenWidth > MIN_WINDOW_SIZE) {
        window.addEventListener("scroll", scrollHandler);
    }
}

sticky();