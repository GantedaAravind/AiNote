### 📝 **Note-Taking Web App**

Welcome to the **Note-Taking Web App**! 🚀 This is a **full-stack** application built using **React.js, Next.js, MongoDB, and Express.js**. It allows users to create, edit, delete, and search for notes with **text and voice-to-text transcription** using the **Web Speech API**. 🗣️

---

## 🔥 **Features**

✅ **User Authentication** (JWT-based Sign-up/Login)  
✅ **Create Notes** with **Text Input** & **Audio Recording** 🎤  
✅ **Voice-to-Text** using the **Web Speech API** 🗣️  
✅ **Upload Multiple Images** to Notes 🖼️  
✅ **Search Notes** in Real-Time 🔍  
✅ **Edit, Rename, & Delete Notes** ✏️❌  
✅ **Mark Notes as Favorite** ⭐  
✅ **Copy Notes to Clipboard** 📋  
✅ **Mobile & Desktop Responsive UI** 📱💻

---

## ⚙️ **Tech Stack**

| **Technology**           | **Purpose**       |
| ------------------------ | ----------------- |
| **React.js / Next.js**   | Frontend UI 🌐    |
| **Tailwind CSS**         | UI Styling 🎨     |
| **MongoDB & Mongoose**   | Database 🛢️       |
| **Node.js & Express.js** | Backend API 🚀    |
| **JWT (JSON Web Token)** | Authentication 🔐 |
| **Web Speech API**       | Voice-to-Text 🎙️  |
| **Multer**               | Image Upload 🖼️   |

---

## 🚀 **Getting Started**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/yourusername/note-taking-app.git
cd note-taking-app
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **4️⃣ Start the Server**

```sh
npm start
```

Your app will be live at: **`http://localhost:5000`** 🎉

---

## 🔑 **API Routes**

### **🔐 Authentication Routes**

- `POST /api/auth/signup` ➝ Register a new user
- `POST /api/auth/login` ➝ Log in and get a JWT token
- `POST /api/auth/logout` ➝ Log out the user
- `GET /user/me` ➝ Get information of the logged-in user

### **📝 Notes Routes**

- `POST /note/createNote` ➝ Create a new note (alternative route for note creation)
- `PUT /note/updateNote/:id` ➝ Update an existing note by ID (alternative route for updating notes)
- `DELETE /note/deleteNote/:id` ➝ Delete a specific note by ID (alternative route for deleting notes)
- `GET /note` ➝ Get all notes of the logged-in user

## 🛠️ **Project Structure**

```
📂 note-taking-app
 ┣ 📂 backend
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┗ 📜 server.js
 ┣ 📂 frontend
 ┃ ┣ 📂 components
 ┃ ┣ 📂 pages
 ┃ ┗ 📜 App.js
 ┣ 📜 .env
 ┣ 📜 package.json
 ┣ 📜 README.md
```

---

## 🎯 **Future Enhancements**

✨ Add Categories for Notes 📂  
✨ Implement Dark Mode 🌙  
✨ Add Share Note Feature 📤  
✨ Allow Collaboration on Notes 👥

---

## 📜 **License**

This project is **open-source** and available under the **MIT License**.

🚀 Happy Coding & Note-Taking! ✨
