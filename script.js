/* =========================================================
   BKNVEX V2
   Main Website Controller
   ========================================================= */


/* =========================================================
   MATRIX / CYBER RAIN
   ========================================================= */

const canvas = document.getElementById("rainCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;

    let columns = 0;
    let drops = [];

    const fontSize = 15;

    const characters =
        "БкнптBKNVEXbknvex01<>[]{}#/$%";


    function resizeCanvas() {

        width = window.innerWidth;
        height = window.innerHeight;

        const pixelRatio =
            Math.min(window.devicePixelRatio || 1, 2);

        canvas.width =
            width * pixelRatio;

        canvas.height =
            height * pixelRatio;

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";

        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

        columns =
            Math.ceil(width / fontSize);

        drops = [];

        for (let i = 0; i < columns; i++) {

            drops[i] =
                Math.random() *
                (height / fontSize);

        }

    }


    function drawRain() {

        /*
         * Fade the previous frame instead of
         * completely clearing the canvas.
         */

        ctx.fillStyle =
            "rgba(3, 3, 3, 0.12)";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        ctx.font =
            fontSize +
            "px monospace";


        for (
            let i = 0;
            i < drops.length;
            i++
        ) {

            const character =
                characters[
                    Math.floor(
                        Math.random() *
                        characters.length
                    )
                ];


            const x =
                i * fontSize;


            const y =
                drops[i] * fontSize;


            /*
             * Most characters stay dark.
             * Occasionally one becomes brighter.
             */

            if (Math.random() > 0.94) {

                ctx.fillStyle =
                    "rgba(255, 0, 0, 0.75)";

            } else {

                ctx.fillStyle =
                    "rgba(130, 0, 0, 0.35)";

            }


            ctx.fillText(
                character,
                x,
                y
            );


            /*
             * Restart a falling column after
             * it leaves the screen.
             */

            if (
                y > height &&
                Math.random() > 0.975
            ) {

                drops[i] = 0;

            }


            drops[i] +=
                0.35 +
                Math.random() * 0.55;

        }

    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /*
     * Animation loop.
     */

    let lastFrame = 0;

    function animateRain(timestamp) {

        /*
         * Limit the animation to roughly
         * 30 FPS for lower CPU usage.
         */

        if (
            timestamp - lastFrame >= 33
        ) {

            drawRain();

            lastFrame = timestamp;

        }


        requestAnimationFrame(
            animateRain
        );

    }


    requestAnimationFrame(
        animateRain
    );

}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


if (
    menuButton &&
    navLinks
) {

    menuButton.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "open"
            );

        }
    );


    /*
     * Close the mobile menu after
     * clicking a navigation link.
     */

    const links =
        navLinks.querySelectorAll("a");


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "open"
                    );

                }
            );

        }
    );

}


/* =========================================================
   NAVIGATION SCROLL EFFECT
   ========================================================= */

const navbar =
    document.querySelector(".navbar");


if (navbar) {

    function updateNavbar() {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(3, 3, 3, 0.94)";

            navbar.style.borderBottom =
                "1px solid rgba(255,255,255,0.05)";

        } else {

            navbar.style.background =
                "linear-gradient(to bottom, rgba(3,3,3,0.96), rgba(3,3,3,0))";

            navbar.style.borderBottom =
                "1px solid transparent";

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();

}


/* =========================================================
   REVEAL ELEMENTS WHEN SCROLLING
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".tool-card, .project-card, .about-large, .about-terminal"
    );


if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   TOOL CARD HOVER EFFECT
   ========================================================= */

const toolCards =
    document.querySelectorAll(
        ".tool-card"
    );


toolCards.forEach(
    function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -2;


                const rotateY =
                    ((x / rect.width) - 0.5) *
                    2;


                card.style.transform =
                    "translateY(-7px) " +
                    "perspective(700px) " +
                    "rotateX(" +
                    rotateX +
                    "deg) " +
                    "rotateY(" +
                    rotateY +
                    "deg)";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   HERO STATUS
   ========================================================= */

const statusText =
    document.querySelector(
        ".status-line"
    );


if (statusText) {

    /*
     * Small startup effect.
     */

    statusText.style.opacity = "0";

    setTimeout(
        function () {

            statusText.style.transition =
                "opacity 0.6s ease";

            statusText.style.opacity =
                "1";

        },
        300
    );

}


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cБкнпт // BKNVEX",
    "color:#ff0000;font-size:20px;font-weight:bold;"
);

console.log(
    "%cSYSTEM ONLINE",
    "color:#888;font-size:11px;"
);

console.log(
    "%cCyber Security & Development",
    "color:#666;font-size:11px;"
);