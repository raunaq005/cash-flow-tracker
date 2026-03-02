import React, { useState } from 'react';

function CategoryManager({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowForm(false);
      alert('Category added successfully!');
    } else if (categories.includes(newCategory)) {
      alert('Category already exists!');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    if (window.confirm(`Remove ${categoryToRemove}?`)) {
      setCategories(categories.filter((cat) => cat !== categoryToRemove));
    }
  };

  return (
    <div className="category-manager">
      <h2>Manage Categories</h2>
      <div className="categories-list">
        {categories.map((category) => (
          <div key={category} className="category-item">
            <span>{category}</span>
            <button
              className="remove-btn"
              onClick={() => handleRemoveCategory(category)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {!showForm ? (
        <button
          className="add-category-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Category
        </button>
      ) : (
        <form onSubmit={handleAddCategory} className="add-category-form">
          <input
            type="text"
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            autoFocus
          />
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default CategoryManager;
