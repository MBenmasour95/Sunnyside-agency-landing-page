/* --- Gsap Plugin --- */
gsap.registerPlugin(ScrollTrigger);

/* --- DOM Elements --- */
const navItems = document.getElementById("nav-items");
const menuBtn = document.getElementById("menu-btn");

/* --- EventListeners --- */
document.addEventListener("DOMContentLoaded", init);
menuBtn.addEventListener("click", toggleNavItems);

/* --- Functions --- */
function toggleNavItems(e) {
  e.currentTarget.classList.toggle("active");
  navItems.classList.toggle("fadeIn");
}

function headerAnimation() {
  let tl = gsap.timeline({
    defaults: { opacity: 0, duration: 2, ease: Power3.easeOut },
  });

  tl.from(".nav-logo", { x: -40 }, "+=0.4")
    .from(
      ".nav-item:not(:last-child)",
      { y: -25, rotation: -10, stagger: 0.4 },
      "-=1.8"
    )
    .from(".contact-item", { x: 40 }, "-=1.5")
    .from(".hero-title", { y: 50 }, "-=1.3")
    .from(".arrow-btn", { y: -50 }, "-=1");
}

function featuresAnimation() {
  gsap.utils.toArray(".animated").forEach((feature) => {
    let x = 0;

    if (feature.classList.contains("moveRight")) {
      x = -100;
    } else if (feature.classList.contains("moveLeft")) {
      x = 100;
    }

    gsap
      .timeline({
        defaults: { opacity: 0, duration: 1 },
        scrollTrigger: {
          trigger: feature,
          start: "top+=100 bottom",
          end: "bottom-=100 top",
          toggleActions: "restart reverse restart reverse",
        },
      })
      .from(feature, { x: x });
  });
}

function testimonialsAnimation() {
  gsap.utils.toArray(".client").forEach((client) => {
    let y;

    if (client.classList.contains("moveBottom")) {
      y = -100;
    } else if (client.classList.contains("moveTop")) {
      y = 100;
    }

    gsap
      .timeline({
        defaults: { duration: 2, opacity: 0 },
        scrollTrigger: {
          trigger: client,
          start: "top+=150 bottom",
          end: "bottom-=150 top",
          toggleActions: "restart reverse restart reverse",
        },
      })
      .from(client, { y: y });
  });
}

function galleryAnimation() {
  gsap.utils.toArray(".gallery-img").forEach((img) => {
    let delay;

    if (img.classList.contains("first")) {
      delay = 0;
    } else if (img.classList.contains("second")) {
      delay = 0.5;
    } else if (img.classList.contains("last")) {
      delay = 1;
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: img,
          start: "top+=20 bottom",
          end: "bottom-=20 top",
          toggleActions: "restart reverse restart reverse",
        },
      })
      .from(img, {
        opacity: 0,
        scale: 0.5,
        duration: 2,
        delay: delay,
      });
  });
}

function init() {
  ScrollTrigger.saveStyles(
    ".nav-logo, .nav-item:not(:last-child), .contact-item, .hero-title, .arrow-btn, .animated, .client, .gallery-img"
  );

  ScrollTrigger.matchMedia({
    "(min-width: 820px)": () => {
      headerAnimation();
      featuresAnimation();
      testimonialsAnimation();
      galleryAnimation();
    },
  });
}
