/* ================================================================
   PROJECT-SCRIPT.JS
   Shared JavaScript for all project case study pages.
   - Nav scroll state
   - Mobile menu toggle (a11y)
   - Scroll reveal via IntersectionObserver
================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* 1. Nav scroll state */
  const navbar = document.getElementById("projNav");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    });
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }

  /* 2. Mobile menu toggle */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    function setMenuOpen(open) {
      menuToggle.classList.toggle("open", open);
      mobileNav.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        const first = mobileNav.querySelector("a");
        if (first) first.focus();
      } else {
        menuToggle.focus();
      }
    }

    menuToggle.addEventListener("click", () => {
      setMenuOpen(!mobileNav.classList.contains("open"));
    });

    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) {
        setMenuOpen(false);
      }
    });
  }

  /* 3. Hero entrance stagger */
  document.querySelectorAll(".page-animate").forEach((el, i) => {
    el.style.animationDelay = `${0.05 + i * 0.1}s`;
  });

  /* 4. Stagger delays for reveal-stagger children */
  document.querySelectorAll(".reveal-stagger").forEach((group) => {
    [...group.children].forEach((child, i) => {
      child.style.transitionDelay = `${0.05 + i * 0.07}s`;
    });
  });

  /* 5. Scroll-triggered reveal via IntersectionObserver
     Nested .reveal-stagger is activated with its parent .reveal so the
     stagger does not finish while the parent is still opacity:0. */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        el.querySelectorAll(".reveal-stagger").forEach((stagger) => {
          stagger.classList.add("visible");
        });
        revealObs.unobserve(el);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));
  document.querySelectorAll(".reveal-stagger").forEach((el) => {
    if (!el.closest(".reveal")) revealObs.observe(el);
  });
});
