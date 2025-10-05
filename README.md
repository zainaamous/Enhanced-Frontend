# YOUMNA AI - Executive Intelligence Assistant

A modern, clean RAG (Retrieval-Augmented Generation) application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📋 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean install (removes node_modules and reinstalls)
- `npm run setup` - Install dependencies and start dev server

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js 14 App Router pages
│   ├── page.tsx        # Main chat interface
│   ├── dashboard/      # Dashboard page
│   ├── knowledge/      # Knowledge base page
│   └── ...
├── components/         # Reusable React components
│   ├── chat/          # Chat-related components
│   ├── layout/        # Layout components
│   └── ui/           # Base UI components
└── lib/              # Utility functions
```

## 🎨 Features

- **Modern Chat Interface** - ChatGPT-like experience
- **Responsive Design** - Works on desktop and mobile
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Component Library** - Reusable UI components
- **Error Handling** - Graceful fallbacks

## 🔧 Configuration

The app is configured to run on **port 3000** by default. To change the port, modify the scripts in `package.json`.

## 📦 Dependencies

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons

## 🌐 Backend Integration

The frontend is designed to work with a RAG API backend running on `localhost:8000`. If the backend is not available, the app will show helpful error messages and continue to function.

## 🚀 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## 📝 License

Private - YOUMNA AI
