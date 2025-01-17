class AIMarketplace {
  constructor() {
    this.currentPage = 1;
    this.agentsPerPage = 9;
    this.agents = [];
    this.currentPurchaseAgent = null;
    this.init();
  }

  async init() {
    await this.loadAgents();
    this.setupEventListeners();
    this.renderAgents();
    this.setupPagination();
  }

  async loadAgents() {
    // In a real app, this would fetch from your backend
    this.agents = [
      // Page 1
      {
        id: 1,
        name: "SportsSage AI",
        description:
          "Advanced sports prediction agent using historical data and real-time analytics",
        price: 0.8,
        rating: 4.8,
        category: "prediction",
        image:
          "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300",
        features: [
          "MLB Predictions",
          "NBA Analytics",
          "NFL Game Analysis",
          "Live Odds Integration",
        ],
      },
      {
        id: 2,
        name: "TradeWizard Pro",
        description:
          "AI-powered trading assistant with market analysis and portfolio management",
        price: 1.2,
        rating: 4.7,
        category: "trading",
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300",
        features: [
          "Market Analysis",
          "Portfolio Optimization",
          "Risk Management",
          "Trend Detection",
        ],
      },
      {
        id: 3,
        name: "ContentForge AI",
        description:
          "Creative content generation agent for marketing and social media",
        price: 0.5,
        rating: 3.9,
        category: "creative",
        image:
          "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=300",
        features: [
          "Social Media Posts",
          "Blog Writing",
          "Ad Copy",
          "Brand Voice",
        ],
      },
      {
        id: 4,
        name: "ResearchMind",
        description:
          "Academic research assistant with advanced data analysis capabilities",
        price: 0.9,
        rating: 4.5,
        category: "research",
        image:
          "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=300",
        features: [
          "Paper Analysis",
          "Citation Management",
          "Data Visualization",
          "Research Planning",
        ],
      },
      {
        id: 5,
        name: "CodeBuddy AI",
        description:
          "Intelligent coding assistant for developers and programmers",
        price: 0.7,
        rating: 4.2,
        category: "development",
        image:
          "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&w=300",
        features: [
          "Code Review",
          "Bug Detection",
          "Refactoring",
          "Documentation",
        ],
      },
      {
        id: 6,
        name: "HealthGuard",
        description:
          "Personal health monitoring and wellness recommendation system",
        price: 0.6,
        rating: 3.7,
        category: "health",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300",
        features: [
          "Health Tracking",
          "Diet Plans",
          "Exercise Routines",
          "Sleep Analysis",
        ],
      },
      {
        id: 7,
        name: "FinanceGuru",
        description: "Personal finance advisor and budget optimization agent",
        price: 0.4,
        rating: 4.1,
        category: "finance",
        image:
          "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=300",
        features: [
          "Budget Planning",
          "Expense Tracking",
          "Investment Tips",
          "Savings Goals",
        ],
      },
      {
        id: 8,
        name: "GameMaster AI",
        description: "Advanced gaming companion and strategy advisor",
        price: 0.3,
        rating: 3.5,
        category: "gaming",
        image:
          "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=300",
        features: [
          "Strategy Guide",
          "Player Analysis",
          "Team Optimization",
          "Meta Tracking",
        ],
      },
      {
        id: 9,
        name: "EcoSmart",
        description: "Environmental impact analysis and sustainability advisor",
        price: 0.5,
        rating: 4.3,
        category: "environment",
        image:
          "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=300",
        features: [
          "Carbon Tracking",
          "Eco Tips",
          "Resource Management",
          "Green Analytics",
        ],
      },
      // Page 2
      {
        id: 10,
        name: "MusicMuse",
        description: "AI music composition and production assistant",
        price: 0.8,
        rating: 4.0,
        category: "creative",
        image:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=300",
        features: [
          "Melody Generation",
          "Chord Progression",
          "Beat Making",
          "Mix Analysis",
        ],
      },
      {
        id: 11,
        name: "CyberSentry",
        description: "Cybersecurity monitoring and threat detection agent",
        price: 1.5,
        rating: 4.9,
        category: "security",
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300",
        features: [
          "Threat Detection",
          "Network Analysis",
          "Security Alerts",
          "Risk Assessment",
        ],
      },
      {
        id: 12,
        name: "ChefBot",
        description:
          "Culinary assistant with recipe generation and meal planning",
        price: 0.4,
        rating: 3.8,
        category: "lifestyle",
        image:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=300",
        features: [
          "Recipe Creation",
          "Meal Planning",
          "Ingredient Substitution",
          "Cooking Tips",
        ],
      },
      {
        id: 13,
        name: "TravelBuddy",
        description: "Travel planning and itinerary optimization assistant",
        price: 0.6,
        rating: 4.4,
        category: "travel",
        image:
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=300",
        features: [
          "Route Planning",
          "Local Tips",
          "Budget Tracking",
          "Translation",
        ],
      },
      {
        id: 14,
        name: "FitnessCoach",
        description: "Personal training and workout optimization agent",
        price: 0.7,
        rating: 3.6,
        category: "health",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300",
        features: [
          "Workout Plans",
          "Form Analysis",
          "Progress Tracking",
          "Nutrition Tips",
        ],
      },
      {
        id: 15,
        name: "StudyBrain",
        description: "Educational assistant for students and lifelong learners",
        price: 0.5,
        rating: 4.2,
        category: "education",
        image:
          "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=300",
        features: [
          "Study Plans",
          "Quiz Generation",
          "Note Taking",
          "Concept Mapping",
        ],
      },
      {
        id: 16,
        name: "EventPro AI",
        description: "Event planning and management assistant",
        price: 0.9,
        rating: 3.9,
        category: "lifestyle",
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300",
        features: [
          "Schedule Planning",
          "Vendor Management",
          "Budget Tracking",
          "Guest Lists",
        ],
      },
      {
        id: 17,
        name: "PetPal",
        description: "Pet care and training assistance system",
        price: 0.3,
        rating: 4.1,
        category: "lifestyle",
        image:
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=300",
        features: [
          "Training Tips",
          "Health Tracking",
          "Behavior Analysis",
          "Care Schedules",
        ],
      },
      {
        id: 18,
        name: "LanguageMaster",
        description: "Advanced language learning and translation assistant",
        price: 0.7,
        rating: 4.3,
        category: "education",
        image:
          "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=300",
        features: [
          "Language Learning",
          "Translation",
          "Pronunciation",
          "Cultural Notes",
        ],
      },
    ];
  }

  setupPagination() {
    const totalAgents = 1387; // Total number of agents
    const totalPages = Math.ceil(totalAgents / this.agentsPerPage); // 154 pages
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination";

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "←";
    prevBtn.className = "page-nav-btn";
    prevBtn.disabled = this.currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderAgents();
        this.updatePagination();
      }
    });
    paginationContainer.appendChild(prevBtn);

    // First page
    paginationContainer.appendChild(this.createPageButton(1));

    // Calculate visible page range
    let startPage = Math.max(2, this.currentPage - 1);
    let endPage = Math.min(startPage + 2, totalPages - 1);

    if (this.currentPage > 2) {
      const dots = document.createElement("span");
      dots.className = "page-dots";
      dots.textContent = "...";
      paginationContainer.appendChild(dots);
    }

    // Add page buttons with invitation check
    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.className = `page-btn ${i === this.currentPage ? "active" : ""}`;
      pageBtn.addEventListener("click", async () => {
        if (i > 2) {
          const inviteCode = prompt(
            "Please enter your invitation code to access more agents:"
          );
          if (!inviteCode) {
            alert("An invitation code is required to view more agents.");
            return;
          }
          if (inviteCode.trim() === "") {
            alert(
              "Invalid invitation code. Please contact support for a valid code."
            );
            return;
          }
          alert(
            "Invitation system coming soon. Access to additional agents is currently restricted to approved users only."
          );
          return;
        }
        this.currentPage = i;
        this.renderAgents();
        this.updatePagination();
      });
      paginationContainer.appendChild(pageBtn);
    }

    // Add dots before last page if needed
    if (endPage < totalPages - 1) {
      const dots = document.createElement("span");
      dots.className = "page-dots";
      dots.textContent = "...";
      paginationContainer.appendChild(dots);
    }

    // Last page with invitation check
    const lastPageBtn = document.createElement("button");
    lastPageBtn.textContent = totalPages;
    lastPageBtn.className = "page-btn";
    lastPageBtn.addEventListener("click", async () => {
      const inviteCode = prompt(
        "Please enter your invitation code to access more agents:"
      );
      if (!inviteCode) {
        alert("An invitation code is required to view more agents.");
        return;
      }
      if (inviteCode.trim() === "") {
        alert(
          "Invalid invitation code. Please contact support for a valid code."
        );
        return;
      }
      alert(
        "Invitation system coming soon. Access to additional agents is currently restricted to approved users only."
      );
    });
    paginationContainer.appendChild(lastPageBtn);

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "→";
    nextBtn.className = "page-nav-btn";
    nextBtn.disabled = this.currentPage === totalPages;
    nextBtn.addEventListener("click", async () => {
      if (this.currentPage === 2) {
        const inviteCode = prompt(
          "Please enter your invitation code to access more agents:"
        );
        if (!inviteCode) {
          alert("An invitation code is required to view more agents.");
          return;
        }
        if (inviteCode.trim() === "") {
          alert(
            "Invalid invitation code. Please contact support for a valid code."
          );
          return;
        }
        alert(
          "Invitation system coming soon. Access to additional agents is currently restricted to approved users only."
        );
        return;
      }
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.renderAgents();
        this.updatePagination();
      }
    });
    paginationContainer.appendChild(nextBtn);

    document.getElementById("agent-listings").after(paginationContainer);
  }

  createPageButton(pageNum) {
    const button = document.createElement("button");
    button.textContent = pageNum;
    button.className = `page-btn ${
      pageNum === this.currentPage ? "active" : ""
    }`;
    button.addEventListener("click", () => {
      this.currentPage = pageNum;
      this.renderAgents();
      this.updatePagination();
    });
    return button;
  }

  updatePagination() {
    const oldPagination = document.querySelector(".pagination");
    if (oldPagination) {
      oldPagination.remove();
    }
    this.setupPagination();
  }

  renderAgents(filteredAgents = null) {
    const container = document.getElementById("agent-listings");
    const template = document.getElementById("agent-card-template");
    const agents = filteredAgents || this.agents;
    container.innerHTML = "";

    const start = (this.currentPage - 1) * this.agentsPerPage;
    const end = start + this.agentsPerPage;
    const paginatedAgents = agents.slice(start, end);

    paginatedAgents.forEach((agent) => {
      const card = template.content.cloneNode(true);

      card.querySelector(".agent-preview").src = agent.image;
      card.querySelector(".agent-name").textContent = agent.name;
      card.querySelector(".agent-description").textContent = agent.description;
      card.querySelector(".agent-price").textContent = `${agent.price} ETH`;
      card.querySelector(".agent-rating").textContent = `★ ${agent.rating}`;

      // Add features
      const featuresContainer = card.querySelector(".agent-features");
      agent.features.forEach((feature) => {
        const span = document.createElement("span");
        span.className = "feature-tag";
        span.textContent = feature;
        featuresContainer.appendChild(span);
      });

      // Update purchase button to use modal
      const purchaseBtn = card.querySelector(".purchase-btn");
      purchaseBtn.addEventListener("click", () => this.purchaseAgent(agent));

      container.appendChild(card);
    });
  }

  setupEventListeners() {
    const categoryFilter = document.getElementById("category-filter");
    const searchInput = document.getElementById("search");

    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => this.filterAgents());
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => this.filterAgents());
    }

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
  }

  filterAgents() {
    const category = document.getElementById("category-filter").value;
    const searchTerm = document.getElementById("search").value.toLowerCase();

    const filtered = this.agents.filter((agent) => {
      const matchesCategory = !category || agent.category === category;
      const matchesSearch =
        agent.name.toLowerCase().includes(searchTerm) ||
        agent.description.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });

    this.renderAgents(filtered);
  }

  async purchaseAgent(agent) {
    if (!window.ethereum) {
      alert("Please install MetaMask to purchase agents!");
      return;
    }

    this.currentPurchaseAgent = agent;
    this.showInvitationModal(async (inviteCode) => {
      if (inviteCode) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          if (!accounts || accounts.length === 0) {
            throw new Error("No accounts found");
          }

          // Here you would normally:
          // 1. Verify invitation code with backend
          // 2. Process the purchase transaction
          // 3. Transfer ownership of the agent

          alert("Purchase system coming soon. This is currently a simulation.");
        } catch (error) {
          console.error("Purchase failed:", error);
          if (error.message.includes("accounts found")) {
            alert("Please connect your wallet first.");
          } else {
            alert("Purchase failed. Please try again.");
          }
        }
      }
    });
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

// Initialize the marketplace
document.addEventListener("DOMContentLoaded", () => {
  window.marketplace = new AIMarketplace();
});
