import { z } from "zod";
import {
  CategoryResponseApiSchema,
  DrinkResponseSchema,
  DrinksResponseSchema,
  RecipeAPIResponseSchema,
  SearchSchema,
} from "../Schema/recipe-schema";

export type categories = z.infer<typeof CategoryResponseApiSchema>;
export type Search = z.infer<typeof SearchSchema>;
export type Drink = z.infer<typeof DrinkResponseSchema>;
export type Drinks = z.infer<typeof DrinksResponseSchema>;
export type RecipeDetail = z.infer<typeof RecipeAPIResponseSchema>;
