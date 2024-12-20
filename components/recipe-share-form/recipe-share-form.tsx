'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Ingredient } from '@/lib/types/recipe';

type FormRecipeIngredient = {
  ingredientId: number;
  quantity: number;
  fraction?: string;
  uom: string;
  searchTerm?: string;
};

const UOM_OPTIONS = [
  'g', 'kg', 'oz', 'lb',
  'ml', 'l', 'tsp', 'tbsp',
  'cup', 'pint', 'quart', 'gallon',
  'piece', 'slice', 'whole'
];

export default function RecipeShareForm() {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [servings, setServings] = useState<number>(1);
  const [ingredients, setIngredients] = useState<FormRecipeIngredient[]>([
    {
      ingredientId: 0,
      quantity: 0,
      fraction: '',
      uom: '',
    },
  ]);
  const [ingredientSuggestions, setIngredientSuggestions] = useState<
    Ingredient[]
  >([]);
  const [steps, setSteps] = useState(['']);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);
  const [activeUomDropdownIndex, setActiveUomDropdownIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const uomDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/api/ingredients');
        if (response.ok) {
          const data = await response.json();
          setIngredientSuggestions(data);
        }
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
      }
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) &&
        (uomDropdownRef.current && !uomDropdownRef.current.contains(event.target as Node))
      ) {
        setActiveDropdownIndex(null);
        setActiveUomDropdownIndex(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIngredientSearch = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = event.target.value;
    const values = [...ingredients];
    values[index] = {
      ...values[index],
      searchTerm,
      ingredientId: 0,
    };
    setIngredients(values);
    setActiveDropdownIndex(index);
  };

  const handleIngredientSelect = (index: number, ingredient: Ingredient) => {
    const values = [...ingredients];
    values[index] = {
      ...values[index],
      ingredientId: ingredient.id,
      searchTerm: ingredient.name,
    };
    setIngredients(values);
    setActiveDropdownIndex(null);
  };

  const handleIngredientChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const values = [...ingredients];
    const field = event.target.name as keyof FormRecipeIngredient;
    values[index] = {
      ...values[index],
      [field]:
        event.target.name === 'ingredientId' || event.target.name === 'quantity'
          ? parseInt(event.target.value) || 0
          : event.target.value,
    };
    setIngredients(values);
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        ingredientId: 0,
        quantity: 0,
        fraction: '',
        uom: '',
      },
    ]);
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

  const handleUomSearch = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = event.target.value;
    const values = [...ingredients];
    values[index] = {
      ...values[index],
      uom: searchTerm,
    };
    setIngredients(values);
    setActiveUomDropdownIndex(index);
  };

  const handleUomSelect = (index: number, uom: string) => {
    const values = [...ingredients];
    values[index] = {
      ...values[index],
      uom,
    };
    setIngredients(values);
    setActiveUomDropdownIndex(null);
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
    <form className="max-w-[800px] mx-auto my-8 p-8 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h1>Add a New Recipe</h1>

      <div className="mb-6">
        <label htmlFor='recipeName'>Recipe Name</label>
        <input
          type='text'
          id='recipeName'
          name='recipeName'
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className="block w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-base focus:outline-none focus:border-red-700 focus:bg-white"
        />
      </div>

      <div className="mb-6">
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-base focus:outline-none focus:border-red-700 focus:bg-white"
        />
      </div>

      <div className="mb-6">
        <label htmlFor='servings'>Servings</label>
        <input
          type='number'
          id='servings'
          name='servings'
          min='1'
          value={servings}
          onChange={(e) => setServings(parseInt(e.target.value) || 1)}
          className="block w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-base focus:outline-none focus:border-red-700 focus:bg-white"
        />
      </div>

      <div className="mb-6">
        <label>Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center mb-2 gap-2">
            <div className="relative flex-2 w-2/3">
              <input
                type="text"
                placeholder="Search ingredients..."
                value={ingredient.searchTerm || ''}
                onChange={(event) => handleIngredientSearch(index, event)}
                className="w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-base focus:outline-none focus:border-red-700 focus:bg-white"
              />
              {activeDropdownIndex === index && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-gray-300 rounded-md max-h-[200px] overflow-y-auto z-[1000] shadow-sm">
                  {ingredientSuggestions
                    .filter((ing) =>
                      ing.name
                        .toLowerCase()
                        .includes((ingredient.searchTerm || '').toLowerCase())
                    )
                    .map((ing) => (
                      <div
                        key={ing.id}
                        className="p-2 cursor-pointer text-gray-700 hover:bg-gray-50"
                        onClick={() => handleIngredientSelect(index, ing)}
                      >
                        {ing.name}
                      </div>
                    ))}
                </div>
              )}
            </div>    
            <div className="flex gap-2">
              <input
                type='number'
                name='quantity'
                placeholder='Quantity'
                value={ingredient.quantity}
                onChange={(event) => handleIngredientChange(index, event)}
                className="block w-1/3 p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-base focus:outline-none focus:border-red-700 focus:bg-white"
              />
              <select
                name='fraction'
                value={ingredient.fraction || ''}
                onChange={(event) => handleIngredientChange(index, event)}
                className="p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-base"
              >
                <option value=''>No fraction</option>
                <option value='1/4'>1/4</option>
                <option value='1/3'>1/3</option>
                <option value='1/2'>1/2</option>
                <option value='2/3'>2/3</option>
                <option value='3/4'>3/4</option>
              </select>
            </div>
            <div className="relative w-1/3" ref={uomDropdownRef}>
              <input
                type='text'
                name='uom'
                placeholder='Unit of Measure'
                value={ingredient.uom}
                onChange={(event) => handleUomSearch(index, event)}
                className="w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-base focus:outline-none focus:border-red-700 focus:bg-white"
              />
              {activeUomDropdownIndex === index && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-gray-300 rounded-md max-h-[200px] overflow-y-auto z-[1000] shadow-sm">
                  {UOM_OPTIONS.filter((uom) =>
                    uom.toLowerCase().includes(ingredient.uom.toLowerCase())
                  ).map((uom) => (
                    <div
                      key={uom}
                      className="p-2 cursor-pointer text-gray-700 hover:bg-gray-50"
                      onClick={() => handleUomSelect(index, uom)}
                    >
                      {uom}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              type='button'
              onClick={() => handleRemoveIngredient(index)}
              className="bg-gray-600 text-white border-none py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={handleAddIngredient}
          className="bg-gray-600 text-white border-none py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-700"
        >
          Add Ingredient
        </button>
      </div>

      <div className="mb-6">
        <label>Steps</label>
        {steps.map((step, index) => (
          <div key={index} className="flex items-center mb-2 gap-2">
            <input
              type='text'
              placeholder={`Step ${index + 1}`}
              value={step}
              onChange={(event) => handleStepChange(index, event)}
              className="block w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-base focus:outline-none focus:border-red-700 focus:bg-white"
            />
            <button
              type='button'
              onClick={() => handleRemoveStep(index)}
              className="bg-gray-600 text-white border-none py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={handleAddStep}
          className="bg-gray-600 text-white border-none py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-700"
        >
          Add Step
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor='image'>Image</label>
        <input
          type='file'
          id='image'
          name='image'
          accept='image/*'
          onChange={handleImageChange}
          className="block w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-base focus:outline-none focus:border-red-700 focus:bg-white"
        />
        {imagePreviewUrl && (
          <div className="mt-4 text-center">
            <img
              src={imagePreviewUrl}
              alt='Image Preview'
              className="max-w-full max-h-80 w-3/4 h-auto rounded-md"
            />
          </div>
        )}
      </div>

      <button type='submit' className="w-full bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 hover:bg-red-800 cursor-pointer">
        Submit Recipe
      </button>
    </form>
  );
}
