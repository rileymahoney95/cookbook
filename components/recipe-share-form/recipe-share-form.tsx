'use client';

import React, { useState, useEffect } from 'react';
import styles from './recipe-share-form.module.css';
import type { Ingredient } from '@/lib/db/pg/entities/types';

type FormRecipeIngredient = {
  ingredientId: number;
  quantity: number;
  uom: string;
};

export default function RecipeShareForm() {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [servings, setServings] = useState<number>(1);
  const [ingredients, setIngredients] = useState<FormRecipeIngredient[]>([{
    ingredientId: 0,
    quantity: 0,
    uom: ''
  }]);
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState(['']);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // New state variable

  // Fetch available ingredients when component mounts
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/api/ingredients');
        if (response.ok) {
          const data = await response.json();
          setAvailableIngredients(data);
        }
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
      }
    };
    fetchIngredients();
  }, []);

  const handleIngredientChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const values = [...ingredients];
    const field = event.target.name as keyof FormRecipeIngredient;
    values[index][field] = event.target.name === 'ingredientId' || event.target.name === 'quantity'
      ? parseInt(event.target.value) || 0
      : event.target.value;
    setIngredients(values);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { 
      ingredientId: 0,
      quantity: '',
      uom: ''
    }]);
  };

  const handleRemoveIngredient = (index: number) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleStepChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...steps];
    values[index] = event.target.value;
    setSteps(values);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleRemoveStep = (index: number) => {
    const values = [...steps];
    values.splice(index, 1);
    setSteps(values);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);

      // Generate a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('recipeName', recipeName);
    formData.append('description', description);
    formData.append('servings', servings.toString());
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('steps', JSON.stringify(steps));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Recipe saved successfully!');
      } else {
        alert('Error saving recipe');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving recipe');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Add a New Recipe</h1>

      <div className={styles.field}>
        <label htmlFor="recipeName">Recipe Name</label>
        <input
          type="text"
          id="recipeName"
          name="recipeName"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="servings">Servings</label>
        <input
          type="number"
          id="servings"
          name="servings"
          min="1"
          value={servings}
          onChange={(e) => setServings(parseInt(e.target.value) || 1)}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label>Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredient}>
            <select
              name="ingredientId"
              value={ingredient.ingredientId}
              onChange={(event) => handleIngredientChange(index, event)}
              className={styles.input}
            >
              <option value="">Select an ingredient</option>
              {availableIngredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(event) => handleIngredientChange(index, event)}
              className={styles.input}
            />
            <input
              type="text"
              name="uom"
              placeholder="Unit of Measure"
              value={ingredient.uom}
              onChange={(event) => handleIngredientChange(index, event)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient} className={styles.addButton}>
          Add Ingredient
        </button>
      </div>

      <div className={styles.field}>
        <label>Steps</label>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <input
              type="text"
              placeholder={`Step ${index + 1}`}
              value={step}
              onChange={(event) => handleStepChange(index, event)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => handleRemoveStep(index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddStep} className={styles.addButton}>
          Add Step
        </button>
      </div>

      <div className={styles.field}>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.input}
        />
        {imagePreviewUrl && (
          <div className={styles.imagePreview}>
            <img src={imagePreviewUrl} alt="Image Preview" className={styles.previewImage} />
          </div>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit Recipe
      </button>
    </form>
  );
}
