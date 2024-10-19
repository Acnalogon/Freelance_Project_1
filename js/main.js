function initializeScripts() {
  document.body.classList.add("fade-in");

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

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

window.addEventListener("load", () => {
  initializeScripts();
});

barba.init({
  transitions: [
    {
      name: "fade-transition",
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
        });
      },
      enter(data) {
        window.scrollTo(0, 0);
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
        });
      },
    },
  ],
});

barba.hooks.after(() => {
  initializeScripts();
});
