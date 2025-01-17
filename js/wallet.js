async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask to use this feature!");
    window.open("https://metamask.io/download/", "_blank");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }

    const account = accounts[0];
    updateWalletUI(account);
    return account;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert(
      "Failed to connect wallet. Please make sure MetaMask is unlocked and try again."
    );
    return null;
  }
}

function updateWalletUI(account) {
  // Update button text
  const walletButton = document.querySelector(
    ".connect-wallet-btn, .connect-wallet"
  );
  if (walletButton) {
    walletButton.textContent = `${account.slice(0, 6)}...${account.slice(-4)}`;
  }

  // Store the account in localStorage
  localStorage.setItem("walletAddress", account);
  localStorage.setItem("walletConnected", "true");

  // Remove wallet overlay if it exists
  const walletOverlay = document.getElementById("walletOverlay");
  if (walletOverlay) {
    walletOverlay.remove();
  }

  // Dispatch a custom event
  window.dispatchEvent(
    new CustomEvent("walletConnected", { detail: { account } })
  );
}

// Check initial connection state
async function checkWalletConnection() {
  const savedWalletConnected = localStorage.getItem("walletConnected");
  const savedWalletAddress = localStorage.getItem("walletAddress");

  // If we have a saved connection, verify it
  if (savedWalletConnected === "true" && savedWalletAddress) {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          updateWalletUI(accounts[0]);
          return true;
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
    // Clear invalid saved connection
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
  }

  // Only create overlay on pages that require wallet connection
  const requiresWallet = document.querySelector(
    '[data-requires-wallet="true"]'
  );
  if (requiresWallet && !document.getElementById("walletOverlay")) {
    createWalletOverlay();
  }

  return false;
}

function createWalletOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "walletOverlay";
  overlay.className = "wallet-overlay";

  overlay.innerHTML = `
    <div class="wallet-prompt">
      <h2>Connect Your Wallet</h2>
      <p>Please connect your wallet to continue</p>
      <button onclick="connectWallet()" class="connect-wallet-btn">
        Connect Wallet
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
}

if (window.ethereum) {
  window.ethereum.on("accountsChanged", function (accounts) {
    if (accounts.length > 0) {
      updateWalletUI(accounts[0]);
    } else {
      // Clear localStorage when user disconnects
      localStorage.removeItem("walletConnected");
      localStorage.removeItem("walletAddress");

      const walletButton = document.querySelector(
        ".connect-wallet-btn, .connect-wallet"
      );
      if (walletButton) {
        walletButton.textContent = "Connect Wallet";
      }

      // Only show overlay on pages that require wallet
      const requiresWallet = document.querySelector(
        '[data-requires-wallet="true"]'
      );
      if (requiresWallet) {
        createWalletOverlay();
      }
    }
  });

  window.ethereum.on("chainChanged", (_chainId) => {
    window.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", checkWalletConnection);

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-left a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
});
