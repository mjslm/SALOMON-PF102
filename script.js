const loadBtn = document.getElementById("loadBtn");
const refreshBtn = document.getElementById("refreshBtn");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const usersContainer = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");

let users = [];

// Fetch API
async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
}

// Create card
function createUserCard(user) {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Company: ${user.company.name}</p>
        <p>City: ${user.address.city}</p>
    `;

    return card;
}

// Render users
function renderUsers(list) {
    usersContainer.innerHTML = "";
    list.forEach(user => {
        usersContainer.appendChild(createUserCard(user));
    });
}

// Common loader function (for both buttons)
async function loadData(button, loadingText) {
    errorDiv.classList.add("hidden");

    loadingDiv.classList.remove("hidden");
    button.disabled = true;
    button.textContent = loadingText;

    try {
        users = await fetchUsers();
        renderUsers(users);

    } catch (error) {
        errorDiv.textContent = "Failed to load users.";
        errorDiv.classList.remove("hidden");

    } finally {
        loadingDiv.classList.add("hidden");
        button.disabled = false;
        button.textContent =
            button.id === "loadBtn" ? "Load Users" : "Refresh Users";
    }
}

// Load button
loadBtn.addEventListener("click", () => {
    loadData(loadBtn, "Loading...");
});

// Refresh button
refreshBtn.addEventListener("click", () => {
    loadData(refreshBtn, "Refreshing...");
});

// Search
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(term)
    );

    renderUsers(filtered);
});