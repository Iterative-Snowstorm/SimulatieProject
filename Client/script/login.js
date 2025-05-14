document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim().toLowerCase();
  if (!email) {
    return alert("Vul je e‑mail in!");
  }
  localStorage.setItem("currentUser", email);
  window.location.href = "index.html";
});

document.getElementById("guest-login").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("currentUser", "guest");
  window.location.href = "index.html";
});