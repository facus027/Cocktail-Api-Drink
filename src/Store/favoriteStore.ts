import { StateCreator } from "zustand";
import { RecipeDetail } from "../type";
import {
  NotificationSliceType,
  createNotificationSlice,
} from "./notificationSlace";

export type FavoriteSliceType = {
  favorites: RecipeDetail[];
  handleCLickFavorite: (recipe: RecipeDetail) => void;
  favoriteExist: (id: RecipeDetail["idDrink"]) => Boolean;
  loadFromStorage: () => void;
};

export const createFavoriteSlice: StateCreator<
  FavoriteSliceType & NotificationSliceType,
  [],
  [],
  FavoriteSliceType
> = (set, get, api) => ({
  favorites: [],
  handleCLickFavorite: (recipe) => {
    if (
      get().favorites.some((favorite) => favorite.idDrink === recipe.idDrink)
    ) {
      set({
        favorites: get().favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      });
      createNotificationSlice(set, get, api).showNotification({
        text: "Se elimino de favoritos",
        error: true,
      });
    } else {
      set({
        favorites: [...get().favorites, recipe],
      });
      createNotificationSlice(set, get, api).showNotification({
        text: "Añadido a favorito",
        error: false,
      });
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExist: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromStorage: () => {
    const storegeFavorite = localStorage.getItem("favorites");
    if (storegeFavorite) {
      set({
        favorites: JSON.parse(storegeFavorite),
      });
    }
  },
});

// A esto se le llama Slice Pattern
