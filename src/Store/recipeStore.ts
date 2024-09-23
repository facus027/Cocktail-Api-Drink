import { StateCreator } from "zustand";
import {
  getCategoriesApi,
  getRecipe,
  getRecipeById,
} from "../services/recipeService";
import { Drinks, Drink, Search, categories, RecipeDetail } from "../type";

export type RecipeSliceType = {
  categories: categories;
  drinks: Drinks;
  recipe: RecipeDetail;
  modal: boolean;
  fetchCategoriesApi: () => Promise<void>;
  searchRecipe: (filter: Search) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  recipe: {} as RecipeDetail,
  modal: false,
  fetchCategoriesApi: async () => {
    const categories = await getCategoriesApi();
    set({
      categories,
    });
  },
  searchRecipe: async (filter) => {
    const drinks = await getRecipe(filter);
    set({
      drinks,
    });
  },
  selectRecipe: async (id) => {
    const recipe = await getRecipeById(id);
    set({
      recipe,
      modal: true,
    });
  },
  closeModal: () => {
    set({
      modal: false,
      recipe: {} as RecipeDetail,
    });
  },
});
