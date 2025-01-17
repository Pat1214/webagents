document.addEventListener("DOMContentLoaded", () => {
  const walletOverlay = document.getElementById("walletOverlay");
  const form = document.querySelector(".form-container");
  const saveBtn = document.querySelector(".save-btn");
  let isWalletConnected = false;

  // Check if wallet is already connected
  if (window.ethereum && window.ethereum.selectedAddress) {
    isWalletConnected = true;
    walletOverlay.style.display = "none";
  }

  // Listen for wallet connection events
  window.addEventListener("walletConnected", (event) => {
    isWalletConnected = true;
    walletOverlay.style.display = "none";
    saveBtn.disabled = false;
  });

  // Form validation and token counting
  const inputs = form.querySelectorAll("input, textarea");
  const maxTokens = 2048;
  let currentTokens = 0;

  function updateTokenCount() {
    let total = 0;
    inputs.forEach((input) => {
      total += input.value.length;
    });
    currentTokens = total;
    document.getElementById("current-tokens").textContent = total;
    saveBtn.disabled = total === 0 || total > maxTokens;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      updateTokenCount();

      // Update preview
      if (e.target.id === "agentName") {
        document.getElementById("previewName").textContent =
          e.target.value || "Holo";
      }
    });
  });

  // Category tags
  const categoryTags = document.getElementById("categoryTags");
  const addCategoryBtn = document.querySelector(".add-category-btn");
  const categories = new Set();

  addCategoryBtn.addEventListener("click", () => {
    const category = prompt("Enter category name:");
    if (category && !categories.has(category)) {
      categories.add(category);
      const tag = document.createElement("span");
      tag.className = "category-tag";
      tag.innerHTML = `${category} <button class="remove-tag">×</button>`;
      categoryTags.appendChild(tag);

      tag.querySelector(".remove-tag").addEventListener("click", () => {
        categories.delete(category);
        tag.remove();
      });
    }
  });

  // Sidebar navigation
  const sidebarSections = document.querySelectorAll(".sidebar-section");
  sidebarSections.forEach((section) => {
    section.addEventListener("click", () => {
      sidebarSections.forEach((s) => s.classList.remove("active"));
      section.classList.add("active");
      document.querySelector(".content-header h2").textContent = section
        .querySelector(".section-label")
        .textContent.toUpperCase();
    });
  });

  async function validateInviteCode() {
    const inviteCode = prompt("Please enter your invitation code to save:");

    if (!inviteCode) {
      alert("An invitation code is required to save your agent.");
      return false;
    }

    if (inviteCode.trim() === "") {
      alert(
        "Invalid invitation code. Please contact support for a valid code."
      );
      return false;
    }

    // Here you would normally validate the code with your backend
    alert(
      "Invitation system coming soon. Agent creation is currently restricted to approved users only."
    );
    return false; // Return false until the invitation system is implemented
  }

  // Save functionality
  saveBtn.addEventListener("click", async () => {
    if (!isWalletConnected) {
      alert("Please connect your wallet first");
      return;
    }

    // Check invitation code first
    const isValidInvite = await validateInviteCode();
    if (!isValidInvite) {
      return;
    }

    const agentData = {
      name: document.getElementById("agentName").value,
      nickname: document.getElementById("agentNickname").value,
      categories: Array.from(categories),
      bio: document.getElementById("agentBio").value,
      voice: document.getElementById("agentVoice").value,
    };

    try {
      // Here you would normally send this to your backend
      console.log("Saving agent:", agentData);
      alert("Agent saved successfully!");
    } catch (error) {
      console.error("Error saving agent:", error);
      alert("Failed to save agent. Please try again.");
    }
  });
});
