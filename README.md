# 🛒 Amazon Project (HTML, CSS, JS)

This project is a simple **Amazon-like frontend** built using **HTML, CSS, and JavaScript**.  
I customized the HTML and CSS to work smoothly with my JavaScript code.

It’s a **practice project** to enhance core JS skills and demonstrates:

- Dynamic product rendering  
- Shopping cart functionality (add/remove items)  
- Price calculation  
- Checkout logic

The project is fully **containerized with Docker + Docker Compose**, so you can run it anywhere easily.

---

## 🚀 Features

- Pure **HTML, CSS, and JavaScript** (no backend)  
- Dynamic product rendering from JavaScript  
- **Shopping cart** functionality:
  - Add/remove items
  - Price calculation
  - Checkout logic
- Clean URLs using **Nginx**:
  - `/amazon` → `amazon.html`
- Fully containerized with **Docker** for easy deployment


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

---

# ✨ About the Author

👨‍💻 **Hossam El Bassuiony**  
*DevOps Engineer | Passionate about Web Development & Backend*  
📍 Egypt

---

💡 **About Me**  
I’m a DevOps Engineer with hands-on experience in cloud platforms, CI/CD, and infrastructure automation. I’m also passionate about learning **web development** and **backend engineering**, constantly exploring new tools and technologies to build scalable and efficient systems.

---

📫 **Reach me at:**  
- 📧 Email: [hossambesso7@gmail.com](mailto:hossambesso7@gmail.com)  
- 🔗 LinkedIn: [Hossam El Bassuiony](https://www.linkedin.com/in/hossam-el-bassuiony-43b72622a/)  
- 💻 GitHub: [Hossamelbassuiony310](https://github.com/Hossamelbassuiony310)  
