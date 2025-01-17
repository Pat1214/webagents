document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLeft = document.querySelector(".nav-left");

  // Create and append overlay
  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  function toggleMenu() {
    menuBtn.classList.toggle("active");
    navLeft.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = navLeft.classList.contains("active")
      ? "hidden"
      : "";
  }

  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Close menu when clicking a link
  const navLinks = navLeft.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });
});
