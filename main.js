async function generateEmail() {
  const text = document.getElementById("inputText").value;
  const prompt = `以下の会議内容をもとに、相手に送る日本語のビジネスメールを作成してください：\n${text}`;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    document.getElementById("output").textContent =
      data.choices?.[0]?.message?.content || "エラーが発生しました。";
  } catch (error) {
    document.getElementById("output").textContent = "通信エラーが発生しました。";
  }
}
