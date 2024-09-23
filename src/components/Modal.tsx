import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAppStore } from "../Store/useAppStore";
import { RecipeDetail } from "../type";

export default function Modal() {
  const { modal, closeModal, recipe, handleCLickFavorite, favoriteExist } =
    useAppStore();

  //crear nuvo slices store para la logica de agregar favoritos

  const renderIngredient = () => {
    const ingredients: JSX.Element[] = [];
    for (let i = 1; i <= 6; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetail];
      const measure = recipe[`strMeasure${i}` as keyof RecipeDetail];
      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className=" text-lg font-normal">
            {ingredient} - {measure}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {recipe.strDrink}
                    <img
                      src={recipe.strDrinkThumb}
                      alt={`Imagen de ${recipe.strDrink}`}
                      className=" w-44 mx-auto mt-3"
                    />
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Ingredientes y Cantidades
                  </Dialog.Title>
                  {renderIngredient()}
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Instrucciones
                  </Dialog.Title>
                  <p className=" text-lg">{recipe.strInstructions}</p>

                  <div className=" flex justify-between gap-4">
                    <button
                      type="button"
                      className=" bg-gray-600 hover:bg-gray-500 rounded-lg text-center cursor-pointer font-bold p-2 mt-4 w-full text-white"
                      onClick={() => closeModal()}
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className=" bg-orange-600 hover:bg-orange-500 rounded-lg text-center cursor-pointer font-bold p-2 mt-4 w-full text-white"
                      onClick={() => {
                        handleCLickFavorite(recipe);
                        closeModal();
                      }}
                    >
                      {favoriteExist(recipe.idDrink)
                        ? "Eliminar de Favorito"
                        : "Añadir Favorito"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
