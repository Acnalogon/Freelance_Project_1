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

      // For now, just show a confirmation
      alert("Ihre Nachricht wurde gesendet!");
    });
  }

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Barba.js initialization for smooth page transitions
barba.init({
  transitions: [
    {
      name: "custom-transition",
      leave(data) {
        return new Promise((resolve) => {
          const tl = gsap.timeline({
            onComplete: resolve,
          });

          // Add animations to the timeline
          tl.to(data.current.container, {
            x: "-100%",
            duration: 0.5,
            ease: "power1.out",
          })
            .to(
              data.current.container.querySelector("header"),
              {
                y: "-100%",
                duration: 0.5,
                ease: "power1.out",
              },
              0
            ) // Runs simultaneously
            .to(
              data.current.container.querySelector(".service_index"),
              {
                x: "100%",
                duration: 0.5,
                ease: "power1.out",
              },
              0
            ) // Runs simultaneously
            .to(
              data.current.container.querySelector("footer"),
              {
                opacity: 0,
                duration: 0.5,
              },
              0.1
            ); // Runs after 0.1s delay
        });
      },
      enter(data) {
        const serviceSection =
          data.next.container.querySelector(".service_index");
        const header = data.next.container.querySelector("header");
        const footer = data.next.container.querySelector("footer");

        // Update active link in the navbar
        const nextUrl = location.pathname; // Get the current page path
        document.querySelectorAll(".nav-link").forEach((link) => {
          if (
            link.getAttribute("href") === nextUrl ||
            link.getAttribute("href") === `${nextUrl}`
          ) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });

        // Fade in the new page content
        gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
        });

        // Move the header down when entering
        if (header) {
          gsap.from(header, {
            y: "-100%",
            duration: 0.8,
            ease: "bounce.out",
          });
        }

        // Slide services section from the right
        if (serviceSection) {
          gsap.from(serviceSection, {
            x: "100%",
            duration: 0.6,
            ease: "power1.out",
          });
        }

        // Fade in footer
        if (footer) {
          gsap.from(footer, {
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
          });
        }
      },
    },
  ],
});

barba.hooks.after(() => {
  initializeScripts();
});
