import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useAppStore } from "../Store/useAppStore";
import Alert from "./Alert";

export default function Header() {
  const { categories, fetchCategoriesApi, searchRecipe, showNotification } =
    useAppStore();

  const [error, setError] = useState("");

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const [search, setSearch] = useState({
    ingredient: "",
    category: "",
  });

  const handlerChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validar Formulario
    if (Object.values(search).includes("")) {
      showNotification({
        text: "Todos los campos son obligatirios",
        error: true,
      });
      setError("Alguno campo esta vacio");
      return;
    }
    // consultar receta
    searchRecipe(search);
    setError("");
  };

  useEffect(() => {
    fetchCategoriesApi();
  }, []);
  return (
    <header
      className={isHome ? " bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className=" mx-auto container px-5 py-10">
        <div className=" flex justify-between items-center">
          <div>
            <img className=" w-32" src="/logo.svg" alt="logotipo" />
          </div>
          <nav className=" flex gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? " text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to={"/favoritos"}
              className={({ isActive }) =>
                isActive
                  ? " text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <>
            <form
              className=" md:w-1/2 2xl:1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
              onSubmit={handlerSubmit}
            >
              {error && <Alert>{error}</Alert>}
              <div className=" space-y-4">
                <label
                  htmlFor="ingredient"
                  className=" block text-white uppercase font-extrabold text-lg"
                >
                  Nombre de ingredienteo bebida:
                </label>
                <input
                  type="text"
                  id="ingredient"
                  name="ingredient"
                  placeholder="Nombre del ingrediente. Ej: Vodka, cafe, cerveza"
                  className=" p-3 w-full rounded-lg focus:outline-none"
                  value={search.ingredient}
                  onChange={handlerChange}
                />
              </div>
              <div className=" space-y-4">
                <label
                  htmlFor="category"
                  className=" block text-white uppercase font-extrabold text-lg"
                >
                  Categoria de la bebiba:
                </label>
                <select
                  name="category"
                  id="category"
                  className="p-3 w-full rounded-lg focus:outline-non"
                  value={search.category}
                  onChange={handlerChange}
                >
                  <option value="">--- seleccionar ----</option>
                  {categories.drinks.map((category) => (
                    <option
                      value={category.strCategory}
                      key={category.strCategory}
                    >
                      {category.strCategory}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="submit"
                value="Buscar Receta"
                className=" cursor-pointer bg-orange-800 rounded-lg uppercase hover:bg-orange-900 
                w-full font-extrabold p-2 text-white"
              />
            </form>
          </>
        )}
      </div>
    </header>
  );
}
