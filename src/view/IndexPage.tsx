import { useMemo } from "react";
import { useAppStore } from "../Store/useAppStore";
import DrinksCars from "../components/DrinksCars";

export default function IndexPage() {
  const { drinks } = useAppStore();

  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks]);
  return (
    <div className=" contain-content">
      <h2 className=" text-6xl font-extrabold mx-10">Recetas</h2>
      {hasDrinks ? (
        <>
          <span className=" text-sm font-bold text-orange-700 mx-10">
            {drinks.drinks.length} Recetas encontradas
          </span>
          <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 m-10 gap-10">
            {drinks.drinks.map((drink) => (
              <DrinksCars key={drink.idDrink} drink={drink} />
            ))}
          </div>
        </>
      ) : (
        <p className=" text-center my-10 text-2xl ">
          No hay resultados aun, utilice el formulario para buscar recetas
        </p>
      )}
    </div>
  );
}
