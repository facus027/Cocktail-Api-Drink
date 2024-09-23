import { useMemo } from "react";
import { useAppStore } from "../Store/useAppStore";
import DrinksCars from "../components/DrinksCars";

export default function FavoritPage() {
  const { favorites } = useAppStore();

  const hasFavorite = useMemo(() => favorites.length, [favorites]);
  return (
    <div className=" containe-contet">
      <h2 className=" text-6xl font-extrabold mx-10">Recetas Favoritas</h2>
      {hasFavorite ? (
        <>
          <span className=" text-sm font-bold text-orange-700 mx-10">
            {favorites.length} Recetas Favoritas
          </span>
          <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 m-10 gap-10">
            {favorites.map((favorite) => (
              <DrinksCars key={favorite.idDrink} drink={favorite} />
            ))}
          </div>
        </>
      ) : (
        <p className=" text-center my-10 text-2xl">
          Todavia no hay favoritos, interactua con la pagina de inicio
        </p>
      )}
    </div>
  );
}
