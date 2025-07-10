const navLinks = document.querySelectorAll("nav a");
const navbar = document.getElementById("navbar");
const img = document.querySelector('.welcome-image');
const el = document.querySelector('.shine-text');
const HIDE_OFFSET = "-150px";
const SHOW_OFFSET = "0px";
const TOP_TRIGGER = 10;
const MARGIN = 10;
const collapsedH = '6rem';
const MOBILE_BREAKPOINT = 1279;
const DEST = "contact@bilyray.fr";

const isMobile = () =>
  window.matchMedia(`(max-width:${MOBILE_BREAKPOINT}px)`).matches;

let lastMouseY = window.innerHeight;

function handleScroll() {
  if (window.scrollY > 0) {
    navbar.style.top = SHOW_OFFSET;
  } else if (lastMouseY > TOP_TRIGGER) {
    navbar.style.top = HIDE_OFFSET;
  }
}

function handlePointer(e) {
  lastMouseY = e.clientY;
  let navLocked = true;

  if (lastMouseY <= TOP_TRIGGER) {
    navbar.style.top = SHOW_OFFSET;
    navLocked = true;
    return;
  }

  if (navLocked) {
    const r = navbar.getBoundingClientRect();
    const inside =
      e.clientX >= r.left - MARGIN &&
      e.clientX <= r.right + MARGIN &&
      e.clientY >= r.top - MARGIN &&
      e.clientY <= r.bottom + MARGIN;

    if (!inside) {
      navLocked = false;
      if (window.scrollY === 0) navbar.style.top = HIDE_OFFSET;
    }
  } else if (window.scrollY === 0) {
    navbar.style.top = HIDE_OFFSET;
  }
}

function addDesktopNavBehaviour() {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('pointermove', handlePointer);
}

function removeDesktopNavBehaviour() {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('pointermove', handlePointer);
}

function setupMobileDropdown() {
  const navbar = document.getElementById('navbar');
  const dropdownBtn = document.querySelector('.dropdown-button');
  const navLinks = navbar.querySelector('.nav-links');
  const collapsedH = '7rem';

  if (!dropdownBtn || !navLinks || !navbar) return;

  // Reset styles
  navbar.style.height = collapsedH;
  navLinks.style.display = 'none';
  navLinks.style.pointerEvents = 'none';

  // Remove any previous handlers to prevent duplicates
  dropdownBtn.replaceWith(dropdownBtn.cloneNode(true));
  const newDropdownBtn = document.querySelector('.dropdown-button');

  newDropdownBtn.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');

    if (isOpen) {
      navLinks.style.display = 'flex';
      navLinks.style.pointerEvents = 'auto';
      navbar.style.height = '20rem';
      newDropdownBtn.classList.add('rotated');
    } else {
      navbar.style.height = collapsedH;
      newDropdownBtn.classList.remove('rotated');
      navbar.addEventListener('transitionend', function hideLinks(e) {
        if (e.propertyName === 'height') {
          navLinks.style.display = 'none';
          navbar.removeEventListener('transitionend', hideLinks);
        }
      });
    }
  });
}

function openGmail(user) {
  const q = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: DEST,
    cc: user,
    su: "Contact depuis le site",
    body: `Bonjour,\n\n(Écrivez votre message ici…)\n\n— ${user}`
  });
  return window.open(`https://mail.google.com/mail/?${q}`, "_blank");
}

document.addEventListener('DOMContentLoaded', () => {
  // Flare effect on .shine-text
  const flare = () => {
    const r = el.getBoundingClientRect();
    const rand = n => Math.random() * n;
    el.style.setProperty('--x', `${rand(r.width)}px`);
    el.style.setProperty('--y', `${rand(r.height)}px`);
  };
  flare();
  setInterval(flare, 800);

  // Reveal elements
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Cursor pointer on dropdown button
  const dropdownBtn = document.querySelector('.dropdown-button');
  if (dropdownBtn) dropdownBtn.style.cursor = 'pointer';

  // Contact button logic
  document.getElementById("contact-button").addEventListener("click", () => {
    const user = document.getElementById("user-email").value.trim();
    if (!user) {
      alert("Veuillez saisir votre e‑mail");
      return;
    }

    const popup = openGmail(user);
    if (!popup) {
      const mailto =
        `mailto:${DEST}?cc=${encodeURIComponent(user)}&` +
        `subject=${encodeURIComponent("Contact depuis le site")}`;
      window.location.href = mailto;
    }
  });

  // Hover animation for nav links
  navLinks.forEach(link => {
    link.addEventListener("mousemove", e => {
      const rect = link.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      link.style.setProperty("--x", `${x}%`);
      link.style.setProperty("--y", `${y}%`);
    });
  });

  // Swiper for services section
  const servicesSwiperEl = document.querySelector('.services-swiper');
  if (servicesSwiperEl) {
    const servicesSwiper = new Swiper(servicesSwiperEl, {
      loop: true,
      grabCursor: true,
      spaceBetween: 24,
      slidesPerView: 1.2,
      centeredSlides: true,
      breakpoints: {
        320: { slidesPerView: 1 },
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 1.75 },
        1024: { slidesPerView: 2 },
      },
      pagination: {
        el: '.services-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.services-swiper .swiper-button-next',
        prevEl: '.services-swiper .swiper-button-prev',
      },
    });
  }

  // Initial behavior setup
  if (!isMobile()) {
    addDesktopNavBehaviour();
  } else {
    setupMobileDropdown();
  }
});

// Handle mobile <-> desktop switching
let wasMobile = isMobile();
window.addEventListener('resize', () => {
  location.reload();
  const mobileNow = isMobile();
  if (mobileNow && !wasMobile) {
    removeDesktopNavBehaviour();
    setupMobileDropdown();
  } else if (!mobileNow && wasMobile) {
    addDesktopNavBehaviour();
  }
  wasMobile = mobileNow;
});
