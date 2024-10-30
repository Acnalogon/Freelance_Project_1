window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

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
      leave(data) {
        return new Promise((resolve) => {
          gsap.timeline({ onComplete: resolve }).to(data.current.container, {
            opacity: 0,
            x: "-100%",
            duration: 0.5,
            ease: "power1.out",
          });
        });
      },
      enter(data) {
        const page = data.next.url.path;
        const navbar = data.next.container.querySelector(".navbar");
        const footer = data.next.container.querySelector("footer");
        let header, contentSections;

        if (page.includes("index.html")) {
          header = data.next.container.querySelector(".hero");
          contentSections = data.next.container.querySelectorAll(
            ".service_index .col-md-4"
          );
          gsap.from(header, {
            opacity: 0,
            y: "-100%",
            duration: 0.8,
            ease: "power2.out",
          });
          gsap.from(contentSections, {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.6,
            ease: "power1.out",
          });
        } else if (page.includes("about.html")) {
          header = data.next.container.querySelector("h1");
          contentSections = data.next.container.querySelectorAll("p");
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
          header = data.next.container.querySelector("h1");
          contentSections =
            data.next.container.querySelectorAll(".list-group-item");
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
          header = data.next.container.querySelector("h1");
          contentSections = data.next.container.querySelectorAll(".mb-3, h2");
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

        // Navbar fade-in
        gsap.from(navbar, {
          opacity: 0,
          y: -50,
          duration: 0.6,
          ease: "power1.out",
        });
        // Footer fade-in from bottom
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
});

barba.hooks.after(() => {
  initializeScripts();
});
