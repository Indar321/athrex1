// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile Menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger?.addEventListener("click", () => mobileMenu.classList.toggle("open"));
document.querySelectorAll(".m-link").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

// Scroll Progress + Navbar border
const progress = document.getElementById("scrollProgress");
const navbar = document.getElementById("navbar");

function onScroll(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if(progress) progress.style.width = `${scrolled}%`;
  if(navbar) navbar.classList.toggle("scrolled", h.scrollTop > 8);
}
window.addEventListener("scroll", onScroll);
onScroll();

// Active nav highlight
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 140;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document.querySelector(`.nav a[href*="${sectionId}"]`)?.classList.add("active");
    }
  });
});

// Reveal animation
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealEls.forEach(el => observer.observe(el));

// Tilt effect
function tiltCard(el){
  const damp = 14;
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -damp;
    const ry = ((x / rect.width) - 0.5) * damp;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}
document.querySelectorAll(".tilt").forEach(tiltCard);

// Cursor glow
const glow = document.getElementById("cursorGlow");
let glowShown = false;

window.addEventListener("mousemove", (e) => {
  if(!glow) return;
  if(!glowShown){
    glow.style.opacity = "1";
    glowShown = true;
  }
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Quote form -> WhatsApp redirect
const quoteForm = document.getElementById("quoteForm");
quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const type = document.getElementById("type").value.trim();
  const msg = document.getElementById("msg").value.trim();

  const text =
    `Hello Athrex Energy,%0A%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Project Type: ${encodeURIComponent(type)}%0A` +
    `Message: ${encodeURIComponent(msg || "N/A")}%0A%0A` +
    `Please contact me.`;

  const phoneNumber = "916265422126";
  window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");

  quoteForm.reset();
});
