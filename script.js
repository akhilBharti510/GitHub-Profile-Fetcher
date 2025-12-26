const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const profile = document.getElementById("profile");
const error = document.getElementById("error");

let debounceTimer;
let activeIndex = -1;
const cache = {};

document.addEventListener("click", (e) => {
  if (!e.target.closest(".container")) {
    suggestions.innerHTML = "";
  }
});

input.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  const query = input.value.trim();

  if (!query) {
    suggestions.innerHTML = "";
    return;
  }

  debounceTimer = setTimeout(() => {
    searchUsers(query);
  }, 400);
});

input.addEventListener("keydown", (e) => {
  const items = suggestions.querySelectorAll("li");

  if (e.key === "ArrowDown") {
    activeIndex = (activeIndex + 1) % items.length;
  } else if (e.key === "ArrowUp") {
    activeIndex = (activeIndex - 1 + items.length) % items.length;
  } else if (e.key === "Enter" && activeIndex >= 0) {
    items[activeIndex].click();
  }

  items.forEach((item, i) =>
    item.classList.toggle("active", i === activeIndex)
  );
});

async function searchUsers(query) {
  error.textContent = "";
  activeIndex = -1;

  if (cache[query]) {
    showSuggestions(cache[query], query);
    return;
  }

  try {
    const res = await fetch(
      `https://api.github.com/search/users?q=${query}&per_page=5`
    );

    if (res.status === 403) {
      throw new Error("API rate limit exceeded");
    }

    const data = await res.json();
    cache[query] = data.items;
    showSuggestions(data.items, query);
  } catch (err) {
    error.textContent = err.message;
  }
}

function showSuggestions(users, query) {
  suggestions.innerHTML = "";

  if (!users.length) {
    suggestions.innerHTML = "<li>No users found</li>";
    return;
  }

  users.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = highlightMatch(user.login, query);

    li.addEventListener("click", () => {
      suggestions.innerHTML = "";
      input.value = user.login;
      fetchProfile(user.login);
    });

    suggestions.appendChild(li);
  });
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, "ig");
  return text.replace(regex, "<mark>$1</mark>");
}

async function fetchProfile(username) {
  error.textContent = "";
  profile.style.display = "block";
  profile.innerHTML = "<p>Loading profile...</p>";

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("User not found");

    const user = await res.json();
    renderProfile(user);
  } catch (err) {
    profile.style.display = "none";
    error.textContent = err.message;
  }
}

function renderProfile(user) {
  profile.innerHTML = `
    <img src="${user.avatar_url}" />
    <h2>${user.name || "No Name Available"}</h2>
    <p>@${user.login}</p>
    <p>${user.bio || "No bio available"}</p>

    <div class="stats">
      <span>👥 ${user.followers}</span>
      <span>➡️ ${user.following}</span>
      <span>📦 ${user.public_repos}</span>
    </div>

    <a href="${user.html_url}" target="_blank">
      View GitHub Profile
    </a>
  `;
}
