import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dishName = searchParams.get("query");
  const servings = parseInt(searchParams.get("servings")) || 4;

  if (!dishName) {
    return NextResponse.json({ error: "Dish name is required" }, { status: 400 });
  }

  try {
    // 1. Search for the recipe to get the ID
    const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(dishName)}&apiKey=${process.env.SPOONACULAR_API_KEY}&number=1`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.results || searchData.results.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const recipeId = searchData.results[0].id;

    // 2. Fetch full details using the ID
    const infoUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&servings=${servings}&includeNutrition=false`;
    const infoRes = await fetch(infoUrl);
    const recipe = await infoRes.json();

    // 3. Return the fully populated data
    return NextResponse.json({
      title: recipe.title,
      image: recipe.image,
      servings: servings,
      ingredients: (recipe.extendedIngredients || []).map(ing => ({
        name: ing.name || "Unknown ingredient",
        amount: ing.amount,
        unit: ing.unit
      })),
      instructions: recipe.analyzedInstructions?.[0]?.steps?.map(step => step.step) || []
    });

  } catch (error) {
    console.error("Recipe API Error:", error);
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 });
  }
}