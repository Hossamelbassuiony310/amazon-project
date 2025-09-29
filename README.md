# 🛒 Amazon Project (HTML, CSS, JS)

This project is a simple **Amazon-like frontend** built using **HTML, CSS, and JavaScript**.  
I customized the HTML and CSS to work smoothly with my JavaScript code.

The project is fully **containerized with Docker + Docker Compose** so you can run it anywhere easily.

---

## 🚀 Features
- Pure **HTML, CSS, and JavaScript** (no backend).
- Clean URLs using **Nginx**:
  - `/amazon` → `amazon.html`
- Ready-to-use with Docker.

---

## 📦 Run with Docker

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Hossamelbassuiony310/amazon-project.git
cd amazon-project
```

### 2️⃣ Run with Docker Compose
```bash
docker compose -f docker-compose.yml up -d --build
```

### 3️⃣ Access the app
Open your browser at:
- http://localhost:8090/  →  redirects to /amazon

## 🛠 Run without Docker (manual way)
If you don’t want to use Docker, you can run a simple HTTP server:
```bash
# Using Python
python3 -m http.server 8090
```
Then open: http://localhost:8090/amazon.html


 ## # 📂 Project Main Structure
```bach
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── html/
│ ├── amazon.html
│ ├── checkout.html
│ ├── orders.html
│ ├── tracking.html
│ ├── data/
│ ├── images/
│ ├── scripts/
│ └── styles/
```

## 🐳 Docker Info

Base image: nginx:alpine

Static files served from /usr/share/nginx/html

Custom Nginx config handles clean routes.
