// タブ切り替え
loginTab.onclick = () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
};

signupTab.onclick = () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
};

// ログイン
loginBtn.onclick = () => {
  auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then(() => location.href = "index.html")
    .catch(e => loginMsg.textContent = e.message);
};

// 新規登録
signupBtn.onclick = () => {
  auth.createUserWithEmailAndPassword(signupEmail.value, signupPassword.value)
    .then(() => signupMsg.textContent = "アカウント作成完了")
    .catch(e => signupMsg.textContent = e.message);
};
