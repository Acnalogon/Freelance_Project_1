function insertNavbar() {
  const navbarTemplate = `
    <nav class="navbar navbar-expand-lg navbar-light custom-navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Şenay Aksoy</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Startseite</a></li>
            <li class="nav-item"><a class="nav-link" href="about.html">Über mich</a></li>
            <li class="nav-item"><a class="nav-link" href="services.html">Leistungen</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Kontakt</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;
  document.getElementById("custom-navbar").innerHTML = navbarTemplate;
}

/* function insertFooter() {
  const footerTemplate = `<footer class="bg-light text-center py-4">
          <p>&copy; 2024 Psychologische Praxis Wien</p>
          <p>
            <a
              href="mailto:info@praxis-wien.at"
              class="text-dark text-decoration-none"
            >
              info@praxis-wien.at
            </a>
            |
            <a href="tel:+431234567890" class="text-dark text-decoration-none">
              +43 123 456 7890
            </a>
          </p>
          <p>Öffnungszeiten:</p>
          <p>Mo - Fr: 9:00 - 17:00 Uhr</p>
          <p>Sa: 10:00 - 14:00 Uhr</p>
        </footer>`;
  document.getElementById("custom-footer").innerHTML = footerTemplate;
}
 */
function initializeScripts() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const timeInput = document.getElementById("time");
      if (timeInput) {
        const time = timeInput.value;
        const [hour] = time.split(":").map(Number);
        if (hour < 9 || hour > 17) {
          alert("Bitte wählen Sie eine Uhrzeit zwischen 09:00 und 17:00 Uhr.");
          return;
        }
      }
      alert("Ihre Nachricht wurde gesendet!");
    });
  }
}

barba.init({
  transitions: [
    {
      name: "page-transition",
      once(data) {
        insertNavbar();
        initializeScripts();
      },
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          x: "-100%",
          duration: 0.5,
          ease: "power1.out",
        });
      },
      enter(data) {
        const nextContainer = data.next.container;
        const page = data.next.url.path;

        let header, contentSections;
        if (page.includes("about.html")) {
          header = nextContainer.querySelector("h1");
          contentSections = nextContainer.querySelectorAll("p");
          gsap.from(header, {
            opacity: 0,
            x: "-100%",
            duration: 0.7,
            ease: "power2.out",
          });
          gsap.from(contentSections, {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.6,
            ease: "power1.out",
          });
        } else if (page.includes("services.html")) {
          header = nextContainer.querySelector("h1");
          contentSections = nextContainer.querySelectorAll(".list-group-item");
          gsap.from(header, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "power2.out",
          });
          gsap.from(contentSections, {
            opacity: 0,
            x: -20,
            stagger: 0.15,
            duration: 0.6,
            ease: "power1.out",
          });
        } else if (page.includes("contact.html")) {
          header = nextContainer.querySelector("h1");
          contentSections = nextContainer.querySelectorAll(".mb-3, h2");
          gsap.from(header, {
            opacity: 0,
            x: "-100%",
            duration: 0.7,
            ease: "power2.out",
          });
          gsap.from(contentSections, {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.6,
            ease: "power1.out",
          });
        }

        const navbar = nextContainer.querySelector(".navbar");
        const footer = nextContainer.querySelector("footer");
        gsap.from(navbar, {
          opacity: 0,
          y: -50,
          duration: 0.6,
          ease: "power1.out",
        });
        gsap.from(footer, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: 0.4,
          ease: "power1.out",
        });
      },
    },
  ],
  views: [
    {
      namespace: "home",
      beforeEnter() {
        window.location.href = "index.html";
      },
    },
  ],
});

barba.hooks.after(() => {
  initializeScripts();
});

window.addEventListener("load", () => {
  insertNavbar();
  /* insertFooter(); */
  document.body.classList.add("loaded");
});
