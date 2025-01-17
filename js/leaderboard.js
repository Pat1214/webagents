document.addEventListener("DOMContentLoaded", () => {
  const leaderboardData = [
    {
      place: 4,
      username: "F5sc...se31f",
      points: 198,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=1",
    },
    {
      place: 5,
      username: "Gce5...sCni9",
      points: 161,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=2",
    },
    {
      place: 6,
      username: "5M2E...gU4HY",
      points: 150,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=3",
    },
    {
      place: 7,
      username: "@QalbeHabib313",
      points: 130,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=4",
    },
    {
      place: 8,
      username: "@byloom",
      points: 120,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=5",
    },
    {
      place: 9,
      username: "EKVr...kP98v",
      points: 110,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=6",
    },
    {
      place: 10,
      username: "MFCu...HP8w7",
      points: 100,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=7",
    },
    {
      place: 11,
      username: "H4h5...BpNuJ",
      points: 100,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=8",
    },
  ];

  const leaderboardList = document.getElementById("leaderboardList");

  leaderboardData.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div class="place">
        <span class="place-icon">🏆</span>
        ${entry.place}
      </div>
      <div class="username">
        <img src="${entry.avatar}" alt="${entry.username}" class="user-avatar">
        ${entry.username}
      </div>
      <div class="points">${entry.points}</div>
    `;
    leaderboardList.appendChild(row);
  });
});
