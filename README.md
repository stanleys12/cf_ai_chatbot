# Cloudflare AI Chatbot

### Project Description

This is a self-contained, single-file AI chatbot application built using **Cloudflare Workers**. It leverages a **Durable Object (DO)** for conversation memory. The entire application, including the HTML, CSS, and JavaScript frontend, is embedded directly within the Worker's `fetch` handler.

This version currently implements an **Echo Response** (`Echo: [user message]`) to demonstrate data flow and Durable Object usage, but it is structured for easy integration with the Workers AI (LLM) binding.

***


## Prerequisites

Before you begin, ensure you have the following installed and configured:

* **Node.js** (version 18 or higher)
* **npm** or **yarn**
* **Cloudflare Wrangler CLI** (`npm install -g wrangler`)
* A **Cloudflare Account** (required for deployment).

***


## Local Development Setup

Follow these steps to run the self-contained Worker locally using `wrangler dev`.

### 1. Project Structure

This project uses a minimal structure where the frontend is embedded in `worker.js`:

### 2. Start the Local Server

Run the Worker locally. `wrangler dev` will start the Worker and simulate the Durable Object binding.

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

