# Todoist Application
> A full-stack todo application built with modern web technologies.

## 📋 Features
* ✅ Create, read, update, and delete todo items
* 🔄 Mark todos as completed
* 📱 Responsive design
* ⚡ Real-time updates
* 💾 Persistent storage with PostgreSQL

## 🛠 Tech Stack

### Frontend
* 🅰️ Angular 19
* 📝 TypeScript
* 🎨 SCSS
* 🎯 Angular Material
* 🔄 NgRx Component Store

### Backend
* 🟢 Node.js
* 🚀 Express
* 📝 TypeScript
* 🗃️ TypeORM
* 🐘 PostgreSQL

## 📁 Project Structure

```text
todoist/
├── frontend/             # Angular frontend application
│   ├── src/              # Source files
│   ├── Dockerfile        # Frontend container config
│   └── package.json      # Frontend dependencies
├── backend/              # Node.js backend API
│   ├── src/              # Source files
│   ├── Dockerfile        # Backend container config
│   └── package.json      # Backend dependencies
├── docker-compose.yml    # Docker services config
└── README.md             # Documentation
```

## 🚀 Setup
### ***Prerequisites***
* Docker Desktop
* Node.js v18.x
* npm v9.x
* Git

### ***Installation***
#### Clone repository
```
git clone https://github.com/billychl1/todoist.git
cd todoist
```

#### Start with Docker
```
docker compose up --build
```

#### Access URLs
* Frontend: http://localhost:4200
* Backend API: http://localhost:3000
* Database: localhost:5432

#### API Endpoints
* GET    /api/todos     # **List todos**
* GET    /api/todos/:id # **Get single todo**
* POST   /api/todos     # **Create todo**
* PUT    /api/todos/:id # **Update todo**
* DELETE /api/todos/:id # **Delete todo**
* PUT    /api/todos/:id # **Update todo**

## 🧪 Testing
### Frontend
```
cd frontend
npm test
```

### Backend
```
cd backend
npm test
```

## 🎯 Next Steps
* **Authentication**: Add JWT or OAuth for user authentication.
* **API Rate Limiting**: Implement rate-limiting to avoid overloading the server.
* **Error Handling**: Enhance error handling across both frontend and backend.
* **Pagination/Infinite Scroll**: O*ptimize frontend to handle large lists of todos efficiently.
* **Unit & E2E Testing**: Write more comprehensive tests, especially for critical logic.

## 🌟 Future Features
* **Todo Prioritization**: Allow users to prioritize their tasks (low, medium, high).
* **Due Dates & Reminders**: Add functionality for setting due dates with reminder notifications.
* **Drag-and-Drop Task Management**: Implement drag-and-drop functionality for task reordering.
* **Sharing/Collaboration**: Let users share and collaborate on specific tasks.