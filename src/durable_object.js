export class ConversationMemory {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/add" && request.method === "POST") {
      const { message } = await request.json();

      let messages = await this.state.storage.get("messages") || [];
      messages.push(message);

      await this.state.storage.put("messages", messages);
      return new Response("OK");
    }

    if (url.pathname === "/messages" && request.method === "GET") {
      const messages = await this.state.storage.get("messages") || [];
      return new Response(JSON.stringify({ messages }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Not found", { status: 404 });
  }
}

