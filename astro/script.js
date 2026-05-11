// Initialize Lucide icons
lucide.createIcons();

// Color Variant Switching
const colorVariants = document.querySelectorAll(".color-variant");
const mainProductImg = document.getElementById("main-product-img");

colorVariants.forEach((variant) => {
  variant.addEventListener("click", () => {
    // Remove active class from all
    colorVariants.forEach((v) => v.classList.remove("active"));
    // Add active class to clicked
    variant.classList.add("active");

    // Update main image
    const newImgSrc = variant.getAttribute("data-img");
    if (newImgSrc) {
      // Add a subtle fade effect during transition
      mainProductImg.style.opacity = "0";
      setTimeout(() => {
        mainProductImg.src = newImgSrc;
        mainProductImg.style.opacity = "1";
      }, 200);
    }
  });
});

// Size Chip Selection
const sizeChips = document.querySelectorAll(".size-chip");
sizeChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    sizeChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
  });
});

// Add to Bag Animation
const addBtn = document.querySelector(".add-to-bag");
addBtn.addEventListener("click", () => {
  addBtn.innerHTML = 'Added to Bag <i data-lucide="check"></i>';
  lucide.createIcons();
  addBtn.style.background = "#22C55E"; // Green

  setTimeout(() => {
    addBtn.innerHTML = 'Add to Bag <i data-lucide="shopping-cart"></i>';
    lucide.createIcons();
    addBtn.style.background = "var(--primary)";
  }, 2000);
});

// Wishlist Toggle
const wishlistBtn = document.querySelector(".wishlist");
let isWishlisted = false;
wishlistBtn.addEventListener("click", () => {
  isWishlisted = !isWishlisted;
  if (isWishlisted) {
    wishlistBtn.innerHTML =
      '<i data-lucide="heart" fill="currentColor"></i> Wishlisted';
    wishlistBtn.style.color = "#E11D48"; // Rose
  } else {
    wishlistBtn.innerHTML = '<i data-lucide="heart"></i> Add to Wishlist';
    wishlistBtn.style.color = "inherit";
  }
  lucide.createIcons();
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
