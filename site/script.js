/* 1. Nav scroll state */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* 2. Mobile menu toggle */
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

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

/* 3. Hero entrance stagger (avoids fragile :nth-child delays) */
document.querySelectorAll(".hero-animate").forEach((el, i) => {
  el.style.animationDelay = `${0.1 + i * 0.12}s`;
});

/* 4. Scroll-triggered reveal via IntersectionObserver */
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

/* 5. Active nav link via section IntersectionObserver */
const desktopNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a[href^="#"]');
const allNavLinks = [...desktopNavLinks, ...mobileNavLinks];
const sections = [...desktopNavLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNav(id) {
  allNavLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === id);
  });
}

if (sections.length) {
  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActiveNav(`#${entry.target.id}`);
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
  );
  sections.forEach((section) => sectionObs.observe(section));
}

/* 6. Copy email to clipboard */
document.getElementById("copyEmail").addEventListener("click", function () {
  const email = this.getAttribute("data-email");
  const handle = document.getElementById("emailHandle");
  const original = handle.textContent;
  navigator.clipboard.writeText(email).then(
    () => {
      handle.textContent = "Copied to clipboard";
      setTimeout(() => {
        handle.textContent = original;
      }, 2000);
    },
    () => {
      handle.textContent = "Copy failed — use mailto";
      setTimeout(() => {
        handle.textContent = original;
      }, 2000);
    },
  );
});
