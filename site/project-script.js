/* ================================================================
   PROJECT-SCRIPT.JS
   Shared JavaScript for all project case study pages.
   - Nav scroll state
   - Mobile menu toggle (a11y)
   - Scroll reveal via IntersectionObserver
================================================================ */

/* Hero and stagger delays run during parse, before the first paint.
   The script tag is at the end of body, so these elements already exist.
   Waiting for DOMContentLoaded lets pageIn start at 0s and ignore a later delay. */
document.querySelectorAll(".page-animate").forEach((el, i) => {
  el.style.animationDelay = `${0.05 + i * 0.1}s`;
});

document.querySelectorAll(".reveal-stagger").forEach((group) => {
  [...group.children].forEach((child, i) => {
    child.style.transitionDelay = `${0.05 + i * 0.07}s`;
  });
});

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

  /* 3. Scroll-triggered reveal via IntersectionObserver.
     A nested stagger that is already on screen waits until its parent
     .reveal is visible, so the stagger does not finish while the parent
     is still opacity:0. Staggers still below the fold keep their own
     observer and run when they enter. */
  const pendingStaggers = new WeakSet();

  function enclosingReveal(el) {
    const parent = el.parentElement;
    return parent ? parent.closest(".reveal") : null;
  }

  function showReveal(el) {
    el.classList.add("visible");
    pendingStaggers.delete(el);
    revealObs.unobserve(el);
  }

  const revealObs = new IntersectionObserver(
    (entries) => {
      const leaving = entries.filter((entry) => !entry.isIntersecting);
      const entering = entries.filter((entry) => entry.isIntersecting);

      leaving.forEach((entry) => pendingStaggers.delete(entry.target));

      entering.forEach((entry) => {
        const el = entry.target;
        if (!el.classList.contains("reveal")) return;
        showReveal(el);
        el.querySelectorAll(".reveal-stagger").forEach((stagger) => {
          if (pendingStaggers.has(stagger)) showReveal(stagger);
        });
      });

      entering.forEach((entry) => {
        const el = entry.target;
        if (!el.classList.contains("reveal-stagger")) return;
        if (el.classList.contains("visible")) return;
        const parent = enclosingReveal(el);
        if (parent && !parent.classList.contains("visible")) {
          pendingStaggers.add(el);
          return;
        }
        showReveal(el);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
    revealObs.observe(el);
  });
});
