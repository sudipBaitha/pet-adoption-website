// Pet Adoption Center Interactivity
// Carousel, Pet Profiles, FAQ, Back to Top, Animations, Forms

document.addEventListener("DOMContentLoaded", function () {
  // Carousel Images (Unsplash)
  const carouselImages = [
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  ];
  let carouselIndex = 0;
  const carousel = document.getElementById("pet-carousel");
  if (carousel) {
    function showCarouselImage(idx) {
      carousel.innerHTML = `<img src="${carouselImages[idx]}" alt="Adoptable Pet" style="width:100%;height:220px;object-fit:cover;">`;
    }
    showCarouselImage(carouselIndex);
    setInterval(() => {
      carouselIndex = (carouselIndex + 1) % carouselImages.length;
      showCarouselImage(carouselIndex);
    }, 3000);
  }

  // Pet Profiles
  const pets = [
    {
      name: "Buddy",
      desc: "A playful 2-year-old Labrador who loves fetch and cuddles.",
      img: "https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Mittens",
      desc: "A gentle 3-year-old tabby cat who enjoys sunbeams and naps.",
      img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sunny",
      desc: "A cheerful cockatiel who loves to sing and mimic sounds.",
      img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Thumper",
      desc: "A curious 1-year-old rabbit who enjoys hopping and carrots.",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
  ];
  const profilesContainer = document.querySelector(".profiles-container");
  if (profilesContainer) {
    profilesContainer.innerHTML = pets
      .map(
        (pet) => `
      <div class="pet-card">
        <img src="${pet.img}" alt="${pet.name}">
        <div class="pet-info">
          <div class="pet-name">${pet.name}</div>
          <div class="pet-desc">${pet.desc}</div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // FAQ Section
  const faqs = [
    {
      q: "What is the adoption process?",
      a: "Fill out the adoption form, and our team will contact you to schedule a meet-and-greet with your chosen pet.",
    },
    {
      q: "What are the requirements to adopt?",
      a: "You must be 18 or older, provide a valid ID, and demonstrate the ability to care for a pet.",
    },
    {
      q: "Are pets vaccinated and spayed/neutered?",
      a: "Yes, all our pets are up-to-date on vaccinations and are spayed or neutered before adoption.",
    },
    {
      q: "Can I return a pet if it doesn't work out?",
      a: "Yes, we offer a return policy within 30 days to ensure the best fit for both you and the pet.",
    },
  ];
  const faqList = document.querySelector(".faq-list");
  if (faqList) {
    faqList.innerHTML = faqs
      .map(
        (faq, i) => `
      <div class="faq-item${i === 0 ? " open" : ""}">
        <div class="faq-question">${
          faq.q
        }<i class="fa fa-chevron-down"></i></div>
        <div class="faq-answer">${faq.a}</div>
      </div>
    `
      )
      .join("");
    // FAQ toggle
    faqList.querySelectorAll(".faq-question").forEach((q) => {
      q.addEventListener("click", function () {
        const item = this.parentElement;
        item.classList.toggle("open");
      });
    });
  }

  // Back to Top Button
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });
  backToTop &&
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  // Scroll-Activated Animations
  function animateOnScroll() {
    document.querySelectorAll(".pet-card, .faq-item").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.style.opacity = 1;
        el.style.transform = "translateY(0) scale(1)";
        el.style.transition = "opacity 0.7s, transform 0.7s";
      } else {
        el.style.opacity = 0;
        el.style.transform = "translateY(40px) scale(0.98)";
      }
    });
  }
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  // Newsletter (no backend)
  const newsletter = document.querySelector(".newsletter");
  if (newsletter) {
    newsletter.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = newsletter.querySelector('input[type="email"]');
      input.value = "";
      input.placeholder = "Thank you for subscribing!";
      setTimeout(() => {
        input.placeholder = "Your email";
      }, 2000);
    });
  }
});

const form = document.getElementById("cost-calculator-form");
const resultDiv = document.getElementById("cost-result");
const petCosts = {
  Dog: {
    base: 50,
    max: 100,
    food: 35,
    grooming: 25,
    vet: 40,
    toys: 15,
    insurance: 30,
    training: 40,
    emergency: 20,
    age: {
      "Puppy/Kitten": 25,
      Young: 15,
      Adult: 0,
      Senior: 20,
    },
  },
  Cat: {
    base: 30,
    max: 70,
    food: 25,
    grooming: 18,
    vet: 25,
    toys: 10,
    insurance: 20,
    training: 10,
    emergency: 15,
    age: {
      "Puppy/Kitten": 12,
      Young: 7,
      Adult: 0,
      Senior: 12,
    },
  },
  Bird: {
    base: 20,
    max: 50,
    food: 12,
    grooming: 7,
    vet: 12,
    toys: 7,
    insurance: 10,
    training: 8,
    emergency: 8,
    age: {
      "Puppy/Kitten": 6,
      Young: 3,
      Adult: 0,
      Senior: 5,
    },
  },
  Rabbit: {
    base: 25,
    max: 60,
    food: 15,
    grooming: 10,
    vet: 18,
    toys: 8,
    insurance: 12,
    training: 12,
    emergency: 10,
    age: {
      "Puppy/Kitten": 8,
      Young: 4,
      Adult: 0,
      Senior: 7,
    },
  },
};
if (form && resultDiv) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const petType = form["pet-type"].value;
    const petAge = form["pet-age"].value;
    if (!petType || !petCosts[petType]) {
      resultDiv.style.display = "block";
      resultDiv.textContent = "Please select a pet type.";
      return;
    }
    if (!petAge || !petCosts[petType].age[petAge]) {
      resultDiv.style.display = "block";
      resultDiv.textContent = "Please select a pet age group.";
      return;
    }
    let total = petCosts[petType].base + petCosts[petType].age[petAge];
    let breakdown = [
      { label: "Base Care", value: petCosts[petType].base },
      {
        label: `Age Adjustment (${petAge})`,
        value: petCosts[petType].age[petAge],
      },
    ];
    form.querySelectorAll("input[type=checkbox]:checked").forEach((cb) => {
      const val = petCosts[petType][cb.value] || 0;
      total += val;
      let label = "";
      switch (cb.value) {
        case "food":
          label = "Food";
          break;
        case "grooming":
          label = "Grooming";
          break;
        case "vet":
          label = "Vet Visits";
          break;
        case "toys":
          label = "Toys";
          break;
        case "insurance":
          label = "Pet Insurance";
          break;
        case "training":
          label = "Training";
          break;
        case "emergency":
          label = "Emergency Fund";
          break;
        default:
          label = cb.value;
      }
      breakdown.push({ label, value: val });
    });
    let breakdownHtml = `<ul style='margin:0 0 0.5rem 1.2rem;padding:0;font-size:0.98rem;'>`;
    breakdown.forEach((item) => {
      breakdownHtml += `<li>${item.label}: $${item.value}</li>`;
    });
    breakdownHtml += `</ul>`;
    let msg = `Your estimated monthly cost for a <strong>${petType}</strong> is <strong>$${total}</strong>.`;
    msg += `<br><span style='font-weight:500;'>Breakdown:</span> ${breakdownHtml}`;
    resultDiv.style.display = "block";
    resultDiv.innerHTML = msg;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Adoption Form Notification
  const adoptionForm = document.getElementById("adoption-form");
  if (adoptionForm) {
    adoptionForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const confirmation = document.getElementById("form-confirmation");
      if (confirmation) {
        confirmation.textContent = "Application successfully submitted!";
        confirmation.style.display = "block";
        setTimeout(() => {
          confirmation.style.display = "none";
        }, 3000);
      }
      adoptionForm.reset();
    });
  }

  // Contact Form Notification
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const confirmation = document.getElementById("form-confirmation-contact");
      if (confirmation) {
        confirmation.textContent = "Message successfully sent!";
        confirmation.style.display = "block";
        setTimeout(() => {
          confirmation.style.display = "none";
        }, 3000);
      }
      contactForm.reset();
    });
  }
});
