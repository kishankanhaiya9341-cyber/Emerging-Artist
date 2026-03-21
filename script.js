const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

toggle.onclick = () => {
  nav.classList.toggle("active");
};