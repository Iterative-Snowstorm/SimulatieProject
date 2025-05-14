document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const authSection = document.getElementById("auth-section");
  const currentUser = localStorage.getItem("currentUser");

  // if there is no login-link (e.g. pages without that header), do nothing
//   if (!loginLink || !authSection) return;

  // if logged in as a real user (not guest), swap text and inject logout
  if (currentUser && currentUser !== "guest") {
    loginLink.textContent = currentUser;
    loginLink.removeAttribute("href");
    loginLink.classList.add("user-name");

    // only add one logout button
    if (!document.getElementById("logout-btn")) {
      const btn = document.createElement("button");
      btn.id = "logout-btn";
      btn.textContent = "Uitloggen";
      btn.classList.add("logout-btn");
      btn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.reload();
      });
      authSection.appendChild(btn);
    }
  }
});