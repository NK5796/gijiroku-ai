function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

async function callAPI(prompt, outputId) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  document.getElementById(outputId).textContent =
    data.choices?.[0]?.message?.content || "エラーが発生しました。";
}

function generateEmail() {
  const text = document.getElementById("mailInput").value;
  const prompt = `以下の会議内容をもとに、相手に送る日本語のビジネスメールを作成してください：\n${text}`;
  callAPI(prompt, "mailOutput");
}

function generateSummary() {
  const text = document.getElementById("summaryInput").value;
  const prompt = `以下の会議内容を要点を簡潔にまとめてください：\n${text}`;
  callAPI(prompt, "summaryOutput");
}

function generateToDo() {
  const text = document.getElementById("todoInput").value;
  const prompt = `以下の会議内容から、やるべきタスクやToDoを箇条書きで抽出してください：\n${text}`;
  callAPI(prompt, "todoOutput");
}

function generateReport() {
  const text = document.getElementById("reportInput").value;
  const prompt = `以下の業務内容をもとに、上司に提出する日報の文章を作成してください：\n${text}`;
  callAPI(prompt, "reportOutput");
}

function generateCalendar() {
  const text = document.getElementById("calendarInput").value;
  const prompt = `以下の会議内容をもとに、Googleカレンダーに貼り付ける用の予定説明文を作成してください。目的・参加者・概要などを含めて：\n${text}`;
  callAPI(prompt, "calendarOutput");
}
