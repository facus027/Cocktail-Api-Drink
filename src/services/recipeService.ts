import axios from "axios";
import {
  CategoryResponseApiSchema,
  DrinksResponseSchema,
  RecipeAPIResponseSchema,
} from "../Schema/recipe-schema";
import { Drink, Search } from "../type";

export async function getCategoriesApi() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios.get(url);
  const result = CategoryResponseApiSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getRecipe(filter: Search) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}`;
  const { data } = await axios(url);
  const result = DrinksResponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getRecipeById(id: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios(url);
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
  if (result.success) {
    return result.data;
  }
}
