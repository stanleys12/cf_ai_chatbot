const chatDiv = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

send.onclick = async () => {
  const message = input.value;
  chatDiv.innerHTML += `<p><b>You:</b> ${message}</p>`;

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  chatDiv.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
  input.value = "";
};

