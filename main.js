function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

async function generateEmail() {
  const text = document.getElementById("mailInput").value;
  const prompt = `以下の会議内容をもとに、相手に送る日本語のビジネスメールを作成してください：\n${text}`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  document.getElementById("mailOutput").textContent =
    data.choices?.[0]?.message?.content || "エラーが発生しました。";
}

async function generateSummary() {
  const text = document.getElementById("summaryInput").value;
  const prompt = `以下の会議内容を要点を簡潔にまとめてください：\n${text}`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  document.getElementById("summaryOutput").textContent =
    data.choices?.[0]?.message?.content || "エラーが発生しました。";
}
