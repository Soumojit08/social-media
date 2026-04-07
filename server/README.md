# SocialApp — Project README & Build Guide

> A full-stack social media app built to learn real-world engineering.  
> Stack: React + Vite · Express · PostgreSQL · Prisma · Redis · Socket.io

---

## Folder Structure

```
socialapp/
│
├── client/                         # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Images, icons, fonts
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                 # shadcn auto-generated components (don't edit)
│   │   │   ├── layout/             # Navbar, Sidebar, Footer
│   │   │   └── shared/             # Avatars, Cards used across pages
│   │   ├── pages/                  # One folder per route
│   │   │   ├── auth/               # Login, Register
│   │   │   ├── feed/               # Home feed
│   │   │   ├── profile/            # User profile
│   │   │   ├── messages/           # Chat UI
│   │   │   └── notifications/      # Notifications page
│   │   ├── hooks/                  # Custom React hooks (useAuth, useSocket, etc.)
│   │   ├── store/                  # Zustand stores (authStore, themeStore)
│   │   ├── services/               # Axios API call functions
│   │   │   ├── api.js              # Axios instance with base URL + interceptors
│   │   │   ├── authService.js
│   │   │   ├── postService.js
│   │   │   └── userService.js
│   │   ├── socket/                 # Socket.io client setup and event handlers
│   │   │   └── socket.js
│   │   ├── utils/                  # Helper functions (formatDate, truncate, etc.)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                         # Express + Node backend (MVC)
│   ├── src/
│   │   ├── config/                 # DB, Redis, environment config
│   │   │   ├── db.js               # Prisma client instance
│   │   │   ├── redis.js            # ioredis client instance
│   │   │   └── env.js              # Validated env variables
│   │   ├── controllers/            # C in MVC — handles req/res logic
│   │   │   ├── auth.controller.js
│   │   │   ├── post.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── message.controller.js
│   │   │   └── notification.controller.js
│   │   ├── models/                 # M in MVC — Prisma schema lives here conceptually
│   │   │   └── README.md           # Note: actual models are in prisma/schema.prisma
│   │   ├── routes/                 # V in MVC (routing layer) — maps URLs to controllers
│   │   │   ├── auth.routes.js
│   │   │   ├── post.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── message.routes.js
│   │   │   └── notification.routes.js
│   │   ├── middlewares/            # Auth, validation, error handling
│   │   │   ├── auth.middleware.js  # Verify JWT token
│   │   │   ├── validate.middleware.js # express-validator error handler
│   │   │   ├── cache.middleware.js # Redis cache check before controller
│   │   │   ├── upload.middleware.js # Multer config
│   │   │   └── error.middleware.js # Global error handler (last middleware)
│   │   ├── services/               # Business logic separated from controllers
│   │   │   ├── auth.service.js     # bcrypt, JWT logic
│   │   │   ├── post.service.js
│   │   │   ├── cache.service.js    # Redis get/set/invalidate helpers
│   │   │   └── socket.service.js   # Emit events from within controllers
│   │   ├── validators/             # express-validator rule chains
│   │   │   ├── auth.validator.js
│   │   │   └── post.validator.js
│   │   ├── socket/                 # Socket.io server setup
│   │   │   ├── index.js            # Init socket server + redis adapter
│   │   │   └── handlers/           # Event handlers (chat, notifications)
│   │   │       ├── chat.handler.js
│   │   │       └── notification.handler.js
│   │   └── app.js                  # Express app setup (no server.listen here)
│   ├── server.js                   # Entry point — creates HTTP server, attaches socket
│   └── package.json
│
├── prisma/                         # Prisma schema and migrations
│   ├── schema.prisma               # All your DB models (tables + relations)
│   └── migrations/                 # Auto-generated, don't edit manually
│
├── uploads/                        # Multer saves files here locally (gitignored)
├── .env                            # Root env file (gitignored)
├── .env.example                    # Committed version — no real secrets
├── .gitignore
└── pnpm-workspace.yaml             # If using pnpm workspaces
```

---

## Environment Variables

Create a `.env` file in the root. Use `.env.example` as the template.

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/socialapp

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# Client
CLIENT_URL=http://localhost:5173
```

---

## MVC Pattern — How It Works in This Project

```
Request → Route → Middleware → Controller → Service → Prisma/Redis → Response
```

- **Route** — defines the URL and HTTP method, applies middleware and validators
- **Middleware** — checks auth token, validates input, checks Redis cache
- **Controller** — receives req/res, calls the right service, sends response
- **Service** — contains all business logic (no req/res objects here)
- **Prisma** — talks to PostgreSQL
- **Redis** — caches expensive queries, stores socket sessions

> Rule: Controllers are thin. Services do the work. Keep them separated.

---

## Phase 1 — Project Setup

- [ ] Init two folders: `client/` with `pnpm create vite`, `server/` with `pnpm init`
- [ ] Install all packages listed in the tech stack (see stack document)
- [ ] Set up Prisma: `npx prisma init` inside `server/`
- [ ] Set up `.env` and `.env.example`
- [ ] Create `app.js` with basic Express setup (cors, helmet, morgan, routes placeholder)
- [ ] Create `server.js` entry point
- [ ] Connect Prisma to PostgreSQL — test with `npx prisma db push`
- [ ] Start Redis locally and test connection with `ioredis`
- [ ] Set up ESLint + Prettier on both client and server
- [ ] Git init, first commit

---

## Phase 2 — Auth

- [ ] Design `User` model in `schema.prisma` (id, username, email, password, avatar, bio, createdAt)
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Build `auth.validator.js` — validate register and login input
- [ ] Build `auth.service.js` — hash password with bcrypt, sign JWT
- [ ] Build `auth.controller.js` — register, login, logout, getMe
- [ ] Build `auth.routes.js` — POST /register, POST /login, GET /me
- [ ] Build `auth.middleware.js` — verify token on protected routes
- [ ] Test all auth routes with Postman or Insomnia
- [ ] Build React auth pages — Register, Login
- [ ] Set up Zustand `authStore` — store user + token
- [ ] Set up Axios instance with JWT header interceptor
- [ ] Protect frontend routes with a `PrivateRoute` component

---

## Phase 3 — Posts & Feed

- [ ] Design `Post` model (id, content, image?, authorId, createdAt)
- [ ] Design `Like` and `Comment` models with relations
- [ ] Run migration
- [ ] Build CRUD for posts: create, read (feed), update, delete
- [ ] Add Redis cache for feed — cache the 20 most recent posts, invalidate on new post
- [ ] Build React feed page — fetch posts with React Query
- [ ] Build create post form with react-hook-form + zod
- [ ] Build like and comment UI

---

## Phase 4 — User Profiles & Follow System

- [ ] Design `Follow` model (followerId, followingId)
- [ ] Build follow/unfollow endpoints
- [ ] Build profile page — show user posts, follower/following count
- [ ] Add Redis cache for profile data
- [ ] Build edit profile (bio, avatar upload via multer)

---

## Phase 5 — Real-time: Chat & Notifications

- [ ] Set up Socket.io server in `socket/index.js`
- [ ] Attach Redis adapter (`@socket.io/redis-adapter`)
- [ ] Authenticate socket connections using JWT middleware
- [ ] Design `Message` model (id, content, senderId, receiverId, createdAt)
- [ ] Build `chat.handler.js` — join room, send message, receive message events
- [ ] Build `notification.handler.js` — emit on like, comment, follow
- [ ] Design `Notification` model and persist to DB
- [ ] Build React chat UI with Socket.io client
- [ ] Build notifications bell with unread count

---

## Phase 6 — Polish & Deploy

- [ ] Add `express-rate-limit` to auth routes
- [ ] Add global error middleware — handle all unhandled errors cleanly
- [ ] Write at least a few unit tests (auth service, post service)
- [ ] Replace local file uploads with Cloudinary or S3
- [ ] Deploy server to Railway or Render
- [ ] Deploy client to Vercel
- [ ] Set up production environment variables
- [ ] Add PostgreSQL and Redis managed instances (Railway has both)

---

## Key Rules to Follow While Building

1. **Never put business logic in controllers.** Controllers call services. Services do the work.
2. **Never commit `.env`.** Only commit `.env.example` with placeholder values.
3. **Always validate input** before it touches your database. Use `express-validator`.
4. **Invalidate cache when data changes.** If you cache a user's feed, clear it when they post.
5. **Test every API route in Postman** before building the frontend for it.
6. **One feature at a time.** Finish auth completely before starting posts.
7. **Commit often.** After each working feature, commit with a clear message.
8. **Read Prisma error messages carefully.** They tell you exactly what's wrong.

---

## Useful Commands

```bash
# Start dev server (backend)
pnpm dev                          # runs nodemon server.js

# Start dev server (frontend)
pnpm dev                          # runs vite

# Prisma
npx prisma studio                 # visual DB browser
npx prisma migrate dev            # create and apply a new migration
npx prisma db push                # push schema without creating migration (dev only)
npx prisma generate               # regenerate the Prisma client after schema changes

# Redis (local)
redis-server                      # start Redis
redis-cli ping                    # test connection → should return PONG
```

---

## Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Socket.io Docs](https://socket.io/docs/v4)
- [ioredis GitHub](https://github.com/redis/ioredis)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://zustand-demo.pmnd.rs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [express-validator Docs](https://express-validator.github.io/docs)