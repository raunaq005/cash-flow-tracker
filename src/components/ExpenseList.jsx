import React from 'react';

function ExpenseList({ expenses, onDeleteExpense }) {
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expense-list">
      <h2>Expense History</h2>
      <div className="expense-summary">
        <p>Total Expenses: ₹{totalExpense.toFixed(2)}</p>
      </div>

      {expenses.length === 0 ? (
        <p className="no-expenses">No expenses yet. Add your first expense!</p>
      ) : (
        <div className="expense-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Bill</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>₹{expense.amount.toFixed(2)}</td>
                  <td>{expense.description || '-'}</td>
                  <td>
                    {expense.fileUrl ? (
                      <a href={expense.fileUrl} target="_blank" rel="noopener noreferrer">
                        View Bill
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => onDeleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
