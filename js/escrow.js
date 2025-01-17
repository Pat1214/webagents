class EscrowManager {
  constructor() {
    this.selectedAgent = null;
    this.escrows = [];
    this.init();
  }

  async init() {
    this.setupTabs();
    await this.loadUserAgents();
    await this.loadActiveEscrows();
    this.setupEventListeners();
  }

  setupTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));

        // Add active class to clicked tab and corresponding content
        tab.classList.add("active");
        document
          .getElementById(`${tab.dataset.tab}-tab`)
          .classList.add("active");
      });
    });
  }

  async loadUserAgents() {
    try {
      // In a real app, this would fetch from your backend
      const mockAgents = [
        {
          id: 1,
          name: "Trading Assistant Pro",
          description: "Advanced trading analysis and portfolio management",
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300",
        },
        {
          id: 2,
          name: "Creative AI Partner",
          description: "Content generation and creative assistance",
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=300",
        },
      ];

      const agentList = document.getElementById("your-agents");
      const template = document.getElementById("agent-card-template");

      mockAgents.forEach((agent) => {
        const card = template.content.cloneNode(true);

        card.querySelector(".agent-preview").src = agent.image;
        card.querySelector(".agent-name").textContent = agent.name;
        card.querySelector(".agent-description").textContent =
          agent.description;
        card.querySelector(".agent-rating").textContent = `★ ${agent.rating}`;

        const selectBtn = card.querySelector(".select-agent-btn");
        selectBtn.dataset.agentId = agent.id;
        selectBtn.addEventListener("click", () => this.selectAgent(agent));

        agentList.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading agents:", error);
    }
  }

  async loadActiveEscrows() {
    try {
      // In a real app, this would fetch from your backend/blockchain
      const mockEscrows = [
        {
          id: 1,
          type: "agent",
          title: "Trading Assistant Pro",
          details: "Seller: 0x1234...5678\nPrice: 0.5 ETH\nLock Period: 3 days",
          status: "pending",
        },
        {
          id: 2,
          type: "token",
          title: "USDC Transfer",
          details:
            "Amount: 1000 USDC\nRecipient: 0x8765...4321\nLock Period: 2 days",
          status: "active",
        },
      ];

      this.escrows = mockEscrows;
      this.renderEscrows();
    } catch (error) {
      console.error("Error loading escrows:", error);
    }
  }

  renderEscrows() {
    const agentEscrowList = document.getElementById("agent-escrows");
    const tokenEscrowList = document.getElementById("token-escrows");
    const template = document.getElementById("escrow-card-template");

    agentEscrowList.innerHTML = "";
    tokenEscrowList.innerHTML = "";

    this.escrows.forEach((escrow) => {
      const card = template.content.cloneNode(true);

      card.querySelector(".escrow-title").textContent = escrow.title;
      card.querySelector(".escrow-details").textContent = escrow.details;

      const statusDiv = card.querySelector(".escrow-status");
      statusDiv.textContent = escrow.status.toUpperCase();
      statusDiv.classList.add(`status-${escrow.status}`);

      // Add event listeners to buttons
      const approveBtn = card.querySelector(".approve-btn");
      const cancelBtn = card.querySelector(".cancel-btn");

      approveBtn.addEventListener("click", () => this.approveEscrow(escrow.id));
      cancelBtn.addEventListener("click", () => this.cancelEscrow(escrow.id));

      // Disable buttons based on status
      if (escrow.status !== "pending") {
        approveBtn.disabled = true;
        approveBtn.style.opacity = "0.5";
      }

      const targetList =
        escrow.type === "agent" ? agentEscrowList : tokenEscrowList;
      targetList.appendChild(card);
    });
  }

  selectAgent(agent) {
    this.selectedAgent = agent;
    // Update UI to show selected agent
    document.querySelectorAll(".select-agent-btn").forEach((btn) => {
      btn.classList.remove("selected");
      if (parseInt(btn.dataset.agentId) === agent.id) {
        btn.classList.add("selected");
        btn.textContent = "Selected";
      }
    });
  }

  setupEventListeners() {
    // Agent escrow creation
    document
      .getElementById("create-agent-escrow")
      .addEventListener("click", async () => {
        if (!this.selectedAgent) {
          alert("Please select an agent first");
          return;
        }

        const recipient = document.getElementById("agent-recipient").value;
        const price = document.getElementById("agent-price").value;
        const lockPeriod = document.getElementById("agent-lock-period").value;

        if (!recipient || !price || !lockPeriod) {
          alert("Please fill in all fields");
          return;
        }

        // Show invitation modal
        this.showInvitationModal(async (inviteCode) => {
          if (inviteCode) {
            try {
              await this.createAgentEscrow(recipient, price, lockPeriod);
            } catch (error) {
              console.error("Error creating agent escrow:", error);
              alert("Failed to create escrow. Please try again.");
            }
          }
        });
      });

    // Modal event listeners
    document
      .getElementById("cancel-invitation")
      .addEventListener("click", () => {
        this.hideInvitationModal();
      });

    document
      .getElementById("confirm-invitation")
      .addEventListener("click", () => {
        const inviteCode = document.getElementById("invitation-code").value;
        if (!inviteCode) {
          alert("Please enter an invitation code");
          return;
        }
        this.hideInvitationModal();
        this.currentModalCallback?.(inviteCode);
      });

    // Token escrow creation
    document
      .getElementById("create-token-escrow")
      .addEventListener("click", async () => {
        const tokenAddress = document.getElementById("token-address").value;
        const amount = document.getElementById("token-amount").value;
        const recipient = document.getElementById("token-recipient").value;
        const lockPeriod = document.getElementById("token-lock-period").value;

        if (!tokenAddress || !amount || !recipient || !lockPeriod) {
          alert("Please fill in all fields");
          return;
        }

        try {
          await this.createTokenEscrow(
            tokenAddress,
            amount,
            recipient,
            lockPeriod
          );
        } catch (error) {
          console.error("Error creating token escrow:", error);
          alert("Failed to create escrow. Please try again.");
        }
      });
  }

  async createAgentEscrow(recipient, price, lockPeriod) {
    if (!window.ethereum) {
      alert("Please install MetaMask to create escrows!");
      return;
    }

    try {
      // Here you would normally:
      // 1. Deploy or interact with escrow smart contract
      // 2. Transfer agent ownership to escrow contract
      // 3. Handle transaction confirmation

      alert("Escrow system coming soon. This is currently a simulation.");

      // Simulate successful escrow creation
      this.escrows.push({
        id: Date.now(),
        type: "agent",
        title: this.selectedAgent.name,
        details: `Seller: ${window.ethereum.selectedAddress}\nRecipient: ${recipient}\nPrice: ${price} ETH\nLock Period: ${lockPeriod} days`,
        status: "pending",
      });

      this.renderEscrows();
    } catch (error) {
      console.error("Error in createAgentEscrow:", error);
      throw error;
    }
  }

  async createTokenEscrow(tokenAddress, amount, recipient, lockPeriod) {
    if (!window.ethereum) {
      alert("Please install MetaMask to create escrows!");
      return;
    }

    try {
      // Here you would normally:
      // 1. Deploy or interact with escrow smart contract
      // 2. Transfer tokens to escrow contract
      // 3. Handle transaction confirmation

      alert("Escrow system coming soon. This is currently a simulation.");

      // Simulate successful escrow creation
      this.escrows.push({
        id: Date.now(),
        type: "token",
        title: "Token Transfer",
        details: `Token: ${tokenAddress}\nAmount: ${amount}\nRecipient: ${recipient}\nLock Period: ${lockPeriod} days`,
        status: "pending",
      });

      this.renderEscrows();
    } catch (error) {
      console.error("Error in createTokenEscrow:", error);
      throw error;
    }
  }

  async approveEscrow(escrowId) {
    try {
      // Here you would normally:
      // 1. Call escrow contract's approve function
      // 2. Handle transaction confirmation
      // 3. Update escrow status on backend

      const escrow = this.escrows.find((e) => e.id === escrowId);
      if (escrow) {
        escrow.status = "active";
        this.renderEscrows();
      }
    } catch (error) {
      console.error("Error approving escrow:", error);
      alert("Failed to approve escrow. Please try again.");
    }
  }

  async cancelEscrow(escrowId) {
    try {
      // Here you would normally:
      // 1. Call escrow contract's cancel function
      // 2. Handle transaction confirmation
      // 3. Update escrow status on backend

      const escrow = this.escrows.find((e) => e.id === escrowId);
      if (escrow) {
        escrow.status = "cancelled";
        this.renderEscrows();
      }
    } catch (error) {
      console.error("Error cancelling escrow:", error);
      alert("Failed to cancel escrow. Please try again.");
    }
  }

  showInvitationModal(callback) {
    const modal = document.getElementById("invitation-modal");
    const input = document.getElementById("invitation-code");
    modal.classList.add("active");
    input.value = "";
    input.focus();
    this.currentModalCallback = callback;

    // Handle Enter key
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        document.getElementById("confirm-invitation").click();
      }
    };
    input.addEventListener("keypress", handleEnter);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.hideInvitationModal();
      }
    });
  }

  hideInvitationModal() {
    const modal = document.getElementById("invitation-modal");
    modal.classList.remove("active");
    this.currentModalCallback = null;
  }
}

// Initialize the escrow manager
document.addEventListener("DOMContentLoaded", () => {
  window.escrowManager = new EscrowManager();
});
