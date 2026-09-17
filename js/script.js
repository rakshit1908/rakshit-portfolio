/* =========================================================
   RAKSHIT CHATURVEDI PORTFOLIO
   COMPLETE JAVASCRIPT
   ---------------------------------------------------------
   Features:
   1. Mobile navbar
   2. Typing animation
   3. Sticky navbar
   4. Active nav on scroll
   5. Scroll reveal animations
   6. Animated skill bars
   7. Project filtering
   8. Dark / Light mode
   9. Back-to-top button
   10. Custom cursor
   11. Magnetic buttons
   12. Contact form mailto
========================================================= */

"use strict";


/* =========================================================
   1. SELECT ELEMENTS
========================================================= */

const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menu-btn");
const themeBtn = document.getElementById("theme-btn");

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

const skillBars =
    document.querySelectorAll(".skill-progress span");

const backTop =
    document.getElementById("back-top");


/* =========================================================
   2. MOBILE MENU
========================================================= */

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close menu after clicking any link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================================
   3. TYPING ANIMATION
========================================================= */

const typing = document.getElementById("typing");

const typingWords = [
    "Full Stack Developer",
    "MERN Developer",
    "Web Developer",
    "React Developer"
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typingAnimation() {

    const currentWord =
        typingWords[wordIndex];

    if (!isDeleting) {

        typing.textContent =
            currentWord.substring(
                0,
                letterIndex + 1
            );

        letterIndex++;

        if (letterIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(
                typingAnimation,
                1500
            );

            return;
        }

    } else {

        typing.textContent =
            currentWord.substring(
                0,
                letterIndex - 1
            );

        letterIndex--;

        if (letterIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typingAnimation,
        isDeleting ? 55 : 100
    );

}

typingAnimation();


/* =========================================================
   4. HEADER + ACTIVE NAV + BACK TO TOP
========================================================= */

function handleScroll() {

    /* Sticky header */

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }


    /* Back to top */

    if (window.scrollY > 600) {
        backTop.classList.add("show");
    } else {
        backTop.classList.remove("show");
    }


    /* Active navigation */

    let currentId = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentId =
                section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href").substring(1);

        if (target === currentId) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

handleScroll();


/* =========================================================
   5. SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   6. ANIMATED SKILL BARS
========================================================= */

const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const bar =
                        entry.target;

                    const width =
                        bar.getAttribute(
                            "data-width"
                        );

                    setTimeout(() => {

                        bar.style.width = width;

                    }, 150);

                    skillObserver.unobserve(
                        bar
                    );

                }

            });

        },
        {
            threshold: 0.5
        }
    );


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =========================================================
   7. PROJECT FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active state */
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        /* Add active state */
        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        projectCards.forEach(card => {

            const category =
                card.getAttribute(
                    "data-category"
                );

            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove(
                    "filtered-out"
                );

                card.style.animation =
                    "filterIn .45s ease both";

            } else {

                card.classList.add(
                    "filtered-out"
                );

            }

        });

    });

});


/* Add filter animation dynamically */

const filterStyle =
    document.createElement("style");

filterStyle.textContent = `
@keyframes filterIn {
    from {
        opacity: 0;
        transform: translateY(1.5rem) scale(0.97);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
`;

document.head.appendChild(filterStyle);


/* =========================================================
   8. DARK / LIGHT THEME
========================================================= */

const savedTheme =
    localStorage.getItem("rakshit-theme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light-theme"
    );

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle(
        "light-theme"
    );

    const isLight =
        document.body.classList.contains(
            "light-theme"
        );

    localStorage.setItem(
        "rakshit-theme",
        isLight ? "light" : "dark"
    );


    if (isLight) {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


/* =========================================================
   9. CUSTOM CURSOR
========================================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");


if (
    cursorDot &&
    cursorRing &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * 0.15;

        ringY +=
            (mouseY - ringY) * 0.15;

        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    /* Hover effect */

    const cursorTargets =
        document.querySelectorAll(
            "a, button, .skill-card, .service-card, .project-card"
        );


    cursorTargets.forEach(target => {

        target.addEventListener(
            "mouseenter",
            () => {
                cursorRing.classList.add(
                    "hover"
                );
            }
        );

        target.addEventListener(
            "mouseleave",
            () => {
                cursorRing.classList.remove(
                    "hover"
                );
            }
        );

    });

}


/* =========================================================
   10. MAGNETIC BUTTON EFFECT
========================================================= */

const magneticElements =
    document.querySelectorAll(".magnetic");


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    magneticElements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * 0.10}px, ${y * 0.10}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "translate(0, 0)";

            }
        );

    });

}


/* =========================================================
   11. CONTACT FORM
   ---------------------------------------------------------
   No backend required.
   It opens the visitor's email application.

   Change RECEIVER_EMAIL if your email changes.
========================================================= */

const contactForm =
    document.getElementById(
        "contact-form"
    );

const formNote =
    document.getElementById(
        "form-note"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            /* =========================================================
               GET FORM VALUES
            ========================================================= */

            const name =
                document.getElementById(
                    "name"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const subject =
                document.getElementById(
                    "subject"
                ).value.trim();

            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            /* =========================================================
               VALIDATION
            ========================================================= */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                formNote.textContent =
                    "Please fill all fields.";

                return;

            }


            /* =========================================================
               SHOW SENDING MESSAGE
            ========================================================= */

            formNote.textContent =
                "Sending your message...";


            /* =========================================================
               SEND DATA TO VERCEL API
            ========================================================= */

            try {

                const response =
                    await fetch(
                        "/api/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                name: name,
                                email: email,
                                subject: subject,
                                message: message
                            })
                        }
                    );


                const data =
                    await response.json();


                /* =====================================================
                   SUCCESS
                ===================================================== */

                if (
                    response.ok &&
                    data.success
                ) {

                    formNote.textContent =
                        "Message sent successfully!";

                    contactForm.reset();

                }


                /* =====================================================
                   SERVER ERROR
                ===================================================== */

                else {

                    formNote.textContent =
                        data.message ||
                        "Failed to send message.";

                }


            }


            /* =========================================================
               NETWORK ERROR
            ========================================================= */

            catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );

                formNote.textContent =
                    "Something went wrong. Please try again.";

            }

        }
    );

}

/* =========================================================
   12. CURRENT YEAR
========================================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


/* =========================================================
   13. SMOOTH NAVIGATION
   This keeps normal browser behaviour but closes mobile menu.
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute(
                    "href"
                );

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   14. PROJECT CARD TILT
========================================================= */

const tiltCards =
    document.querySelectorAll(
        ".project-card"
    );


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -4;

                const rotateY =
                    ((x / rect.width) - 0.5) * 4;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   15. INITIAL REVEAL
========================================================= */

window.addEventListener(
    "load",
    () => {

        document
            .querySelectorAll(
                ".home-content, .home-image"
            )
            .forEach(element => {

                setTimeout(() => {

                    element.classList.add(
                        "show"
                    );

                }, 150);

            });

    }
);
