import React, { useState } from 'react';
import { uploadFileToGoogleDrive, addExpenseToDatabase } from '../services/firebase';

function ExpenseForm({ categories, onAddExpense }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      let fileUrl = null;
      if (file) {
        fileUrl = await uploadFileToGoogleDrive(file, category);
      }

      const expense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category,
        description,
        date: new Date().toLocaleDateString(),
        fileUrl,
      };

      await addExpenseToDatabase(expense);
      onAddExpense(expense);

      setAmount('');
      setCategory(categories[0]);
      setDescription('');
      setFile(null);
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        step="0.01"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.png,.jpeg"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
}

export default ExpenseForm;
