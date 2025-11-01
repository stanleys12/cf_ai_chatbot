import { ConversationMemory } from "./durable_object.js";

export { ConversationMemory };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve frontend (for local testing only)
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cloudflare AI Chatbot</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; }
    #chat { border: 1px solid #ccc; padding: 10px; height: 400px; overflow-y: auto; }
    .user { color: blue; }
    .ai { color: green; }
    input[type="text"] { width: 80%; padding: 8px; }
    button { padding: 8px; }
  </style>
</head>
<body>
  <h1>Cloudflare AI Chatbot</h1>
  <div id="chat"></div>
  <input type="text" id="messageInput" placeholder="Type a message...">
  <button id="sendBtn">Send</button>
  <script>
    const chatDiv = document.getElementById("chat");
    const input = document.getElementById("messageInput");
    const button = document.getElementById("sendBtn");

    async function loadMessages() {
      const res = await fetch("/messages");
      const data = await res.json();
      chatDiv.innerHTML = "";
      data.messages.forEach((msg, i) => {
        const div = document.createElement("div");
        div.textContent = msg;
        div.className = i % 2 === 0 ? "user" : "ai";
        chatDiv.appendChild(div);
      });
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }

    async function sendMessage() {
      const message = input.value.trim();
      if (!message) return;
      await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      input.value = "";
      await loadMessages();
    }

    button.addEventListener("click", sendMessage);
    input.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

    loadMessages();
  </script>
</body>
</html>`;
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      const body = await request.json();
      const userMessage = body.message;

      const aiResponse = { output_text: `Echo: ${userMessage}` };

      const id = env.CONVERSATION_MEMORY.idFromName("global");
      const obj = env.CONVERSATION_MEMORY.get(id);
      await obj.fetch(new Request("https://dummy/add", {
        method: "POST",
        body: JSON.stringify({ message: userMessage })
      }));
      await obj.fetch(new Request("https://dummy/add", {
        method: "POST",
        body: JSON.stringify({ message: aiResponse.output_text })
      }));

      return new Response(JSON.stringify({ reply: aiResponse.output_text }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/messages" && request.method === "GET") {
      const id = env.CONVERSATION_MEMORY.idFromName("global");
      const obj = env.CONVERSATION_MEMORY.get(id);
      return obj.fetch(new Request("https://dummy/messages", { method: "GET" }));
    }

    return new Response("Not found", { status: 404 });
  }
};

