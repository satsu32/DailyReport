const GAS_URL = "【あなたのGAS WebアプリURL】";

// ログイン状態チェック
auth.onAuthStateChanged(async user => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  const idToken = await user.getIdToken();
  window.currentUser = { user, idToken };

  const userInfo = document.getElementById("userInfo");
  if (userInfo) userInfo.textContent = `ログイン中：${user.email}`;
});

// 日報送信
if (document.getElementById("submitBtn")) {
  submitBtn.onclick = async () => {
    const fd = new FormData();
    fd.append("mode", "nippo");
    fd.append("idToken", window.currentUser.idToken);
    fd.append("task", task.value);
    fd.append("hours", hours.value);
    if (photo.files[0]) fd.append("photo", photo.files[0]);

    const res = await fetch(GAS_URL, { method: "POST", body: fd });
    result.textContent = await res.text();
  };
}

// 日報一覧取得
if (document.getElementById("tbody")) {
  auth.onAuthStateChanged(async user => {
    if (!user) return;
    const idToken = await user.getIdToken();

    const res = await fetch(`${GAS_URL}?mode=list&idToken=${idToken}`);
    const rows = await res.json();

    tbody.innerHTML = "";
    rows.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.timestamp}</td>
        <td>${r.task}</td>
        <td>${r.hours}</td>
        <td>${r.photoUrl ? `<a href="${r.photoUrl}" target="_blank">見る</a>` : ""}</td>
      `;
      tbody.appendChild(tr);
    });
  });
}
