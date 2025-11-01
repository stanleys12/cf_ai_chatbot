# Cloudflare AI Chatbot

## Description
This is a Cloudflare AI-powered chatbot that remembers conversation history using Durable Objects and responds using Llama 3.3 on Workers AI.

## How to Run
1. Clone the repository.
2. Install Wrangler CLI and login: `npm install -g wrangler && wrangler login`.
3. Configure `wrangler.toml` with your Cloudflare account and LLM API.
4. Deploy: `wrangler publish`.
5. Open the frontend in browser via Pages or Worker URL.

## Features
- Chat via text input
- Memory persists across sessions
- Powered by LLM (Llama 3.3)
- Durable Object stores conversation state

