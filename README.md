# 📋 Task Manager App

A modern, feature-rich task management application built with React and TypeScript. Organize your tasks with categories, priorities, and due dates in a beautiful, responsive interface.

## 🚀 Live Demo

**[Try the Task Manager App Live](https://alperdog.github.io/task-manager-app)**

## ✨ Features

- **Task Management**: Create, edit, complete, and delete tasks
- **Categories**: Organize tasks by categories (Work, Personal, Shopping, etc.)
- **Priority Levels**: Set high, medium, or low priority for tasks
- **Due Dates**: Add due dates with visual indicators
- **Local Storage**: Tasks persist between browser sessions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes with modern dark interface
- **Search & Filter**: Find tasks quickly with search and filter options
- **Statistics**: View task completion statistics and progress

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Bootstrap 5** - Responsive UI components
- **LocalStorage** - Data persistence
- **CSS3** - Custom styling and animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AlperDog/task-manager-app.git
   cd task-manager-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Deployment

The app is automatically deployed to GitHub Pages:

```bash
npm run deploy
```

## 🎯 How to Use

### Adding Tasks

1. **Basic Task**: Type in the input field and press Enter or click Add
2. **Detailed Task**: Click "Add Task" button to open the detailed form
3. **Set Category**: Choose from predefined categories or create custom ones
4. **Set Priority**: Mark tasks as High, Medium, or Low priority
5. **Set Due Date**: Add a due date for time-sensitive tasks

### Managing Tasks

- **Complete**: Click the checkbox or task text to mark as complete
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the trash icon to remove tasks
- **Filter**: Use the filter dropdown to view specific categories
- **Search**: Use the search bar to find specific tasks

### Categories

- **Work**: Professional tasks and projects
- **Personal**: Personal goals and activities
- **Shopping**: Shopping lists and errands
- **Health**: Fitness and wellness tasks
- **Custom**: Create your own categories

## 📊 Features in Detail

### Task Properties

- **Title**: Task description
- **Category**: Task organization
- **Priority**: Importance level (High/Medium/Low)
- **Due Date**: Optional deadline
- **Completed**: Completion status
- **Created Date**: Automatic timestamp

### Data Persistence

- **LocalStorage**: Tasks saved automatically
- **No Account Required**: Works offline
- **Cross-Session**: Data persists between browser sessions

### User Interface

- **Dark Theme**: Modern, eye-friendly design
- **Responsive Layout**: Adapts to all screen sizes
- **Smooth Animations**: Professional transitions
- **Intuitive Controls**: Easy-to-use interface

## 🔧 Technical Implementation

### React Hooks Used

- `useState` - Manage task data and UI state
- `useEffect` - Handle localStorage operations
- `useCallback` - Optimize performance

### Data Structure

```typescript
interface Task {
  id: number;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}
```

### LocalStorage Management

- **Automatic Saving**: Tasks saved on every change
- **Data Validation**: Ensures data integrity
- **Error Handling**: Graceful fallbacks

### Code Structure

```
src/
├── components/
│   ├── TaskManager.tsx     # Main task manager component
│   ├── TaskForm.tsx        # Task creation/editing form
│   ├── TaskList.tsx        # Task display component
│   └── TaskStats.tsx       # Statistics component
├── App.tsx                 # Root component
├── App.css                 # Global styles
└── index.tsx               # Entry point
```

## 🎨 Customization

### Styling

The app uses a dark theme with purple accents (`#aa00ff`). You can customize:

- Colors in `App.css`
- Task card styles
- Button appearances
- Layout spacing

### Adding Features

Easy to extend with:

- User accounts and cloud sync
- Task sharing and collaboration
- Reminder notifications
- Export/import functionality
- Multiple task lists

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Alper Doğramacı**

- GitHub: [@AlperDog](https://github.com/AlperDog)
- Portfolio: [https://alperdog.github.io/portfolio](https://alperdog.github.io/portfolio)

---

**Built with ❤️ by Alper Doğramacı**
