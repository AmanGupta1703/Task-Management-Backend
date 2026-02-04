# TaskMaster - Backend (API)

This is the "brain" of the application. It handles the database, security, and all the logic for users and tasks.

## 🌟 What it Does

- **Secure Accounts:** It hashes passwords so they stay safe in the database.
- **Task Memory:** It remembers all the tasks you've created.
- **Privacy:** It uses "Cookies" to make sure only you can see your specific tasks.
- **Validation:** It ensures that every task has a title and a description before saving it.

## 🛠️ Built With

- **Node.js & Express:** The foundation of the server.
- **MongoDB:** The database where everything is stored.
- **JWT & Cookies:** Used to keep users logged in securely.

## 🚀 How to Run It

1. Open your terminal in the `backend` folder.
2. Install the necessary files:
   ```bash
   npm install
   ```
3. Create a .env file
4. Start the server:
   ```bash
   npm run dev
   ```
