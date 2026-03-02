import React, { useState, useEffect } from 'react';
import { auth } from './config/firebase'
  import { onAuthStateChanged } from 'firebase/auth';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryManager from './components/CategoryManager';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [, setUser] = useState(null);  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState(['Milk', 'Cab Fare', 'Ginger', 'BlinkIt', 'Facebook Ads']);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="app-header">
        <h1>Cash Flow Tracker</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="app-main">
        <div className="container">
          <ExpenseForm categories={categories} onAddExpense={(expense) => setExpenses([...expenses, expense])} />
          <CategoryManager categories={categories} setCategories={setCategories} />
          <ExpenseList expenses={expenses} onDeleteExpense={(id) => setExpenses(expenses.filter(e => e.id !== id))} />
        </div>
      </main>
    </div>
  );
}

export default App;
