import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipeSliceType, createRecipesSlice } from "./recipeStore";
import { createFavoriteSlice, FavoriteSliceType } from "./favoriteStore";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlace";

export const useAppStore = create<
  RecipeSliceType & FavoriteSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
  }))
);
