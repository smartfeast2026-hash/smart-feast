const adminSessionKey = "smartFeastAdminSession";
const adminUsername = "admin";
const adminPasswordHash = "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3";

async function hashValue(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getBackendDestination() {
  const next = new URLSearchParams(window.location.search).get("next");
  const allowed = ["dashboard", "databases", "innovation"];
  return allowed.includes(next) ? `./backend.html#${next}` : "./backend.html";
}

const loginForm = document.querySelector("#admin-login-form");

if (document.body.hasAttribute("data-admin-login") && sessionStorage.getItem(adminSessionKey) === "active") {
  window.location.replace(getBackendDestination());
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.querySelector("#admin-username").value.trim();
  const password = document.querySelector("#admin-password").value;
  const errorOutput = document.querySelector("#login-error");
  const submitButton = loginForm.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  submitButton.textContent = "驗證中…";
  const passwordHash = await hashValue(password);

  if (username === adminUsername && passwordHash === adminPasswordHash) {
    sessionStorage.setItem(adminSessionKey, "active");
    window.location.replace(getBackendDestination());
    return;
  }

  errorOutput.textContent = "帳號或密碼錯誤，請重新輸入。";
  submitButton.disabled = false;
  submitButton.textContent = "登入管理後台";
  document.querySelector("#admin-password").value = "";
  document.querySelector("#admin-password").focus();
});

document.querySelector("#admin-logout")?.addEventListener("click", () => {
  sessionStorage.removeItem(adminSessionKey);
  window.location.replace("./admin-login.html");
});
