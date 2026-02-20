# Test workflow and production switch

## Test workflow (without AWS)

1. Backend:
	- Run `python app.py` in the task-api folder.
	- The `/s3/presign` endpoint returns a test link.
2. Frontend:
	- Start the React app (`npm start` in task-frontend).
	- In the Dashboard, select a file and click Upload.
	- If the backend returns a test link, you will see the message: "Test mode: backend returned a test link. Upload to S3 was not performed."
3. You can test the entire upload logic without AWS.

## Switch to production
- In task-api/s3_presign.py set `TEST_MODE = False` and provide real AWS credentials.
- The frontend will upload files to S3.

---
Project ready for testing!
# ⚛️ SecureTask React Frontend

Modern React frontend for task management with JWT authentication.

## 🚀 Features

- **User Authentication**: Login/Register with JWT tokens
- **Task Management**: Create, view, and delete tasks
- **Real-time Updates**: Instant UI updates
- **Responsive Design**: Works on desktop and mobile
- **Secure**: Token-based authentication with localStorage

## 🛠️ Tech Stack

- **Frontend**: React 18
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Styling**: Custom CSS with gradients
- **State Management**: React Hooks (useState, useEffect)

## ⚙️ Installation

1. Clone repository:
```bash
git clone https://github.com/NSPCdigital/task-frontend.git
cd task-frontend
Install dependencies:
Bash

npm install
Make sure backend API is running on port 5000

Start development server:

Bash

npm start
Open browser: http://localhost:3000
🔌 Backend
This frontend connects to: SecureTask API

Make sure backend is running before starting frontend.

📸 Features
Login/Register screens
Dashboard with task list
Add new tasks
Delete tasks
Statistics panel

👨‍💻 Author
NSPC Digital

GitHub: @NSPCdigital
Website: nspcdigital.pl
Built with ❤️ using React and modern web technologies.