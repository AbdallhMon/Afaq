document.addEventListener("DOMContentLoaded", async () => {
  // Toggle Drawer Menu
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".drawer .drawer-close");
  const logo = document.querySelector(".navbar .logo");
  const loaderWrapper = document.getElementById("loader-wrapper");
  const loaderLogo = document.querySelector(".loader-logo");
  const header = document.querySelector(".header-absolute");
  const container = document.querySelector(".container");
  const loadingIndicator = document.querySelector(".loading-indicator");

  function toggleMenu() {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      gsap.to(drawer, { right: "-100%", duration: 0.3, display: "none" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        right: "100%",
        display: "none",
      });
    } else {
      gsap.to(drawer, { right: "0%", duration: 0.3, display: "flex" });
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        right: "0%",
        display: "block",
      });
    }
    drawer.classList.toggle("open");
  }

  menuIcon.addEventListener("click", toggleMenu);
  closeIcon.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Loading Animation
  gsap.to(loaderWrapper, {
    y: "-100%",
    delay: 1,
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {
      loaderWrapper.style.display = "none";
    },
  });

  gsap.to(loadingIndicator, {
    delay: 0.5,
    duration: 1,
    opacity: 0,
    ease: "power4.inOut",
  });

  gsap.to(loaderLogo, {
    delay: 0.5,
    duration: 1,
    transform: "none",
    height: 50,
    top: 12,
    ease: "power4.inOut",
    left: (header.offsetWidth - container.offsetWidth) / 2 + 20,
    onComplete: () => {
      window.setTimeout(() => {
        document.body.style.overflow = "auto";
        loaderLogo.style.display = "none";
        logo.style.opacity = 1;
        animateHeroSection();
        animateAboutSection();
      }, 500);
    },
  });

  // Animate Hero Section after Loading
  function animateHeroSection() {
    gsap.to(".hero-content", {
      y: 0,
      opacity: 1,
      delay: 0.2,
      duration: 1,
      ease: "power4.out",
    });
  }
  function animateAboutSection() {
    const aboutTimeline = gsap.timeline();

    aboutTimeline
      .to(".about h2", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power4.out",
      })
      .fromTo(
        ".about-image-wrapper",
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "sine.in",
        }
      )
      .fromTo(
        document.querySelectorAll(".about-text-wrapper p")[0],
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "sine.out",
          stagger: 0.2,
        },
        "-=0.4"
      )
      .fromTo(
        document.querySelectorAll(".about-text-wrapper p")[1],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power4.out",
          stagger: 0.2,
        },
        "-=0.2"
      );
  }

  gsap.registerPlugin(ScrollTrigger);

  function animateProjectSection() {
    gsap.fromTo(
      ".project h2",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".project h2",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".project-image-wrapper",
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "cubic.in",
        scrollTrigger: {
          trigger: ".project-image-wrapper",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".project-text-wrapper p",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".project-text-wrapper p",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  }

  animateProjectSection();
});
