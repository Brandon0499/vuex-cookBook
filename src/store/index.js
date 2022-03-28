import { createStore } from "vuex";

const store = createStore({
  state: {
    recipes: [
      {
        identifier: "katsu-curry",
        category: "Quick Dinners",
        title: "Katsu Curry",
        description:
          "A delicious curry made with chicken. potatoes, and a special sauce",
        ingredients: [
          "1 tablespoon olive oil",
          "1 onion, chopped",
          "2 cloves garlic, chopped",
          "1 tablespoon curry powder",
        ],
        method: [
          "Heat oil in a large skillet over medium heat.",
          "Add onion and garlic and cook, stirring often, until softened, about 5 minutes.",
          "Add curry powder and cook, stirring, until fragrant, about 1 minute.",
          "Add chicken and potatoes and cook, stirring, until heated through, about 5 minutes.",
        ],
        duration: 30,
      },
      {
        identifier: "ramen-noodle-soup",
        category: "Noodles",
        title: "Ramen noodle soup",
        description:
          "A delicious curry made with chicken. potatoes, and a special sauce",
        ingredients: [
          "1 tablespoon olive oil",
          "1 onion, chopped",
          "2 cloves garlic, chopped",
          "1 tablespoon curry powder",
        ],
        method: [
          "Heat oil in a large skillet over medium heat.",
          "Add onion and garlic and cook, stirring often, until softened, about 5 minutes.",
          "Add curry powder and cook, stirring, until fragrant, about 1 minute.",
          "Add chicken and potatoes and cook, stirring, until heated through, about 5 minutes.",
        ],
        duration: 45,
      },
    ],
  },
  mutations: {
    addRecipe(state, payload) {
      state.recipes.push(payload);
    },
    editRecipe(state, payload) {
      // const recipeToEdit = state.recipes.find(
      //   (singleRecipe) => singleRecipe.identifier == payload.identifier
      // );

      // const indexToEdit = state.recipes.identifier.includes(payload.identifier);

      // state.recipes.splice(indexToEdit);

      // if (state.recipes.identifier == payload.identifier) {
      // }

      const indexToEdit = state.recipes.findIndex(
        (singleRecipe) => singleRecipe.identifier == payload.identifier
      );

      state.recipes.splice(indexToEdit, 1, payload);
    },
  },
});

export default store;
