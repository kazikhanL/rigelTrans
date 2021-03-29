function slider() {
    function cloneIMG(el) {
        let img = document.createElement("img");
    
        img.setAttribute("class", el.getAttribute("class"));
        img.setAttribute("src", el.getAttribute("src"));
        img.setAttribute("alt", el.getAttribute("alt"));
        img.classList.remove("slider__slide--active");
    
        return img;
    }
    
    function createCloneElements() {
        const slides = [...document.querySelectorAll(".slider__slide")];
        const wrapper = document.querySelector(".slider__slides");
    
        let cloneFirstElement = cloneIMG(slides[0]);
        cloneFirstElement.setAttribute("id", "lastClone");
    
        let cloneLastELement = cloneIMG(slides[slides.length - 1]);
        cloneLastELement.setAttribute("id", "firstCLone");
    
        wrapper.prepend(cloneLastELement);
        wrapper.append(cloneFirstElement);
    }
    
    createCloneElements();
    
    function createDots() {
        let wrapper = document.querySelector(".slider__dots");
        const slides = [...document.querySelectorAll(".slider__slide")];
        let dots = [];
    
        for (let i = 0; i < slides.length; i++) {
            let dot = document.createElement("div");
            dot.setAttribute("class", "slider__dot");
            dots.push(dot);
        }
    
        dots[1].classList.add("slider__dot--active");
        dots[0].setAttribute("hidden", "")
        dots[dots.length - 1].setAttribute("hidden", "")
    
        wrapper.append(...dots);
    }
    
    createDots();
    
    function toggleSlide(slides, index) {
        slides[index].classList.toggle("slider__slide--active");
    }
    
    function toggleDot(dots, index) {
        dots[index].classList.toggle("slider__dot--active");
    }
     
    let wrapper = document.querySelector(".slider__slides");
    let slides = [...document.querySelectorAll(".slider__slide")];
    let dots = [...document.querySelectorAll(".slider__dot")];
    
    let prevBtn = document.querySelector(".slider__left-btn");
    let nextBtn = document.querySelector(".slider__right-btn");
    
    let counter = 1;
    
    let marginSize = window.getComputedStyle(slides[0], null).getPropertyValue("margin-right");
    marginSize = parseFloat(marginSize) * 2;

    let size = slides[0].clientWidth + marginSize;
    
    wrapper.style.transform = `translateX(${-size * counter}px)`;

    window.addEventListener("resize", () => {
        marginSize = window.getComputedStyle(slides[0], null).getPropertyValue("margin-right");
        marginSize = parseFloat(marginSize) * 2;
        size = slides[0].clientWidth + marginSize;
        wrapper.style.transform = `translateX(${-size * counter}px)`;
    });

    function nextSlide() {
        toggleSlide(slides, counter);
        toggleDot(dots, counter);
        
        wrapper.style.transition = "transform 0.4s ease-in-out";
        counter++;
        wrapper.style.transform = `translateX(${-size * counter}px)`;
    
        toggleSlide(slides, counter);
        toggleDot(dots, counter);
    }

    function prevSlide() {
        toggleSlide(slides, counter);
        toggleDot(dots, counter);
    
        wrapper.style.transition = "transform 0.4s ease-in-out";
        counter--;
        wrapper.style.transform = `translateX(${-size * counter}px)`;
    
        toggleSlide(slides, counter);
        toggleDot(dots, counter);
    }
    
    nextBtn.addEventListener("click", () => {
        if (counter >= slides.length - 1) return;
        nextSlide();
    });
    
    prevBtn.addEventListener("click", () => {
        if (counter <= 0) return;
        prevSlide();
    });
    
    wrapper.addEventListener("transitionend", () => {
        if (slides[counter].hasAttribute("id")) {
            if (slides[counter].id === "firstCLone") {
                wrapper.style.transition = "none";
                counter = slides.length - 2;
                wrapper.style.transform = `translateX(${-size * counter}px)`;
    
                toggleSlide(slides, counter);
                toggleDot(dots, counter);
            }
            else if (slides[counter].id === "lastClone") {
                wrapper.style.transition = "none";
                counter = slides.length - counter;
                wrapper.style.transform = `translateX(${-size * counter}px)`;
    
                toggleSlide(slides, counter);
                toggleDot(dots, counter);
            }
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            toggleSlide(slides, counter);
            toggleDot(dots, counter);
        
            wrapper.style.transition = "transform 0.4s ease-in-out";
            counter = index;
            wrapper.style.transform = `translateX(${-size * counter}px)`;
        
            toggleSlide(slides, counter);
            toggleDot(dots, counter);
        });
    });


    function swipe(touchStart, touchEnd) {
        const MINIMUM_SWIPE_LENGTH = 70;
        const swipeLength = touchStart - touchEnd;

        if (touchStart > touchEnd && swipeLength > MINIMUM_SWIPE_LENGTH) {
            nextSlide();
        }
        else if (touchStart < touchEnd && swipeLength < -MINIMUM_SWIPE_LENGTH) {
            prevSlide();
        }
    }

    function setTouchListener() {
        let slider = document.querySelector(".slider__wrapper");
        let touchStart = 0;
        let touchEnd = 0;
    
        slider.addEventListener("touchstart", (event) => {
            touchStart = event.changedTouches[0].pageX;
        });
    
        slider.addEventListener("touchend", (event) => {
            touchEnd = event.changedTouches[0].pageX;
            swipe(touchStart, touchEnd);
        });
    }

    setTouchListener();
}

window.onload = slider;
