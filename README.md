Lizard Interactive – All-in-One Marketing & Dev Hub

📌 Table of Contents
<details> <summary>Click to expand</summary>

Project Overview / Vision

Purpose / Goals

Architecture

Tech Stack

Features

Project Structure

Setup & Run Locally

Adding Content / Blog Posts

Deployment

Notes for Developers

Links

</details>
Project Overview / Vision

Lizard Interactive is a modern, modular web platform designed to:

Showcase services from RonDevSolutions

Share developer tips, tutorials, and tech news

Engage clients with dynamic content and social media sharing

Provide a single hub for marketing, education, and client pitching

It leverages dynamic API-driven content, Cloudinary for media, and Upstash Redis for comments, while the RonDevServer handles backend logic, analytics, and integrations.

Purpose / Goals

Dynamic Blog Content: API-driven text, images, and tips

Tech News & Tutorials: Keep developers and clients updated

Service Showcase: Highlight offerings with engaging content

Social Media Ready: Shareable posts for organic marketing

Scalable Architecture: Frontend and backend are decoupled for flexibility

Architecture
          ┌─────────────────────────────┐
          │      Frontend (Next.js)      │
          │-----------------------------│
          │ - Blog Pages                │
          │ - Tips / Tutorials          │
          │ - Tech News Feed            │
          │ - Service Showcase          │
          └───────────┬─────────────────┘
                      │ API Requests (REST / GraphQL)
                      │
          ┌───────────▼───────────┐
          │      RonDevServer      │
          │-----------------------│
          │ - Blog API             │
          │ - Tips / Snippets API  │
          │ - News Aggregation API │
          │ - Service Forms API    │
          │ - Analytics & Logs     │
          └───────┬───────────────┘
                  │
   ┌──────────────┴───────────────┐
   │       External Services       │
   │-------------------------------│
   │ - Cloudinary (images, media) │
   │ - Upstash Redis (comments)   │
   │ - Optional Supabase (auth,   │
   │   analytics, dashboards)     │
   └──────────────────────────────┘


Flow:

Next.js frontend fetches content via APIs from RonDevServer.

RonDevServer aggregates content from Cloudinary, Upstash Redis, Supabase and MongoDB.

Frontend renders dynamic content, images, and comments.

Tech Stack
Layer	Technology
Frontend	Next.js
Styling	TailwindCSS
Blog / Content	Markdown / MDX / API-driven
Comments	Upstash Redis (serverless)
Media	Cloudinary (CDN + optimizations)
Auth / Optional	Auth0 / Supabase
Wab Content / MongoDB
Backend / API	RonDevServer (Node.js / NestJS)
Deployment	Vercel
Features
<details> <summary>Click to expand</summary>
Feature	Description
Dynamic Blog / Articles	API-driven text and images
Comment System	Serverless Upstash Redis; optional Auth0 moderation
Cloudinary Media	Optimized delivery and transformations
Tech Tips / JS Snippets	API-powered dynamic content
Curated News Feed	Aggregated via external APIs
Service Showcase	Highlight offerings with dynamic content
Social Share	LinkedIn, Twitter, etc.
Analytics	Engagement tracking via RonDevServer or Supabase
</details>
Project Structure
lizardinteractiveonline/
├── components/              # Reusable UI components
├── hooks/                   # Custom React hooks for API fetching
├── interfaces/              # TypeScript types/interfaces
├── lib/                     # Helpers (API clients, Redis utils, Cloudinary)
├── pages/                   # Next.js pages (blog, tips, services)
├── public/                  # Static assets fallback
├── _posts/                  # Optional Markdown fallback posts
├── .env.development.local   # Local env variables
├── .env.production.local    # Production env variables
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md

Setup & Run Locally

Clone Repo:

git clone https://github.com/ron-thecertifiedbomb/lizardinteractiveonline.git
cd lizardinteractiveonline


Install Dependencies:

npm install
# or
yarn install


Configure Environment Variables:

cp .env.local.example .env.development.local


Upstash Redis

REDIS_URL=your_upstash_redis_url


Cloudinary

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Optional: Auth0

NEXT_PUBLIC_AUTH0_DOMAIN=your-domain.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your_auth0_client_id
NEXT_PUBLIC_AUTH0_ADMIN_EMAIL=admin@domain.com


Run Dev Server:

npm run dev


Open http://localhost:3000

Adding Content / Blog Posts

Create .md or API-driven posts:

---
title: "Tailwind Color Guide 2025"
date: "2025-11-12"
author: "Ronan Sibunga"
excerpt: "A quick guide to Tailwind utilities and palettes."
coverImage: "https://res.cloudinary.com/your_cloud_name/image/upload/tailwind-colors.png"
---

TailwindCSS offers a flexible color system. Here’s how to use it effectively...


Dynamic API content will override static Markdown automatically.

Deployment

Push to GitHub.

Import to Vercel
.

Add environment variables in Vercel matching .env.production.local.

Deploy — live at https://www.lizardinteractive.online

Notes for Developers

Dynamic content ensures instant updates without redeploying.

Cloudinary optimizes all media for performance.

Upstash Redis is serverless, fast, and low-maintenance for comments.

RonDevServer provides full backend control for APIs, analytics, and integrations.

Modular and headless architecture ensures scalable, future-proof growth.

Links

Live Site: https://www.lizardinteractive.online

Portfolio : https://ronansibunga.vercel.app