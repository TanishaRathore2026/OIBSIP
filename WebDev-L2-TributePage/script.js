document.addEventListener("DOMContentLoaded", () => {

  // Reveal animation
  const revealElements = document.querySelectorAll(
    ".timeline-card, .legacy-card, .stat, .intro-content p"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);

        }

      });
    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element, index) => {

    element.style.transitionDelay = `${(index % 4) * 80}ms`;

    observer.observe(element);

  });


  // Subtle hero parallax
  const hero = document.querySelector(".hero");
  const portrait = document.querySelector(".portrait-wrap");

  if (hero && portrait) {

    hero.addEventListener("mousemove", (event) => {

      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;

      portrait.style.transform =
        `translate(${x}px, ${y}px)`;

    });

    hero.addEventListener("mouseleave", () => {

      portrait.style.transform = "translate(0, 0)";

    });

  }


  // Add visible class styling dynamically
  const style = document.createElement("style");

  style.textContent = `
    .timeline-card,
    .legacy-card,
    .stat,
    .intro-content p {
      opacity: 0;
      transform: translateY(30px);
      transition:
        opacity .8s ease,
        transform .8s ease;
    }

    .timeline-card.show,
    .legacy-card.show,
    .stat.show,
    .intro-content p.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  document.head.appendChild(style);

});