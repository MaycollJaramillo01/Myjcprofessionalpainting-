(function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  var animatedItems = document.querySelectorAll([
    ".hero-content",
    ".page-hero .container > *",
    ".section-heading",
    ".split > *",
    ".feature",
    ".service-card",
    ".service-detail > *",
    ".content-card",
    ".faq-item",
    ".service-note",
    ".related-link",
    ".info-band",
    ".steps > *",
    ".timeline > *",
    ".values > *",
    ".contact-panel",
    ".quote-form",
    ".map-card",
    ".work-preview > *",
    ".masonry > *",
    ".video-grid > *",
    ".cta-content > *"
  ].join(", "));

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && animatedItems.length) {
    animatedItems.forEach(function (item, index) {
      item.classList.add("animate-init", "animate-delay-" + (index % 4));
    });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      animatedItems.forEach(function (item) {
        observer.observe(item);
      });
    } else {
      animatedItems.forEach(function (item) {
        item.classList.add("animate-in");
      });
    }
  }

  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lightboxImage = lightbox.querySelector("img");
    var closeButton = lightbox.querySelector(".lightbox-close");
    var previousFocus = null;

    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        previousFocus = document.activeElement;
        lightboxImage.src = item.dataset.full;
        lightboxImage.alt = item.querySelector("img").alt;
        lightbox.hidden = false;
        closeButton.focus();
      });
    });

    function closeLightbox() {
      lightbox.hidden = true;
      lightboxImage.src = "";
      if (previousFocus) previousFocus.focus();
    }

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  document.querySelectorAll("form[data-static-form]").forEach(function (form) {
    form.addEventListener("submit", function () {
      if (!form.querySelector('input[name="_next"]') && /^https?:$/.test(window.location.protocol)) {
        var next = document.createElement("input");
        next.type = "hidden";
        next.name = "_next";
        next.value = new URL("thanks.html", window.location.href).href;
        form.appendChild(next);
      }
      var status = form.querySelector(".form-status");
      var button = form.querySelector('button[type="submit"]');
      if (status) status.textContent = "Sending request...";
      if (button) button.textContent = "Sending...";
    });
  });

  var form = document.getElementById("quote-form");
  if (form && !form.hasAttribute("data-static-form")) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var body = [
        "Name: " + (data.get("name") || ""),
        "Phone: " + (data.get("phone") || ""),
        "Email: " + (data.get("email") || ""),
        "Project type: " + (data.get("service") || ""),
        "",
        "Project details:",
        data.get("message") || ""
      ].join("\n");
      var subject = encodeURIComponent("Painting estimate request");
      window.location.href = "mailto:Jcprofessionalpainting@gmail.com?subject=" + subject + "&body=" + encodeURIComponent(body);
      var status = form.querySelector(".form-status");
      if (status) status.textContent = "Your email app should open with the project details.";
    });
  }
})();
