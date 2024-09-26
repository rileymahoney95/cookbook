// pages/api/recipes.js

import { db } from 'path/to/your/db'; // Adjust the path to your database module

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, servings } = req.body;

    try {
      // Insert the data into your database
      await db.recipes.insert({
        name,
        description,
        servings,
        // Include other fields as necessary
      });

      res.status(200).json({ message: 'Recipe saved successfully' });
    } catch (error) {
      // Handle database errors
      console.error('Database error:', error);
      res.status(500).json({ message: 'Failed to save recipe' });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}