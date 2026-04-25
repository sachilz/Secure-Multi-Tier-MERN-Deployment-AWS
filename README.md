# 🚀 Secure Multi-Tier MERN Deployment: AWS VPC Networking & Docker Orchestration

![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## 📌 Project Overview
This project is a production-grade deployment of a **MERN Stack TODO Application**. It features a highly secure **AWS VPC Architecture**, containerized delivery with **Docker**, and a robust **DevSecOps pipeline**.

The goal was to move beyond simple deployment and focus on **security**, **network isolation**, and **infrastructure efficiency**.

---

## 🏗️ Architecture Design
![Architecture Diagram](./asset/1.gif)
The infrastructure is built on AWS with a security-first mindset:

* **Custom VPC:** Separated into **Public** and **Private** subnets.
* **Public Subnet:** Hosts the **Nginx Reverse Proxy** and the React frontend.
* **Private Subnet:** Isolates the **Backend API**, making it unreachable from the public internet for maximum security.
* **NAT Gateway:** Allows private instances to securely fetch updates from the internet.
* **Internet Gateway (IGW):** Manages external traffic to the frontend.

---

## 🛡️ DevSecOps & Security Integration
I integrated the following tools to ensure the application is secure from code to container:

1.  **Gitleaks:** Scans the repo to prevent sensitive secrets or API keys from being leaked.
2.  **SonarQube:** Performs static code analysis to maintain high code quality and find bugs.
3.  **Trivy:** Scans Docker images and the filesystem for known vulnerabilities before deployment.

---

## 🐳 Container Optimization
I used **Multi-Stage Docker Builds** to optimize the application's footprint:
* **Result:** Reduced the Frontend image size by **60-70%**.
* **Benefit:** Faster deployment times, lower storage costs, and a smaller attack surface.

---

## 🛠️ Tech Stack
* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Infrastructure:** AWS (EC2, VPC, NAT Gateway, IGW)
* **Reverse Proxy:** Nginx
* **Containerization:** Docker, Docker Compose
* **Security Tools:** Gitleaks, SonarQube, Trivy

---

## Deployment Workflow ☁️
![flow](./asset/2.gif)

---

## Security Highlights 🔐
- Early-stage secret detection using Gitleaks
- Static code analysis with SonarQube
- Container linting using Hadolint
- Vulnerability scanning using Trivy (base + final images)
- Private subnet isolation for backend services
- Controlled traffic via Security Groups

---

## Challenges & Learnings 💥
### 1. Backend Connectivity Issues
- Fixed Docker networking and service communication
- Ensured backend binds to 0.0.0.0

### 2. Nginx Configuration Errors
- Debugged reverse proxy issues
- Fixed routing and syntax errors

### 3. Container Communication
- Learned Docker service discovery
- Used proper internal networking instead of IPs

### 4. Cloud Networking
- Understood VPC, subnets, IGW, and NAT Gateway behavior
---
## 🚀 How to Run Locally
### 1. Clone the repository
```bash
git clone https://github.com/sachilz/Secure-Multi-Tier-MERN-Deployment-AWS.git
cd Secure-Multi-Tier-MERN-Deployment-AWS
```
### 2. Set up Environment Variables
Create a .env file in the backend directory and add your MongoDB URI
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Run with Docker Compose
```bash
docker-compose up --build -d
```
Application will be available at http://localhost

---

## Conclusion 📌
This project demonstrates how a simple MERN application can be transformed into a secure, automated, and production-inspired deployment pipeline using modern DevOps and cloud practices.

---

## Support ⭐
### If you found this project useful:
⭐ Star the repo
🔁 Share with others
💬 Connect with me on LinkedIn

---

## Author 👤
Sachintha Dilshan <br>
LinkedIn: https://www.linkedin.com/in/sachilz/
