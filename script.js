const navLinks = document.querySelectorAll("nav a");
const navbar = document.getElementById("navbar");
const img = document.querySelector('.welcome-image');
const el   = document.querySelector('.shine-text');
const HIDE_OFFSET = "-150px";
const SHOW_OFFSET = "0px";
const TOP_TRIGGER = 10;
const MARGIN = 10;
const dropdownBtn   = document.querySelector('.dropdown-button');
const collapsedH    = '6rem';
const transitionMs  = 300;   
const MOBILE_BREAKPOINT = 1279;
const DESTINATION = "contact@bilyandray.com";

navLinks.forEach(link => {
    link.addEventListener("mousemove", e => {
      const rect = link.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      link.style.setProperty("--x", `${x}%`);
      link.style.setProperty("--y", `${y}%`);
    });
  });

const isMobile = () =>
  window.matchMedia(`(max-width:${MOBILE_BREAKPOINT}px)`).matches
  function addDesktopNavBehaviour() {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('pointermove', handlePointer);
}

function removeDesktopNavBehaviour() {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('pointermove', handlePointer);
}

function handleScroll() {
  if (window.scrollY > 0) {
    navbar.style.top = SHOW_OFFSET;
  } else if (lastMouseY > TOP_TRIGGER) {
    navbar.style.top = HIDE_OFFSET;
  }
};

let lastMouseY = window.innerHeight;

function handlePointer (e) {
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
};
if (!isMobile()) addDesktopNavBehaviour();

let wasMobile = isMobile();
window.addEventListener('resize', () => {
  const mobileNow = isMobile();
  if (mobileNow && !wasMobile) {
    removeDesktopNavBehaviour();
  } else if (!mobileNow && wasMobile) {
    addDesktopNavBehaviour();
  }
  wasMobile = mobileNow;
});

  const flare = () => {
    const r = el.getBoundingClientRect();
    const rand = n => Math.random() * n;
    el.style.setProperty('--x', `${rand(r.width) }px`);
    el.style.setProperty('--y', `${rand(r.height)}px`);
  };
  flare();                         // seed once
  setInterval(flare, 800);


/* === Services carousel (Swiper) =========================== */
document.addEventListener('DOMContentLoaded', () => {
  // Make sure the section exists in the current page before initialising
  const servicesSwiperEl = document.querySelector('.services-swiper');
  if (!servicesSwiperEl) return;
  
  // Import Swiper styles
  const servicesSwiper = new Swiper(servicesSwiperEl, {
    loop: true,
    grabCursor: true,
    spaceBetween: 24,
    slidesPerView: 1.2,
    centeredSlides: true,
    breakpoints: {
      320:  { slidesPerView: 1   },
      640:  { slidesPerView: 1.5 },
      768:  { slidesPerView: 1.75   },
      1024: { slidesPerView: 2  },
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
});

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtn = document.querySelector('.dropdown-button');
  if (dropdownBtn) {
    dropdownBtn.style.cursor = 'pointer';
  }
});
document.addEventListener('DOMContentLoaded', () => {
  if (!isMobile()) return;
  const navbar        = document.getElementById('navbar');
  const dropdownBtn   = document.querySelector('.dropdown-button');
  const navLinks      = navbar.querySelector('.nav-links');
  const collapsedH    = '7rem';

  navbar.style.height      = collapsedH;
  navLinks.style.display   = 'none';
  navLinks.style.pointerEvents = 'none';

  dropdownBtn.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');

    if (isOpen) {
      navLinks.style.display = 'flex';
      navLinks.style.pointerEvents = 'auto';
      const fullH = "20rem";
      navbar.style.height = fullH;
      dropdownBtn.classList.add('rotated');
    } else {
      // collapse back to 6rem, hide links after transition ends
      navbar.style.height = collapsedH;
      dropdownBtn.classList.remove('rotated');

      navbar.addEventListener('transitionend', function hideLinks(e) {
        if (e.propertyName === 'height') {
          navLinks.style.display = 'none';
          navbar.removeEventListener('transitionend', hideLinks);
        }
      });
    }
  });
});


  document.getElementById("contact-button").addEventListener("click", () => {
  const userEmail = document.getElementById("user-email").value.trim();

  if (!userEmail) {
    alert("Veuillez saisir votre adresse e‑mail avant d’envoyer.");
    return;
  }

  const DESTINATION = "contact@votre-site.com";
  const subject = encodeURIComponent("Contact depuis le site web");
  const body = encodeURIComponent(
    "Bonjour,\n\n(Écrivez votre message ici…)\n\n— " + userEmail
  );
  const cc = encodeURIComponent(userEmail);

  // Open Gmail compose in new tab
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${DESTINATION}&su=${subject}&body=${body}&cc=${cc}`;
  window.open(gmailLink, "_blank");
});
