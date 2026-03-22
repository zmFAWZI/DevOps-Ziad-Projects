# 🚀 Two-Tier Web Application — DevOps Project

A production-grade two-tier web application deployed on AWS, demonstrating core DevOps skills including Docker, CI/CD with GitHub Actions, and cloud infrastructure on EC2.

---

## 🏗️ Architecture

```
User Browser
     │
     ▼
┌─────────────────────────────────┐
│         AWS Cloud               │
│                                 │
│  ┌──────────────────────────┐   │
│  │   EC2 — Tier 1 (App)     │   │
│  │                          │   │
│  │  ┌──────────┐            │   │
│  │  │ Frontend │ :80        │   │
│  │  │  React   │            │   │
│  │  │  + Nginx │            │   │
│  │  └────┬─────┘            │   │
│  │       │ proxy /api       │   │
│  │  ┌────▼─────┐            │   │
│  │  │ Backend  │ :5000      │   │
│  │  │  Node.js │            │   │
│  │  │  Express │            │   │
│  │  └──────────┘            │   │
│  └──────────────────────────┘   │
│            │ private network    │
│            │ port 27017         │
│  ┌──────────────────────────┐   │
│  │   EC2 — Tier 2 (DB)      │   │
│  │                          │   │
│  │  ┌──────────┐            │   │
│  │  │ MongoDB  │            │   │
│  │  │ Container│            │   │
│  │  └──────────┘            │   │
│  │  ┌──────────┐            │   │
│  │  │  Docker  │            │   │
│  │  │  Volume  │            │   │
│  │  └──────────┘            │   │
│  └──────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
         ▲
         │ SSH + Deploy
         │
┌────────────────┐
│ GitHub Actions │
│   CI/CD        │
└────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS, Nginx |
| Backend | Node.js, Express.js |
| Database | MongoDB (Docker container) |
| Containerization | Docker, Docker Hub |
| CI/CD | GitHub Actions |
| Cloud | AWS EC2 (Ubuntu 22.04, t2.micro) |
| Networking | AWS Security Groups, Private VPC Network |

---

## ✅ DevOps Skills Demonstrated

### Docker
- Multi-stage Dockerfile for frontend (Node build → Nginx serve)
- Production-hardened backend Dockerfile with non-root user
- `.dockerignore` to keep images clean and small
- Custom Docker network (`appnet`) for container-to-container communication
- Docker volumes for MongoDB data persistence

### CI/CD — GitHub Actions
- Triggered automatically on push to `main` branch
- Path filter — only triggers when files inside `1-Two-Tier-WebApp/` change
- Two-stage pipeline: `build-and-push` → `deploy-to-ec2`
- Docker images tagged with both `latest` and `git SHA` for versioning
- Secrets managed via GitHub Actions Secrets (no hardcoded credentials)
- SSH deployment to EC2 using `appleboy/ssh-action`

### AWS
- Two separate EC2 instances — one per tier
- Security groups configured to restrict port 27017 to Tier 1 private IP only
- MongoDB never exposed to the internet
- Private network communication between EC2 instances

### Security
- Backend container runs as non-root user (`appuser`)
- Secrets injected at runtime via environment variables
- `.gitignore` and `.dockerignore` prevent leaking sensitive files
- MongoDB accessible only from Tier 1 private IP

### Nginx
- Serves React static files
- Proxies `/api/*` requests to the backend container
- `try_files` directive for React client-side routing

---

## 📁 Project Structure

```
1-Two-Tier-WebApp/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── backend/
│   ├── server.js               # Express API
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile              # Production-hardened, non-root user
│   └── .dockerignore
├── frontend/
│   ├── src/
│   │   └── App.jsx             # React counter app
│   ├── public/
│   ├── nginx.conf              # Nginx proxy config
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile              # Multi-stage build
│   └── .dockerignore
└── README.md
```

---

## ⚙️ CI/CD Pipeline

```

<img width="1651" height="545" alt="diagram-export-3-22-2026-2_36_20-PM" src="https://github.com/user-attachments/assets/4fe3bab6-ae5c-4d54-815d-921b7563992c" />

```

**Pipeline duration: ~1 min 20 sec** from push to live deployment.

---

## 🔐 GitHub Secrets Required

| Secret | Description |
|---|---|
| `DOCKER_HUB_USERNAME` | Docker Hub username |
| `DOCKER_HUB_ACCESS_TOKEN` | Docker Hub access token |
| `EC2_HOST` | Public IP of Tier 1 EC2 |
| `EC2_USER` | EC2 username (`ubuntu`) |
| `EC2_SSH_KEY` | Private `.pem` key content |
| `DB_PRIVATE_IP` | Private IP of Tier 2 EC2 |

---

## 🚀 How to Run Locally

1. Clone the repo:
```bash
git clone https://github.com/zmFAWZI/DevOps-Ziad-Projects.git
cd DevOps-Ziad-Projects/1-Two-Tier-WebApp
```

2. Create `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/devops_db
PORT=5000
```

3. Run MongoDB locally:
```bash
docker run -d -p 27017:27017 mongo:latest
```

4. Run backend:
```bash
cd backend && npm install && node server.js
```

5. Run frontend:
```bash
cd frontend && npm install && npm start
```

---

## 📌 Key Decisions

**Why two EC2 instances?**
Separating the app and database tiers mirrors real production architecture. The database is isolated on its own instance with restricted network access.

**Why Docker network instead of docker-compose?**
In a two-EC2 setup, docker-compose can't span multiple machines. A custom Docker network (`appnet`) on the app EC2 allows the frontend and backend containers to communicate by name.

**Why non-root user in backend Dockerfile?**
Running as root inside a container is a security risk. If the container is compromised, an attacker would have root access. A dedicated `appuser` limits the blast radius.

**Why tag images with git SHA?**
`latest` always points to the newest image, but the SHA tag gives us a traceable history — we can roll back to any previous deployment by its exact commit.
