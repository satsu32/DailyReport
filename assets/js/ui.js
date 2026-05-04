// ログアウト
if (document.getElementById("logoutBtn")) {
  logoutBtn.onclick = () => auth.signOut().then(() => location.href = "login.html");
}
