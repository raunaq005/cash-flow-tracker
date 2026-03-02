# Cash Flow Tracker - Complete Installation Guide

## Overview
A complete React + Firebase + Google Drive API expense tracker web and mobile app with dark mode, bill uploads, and category management.

## Quick Start (5 Minutes)

### 1. Clone Repository
```bash
git clone https://github.com/raunaq005/cash-flow-tracker.git
cd cash-flow-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Firebase
- Visit https://console.firebase.google.com
- Create new project named 'CashFlowTracker'
- Go to Build > Realtime Database > Create Database
- Start in Test Mode
- Go to Project Settings > General > Register App (Web)
- Copy credentials to .env.local

### 4. Set Up Google Drive API
- Visit https://console.cloud.google.com
- Create new project
- Enable Google Drive API
- Create OAuth 2.0 credentials (Web application)
- Add authorized origins: http://localhost:3000
- Add authorized redirect URIs: http://localhost:3000
- Get folder ID from Google Drive link

### 5. Create .env.local File
```bash
cp .env.example .env.local
```
Fill in your credentials from Firebase and Google Cloud

### 6. Run Development Server
```bash
npm start
```
App opens at http://localhost:3000

## Complete File Structure

You need to create the following folder structure and files:

```
cash-flow-tracker/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── BillUpload.jsx
│   │   ├── CategoryManager.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   ├── firebaseConfig.js
│   │   ├── googleDriveService.js
│   │   └── expenseService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
└── vercel.json
```

## All Source Code Files

See the ChatGPT conversation for complete source code:
https://chatgpt.com/c/69a53755-cf78-83a2-be3d-4d90875d5bc6

## Deploy to Vercel (Free)

1. Push repository to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Connect GitHub repository
5. Add environment variables in Project Settings
6. Click Deploy

## Features

✅ Dark/Light Mode Toggle
✅ Expense Tracking with Categories
✅ Bill Upload to Google Drive
✅ Mobile Responsive Design
✅ Category Management (Add/Edit/Delete)
✅ Real-time Expense History
✅ Firebase Realtime Database
✅ Single User Authentication
✅ Free Deployment on Vercel
