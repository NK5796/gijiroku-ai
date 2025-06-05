async function generateEmail() {
  const text = document.getElementById("inputText").value;
  const prompt = `以下の会議内容をもとに、相手に送る日本語のビジネスメールを作成してください：\n${text}`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  document.getElementById("output").textContent =
    data.choices?.[0]?.message?.content || "エラーが発生しました。";
}

async function generateCalendarText() {
  const text = document.getElementById("inputText").value;
  const prompt = `以下の会議内容から、カレンダーに追加できる予定（タイトル・日時）を抽出してください。形式は「タイトル：〇〇」「日時：〇〇」の2行で記載してください。\n${text}`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  document.getElementById("output").textContent =
    data.choices?.[0]?.message?.content || "エラーが発生しました。";
}

function saveToCalendar() {
  const output = document.getElementById("output").textContent;
  const lines = output.split("\n");
  let title = "予定";
  let start = "";

  for (const line of lines) {
    if (line.includes("タイトル：")) title = line.replace("タイトル：", "").trim();
    if (line.includes("日時：")) start = line.replace("日時：", "").trim();
  }

  if (title && start) {
    const events = JSON.parse(localStorage.getItem("calendar_events") || "[]");
    events.push({ title, start });
    localStorage.setItem("calendar_events", JSON.stringify(events));
    alert("✅ カレンダーに追加しました！");
  } else {
    alert("⚠️ カレンダーに追加できる形式ではありません。");
  }
}
