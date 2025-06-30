# Codesoar

# 📱 Phone Number Lookup & Spam Detection API

A REST API using **Node.js**, **Express.js**, **Prisma** (or Sequelize), and **PostgreSQL**, designed to detect spam numbers and let users search contacts by name or phone.  
This project is part of a coding task submission for Codesoar.

GitHub Repo: [https://github.com/CMahitha/Codesoar](https://github.com/CMahitha/Codesoar)

---

## 🚀 Features

- User Registration & Login (JWT)
- Mark numbers as spam
- Search by name or phone
- Conditional email display
- Seed script for sample data

---

## 🔧 Installation

```bash
# 1. Clone the repo
git clone https://github.com/CMahitha/Codesoar.git
cd Codesoar

# 2. Install dependencies
npm install

# 3. Create .env file
touch .env

DATABASE_URL=postgresql://user:pass@localhost:5432/spamdb
JWT_SECRET=your_jwt_secret

# 4. Run Prisma migrations (or Sequelize equivalent)
npx prisma migrate dev --name init

# 5. (Optional) Seed sample data
npx prisma db seed

# 6. Start the server
npm run dev

```
Authorization: Bearer <your_token_here>

## 📘 API Endpoints

### 🔐 Authentication Header
All protected routes require this header:

## Output Screenshots

![Screenshot 1](./screenshots/1.png)
![Screenshot 2](./screenshots/2.png)
![Screenshot 3](./screenshots/3.png)
![Screenshot 4](./screenshots/4.png)
![Screenshot 5](./screenshots/5.png)
![Screenshot 6](./screenshots/6.png)
![Screenshot 7](./screenshots/7.png)
![Screenshot 8](./screenshots/8.png)
