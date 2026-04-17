const loadBtn = document.getElementById("loadBtn");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const usersContainer = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");

let users = [];

// Fetch users from API
async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
}

// Create user card
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

// Load button click
loadBtn.addEventListener("click", async () => {
    errorDiv.classList.add("hidden");

    loadingDiv.classList.remove("hidden");
    loadBtn.disabled = true;
    loadBtn.textContent = "Loading...";

    try {
        users = await fetchUsers();
        renderUsers(users);

    } catch (error) {
        errorDiv.textContent = "Failed to load users.";
        errorDiv.classList.remove("hidden");

    } finally {
        loadingDiv.classList.add("hidden");
        loadBtn.disabled = false;
        loadBtn.textContent = "Load Users";
    }
});

// Search feature
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(term)
    );

    renderUsers(filtered);
});