<template>
  <div class="m-10 w-full mx-auto flex flex-col">
    <div class="text-center">
      <h1 class="text-[42px] font-semibold">My Recipes</h1>
      <button class="addRecipeBtn" @click="togglePopup">Add new recipe</button>
    </div>

    <!-- recipe cards section -->
    <div
      class="m-6 grid recipeGrid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <RouterLink
        :to="`/individualRecipe/${recipe.identifier}`"
        class="outline outline-2 m-2 bg-white cardHover rounded-md overflow-hidden"
        v-for="recipe in $store.state.recipes"
        :key="recipe.identifier"
      >
        <!-- <img
          class="object-cover w-full"
          src="https://www.simplyrecipes.com/thmb/8Lw8f_pzlJOwoUbNhVs2L45m0Lg=/300x225/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Carrot-Fennel-Chevre-Galette-LEAD-6-4d6d01533ff04e4c9e677a412580d052.jpg"
          alt=""
        /> -->
        <div class="m-4">
          <h1 class="text-red-800 font-bold text-[1rem] mb-1">
            {{ recipe.category }}
          </h1>
          <p class="font-normal text-[2rem]">{{ recipe.title }}</p>
          <div class="flex item-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="w-6 fill-green-700"
            >
              <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"
              />
            </svg>
            <h1 class="text-[.95rem] ml-2">{{ recipe.duration }} mins</h1>
          </div>
        </div>
      </RouterLink>
    </div>

    <!-- pop-up on add new recipe -->
    <div
      class="bg-blue-300 bg-opacity-50 fixed top-0 left-0 bottom-0 right-0 overflow-y-scroll"
      v-if="popupOpen"
    >
      <div class="bg-orange-300 p-4 text-4xl max-w-[800px] mx-auto rounded-xl">
        <h1 class="text-center">Add New Recipe</h1>

        <form @submit.prevent="addNewRecipe">
          <div class="inputWrapper">
            <label class="labelStyle">Category</label>
            <input
              class="inputStyle"
              type="text"
              v-model="newRecipe.category"
            />
          </div>
          <div class="inputWrapper">
            <label class="labelStyle">Title</label>
            <input class="inputStyle" type="text" v-model="newRecipe.title" />
          </div>
          <div class="inputWrapper">
            <label class="labelStyle">Description</label>
            <textarea
              class="inputStyle leading-[20px] min-h-[100px] py-2"
              type="text"
              v-model="newRecipe.description"
            />
          </div>
          <div class="inputWrapper">
            <label class="labelStyle">Ingredients</label>

            <div
              class="flex w-full mb-2"
              v-for="(ingredient, index) in newRecipe.ingredientRow"
              :key="ingredient"
            >
              <input
                class="inputStyle flex-1"
                type="text"
                v-model="newRecipe.ingredients[index]"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="w-10 h-10 ml-2 trashIcon"
                :class="{ hidden: index === 0 }"
                @click="deleteIngredientRow(index)"
              >
                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                />
              </svg>
            </div>
            <button class="addBtn flex-0" @click.prevent="addNewIngredient">
              Add Ingredient
            </button>
          </div>
          <div class="inputWrapper">
            <label class="labelStyle">Methods</label>
            <div
              class="flex w-full items-center mb-2"
              v-for="(step, index) in newRecipe.steps"
              :key="step"
            >
              <textarea
                class="inputStyle flex-1 leading-[20px] min-h-[80px] py-2"
                type="text"
                v-model="newRecipe.method[index]"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="w-10 h-12 ml-2 trashIcon"
                :class="{ hidden: index === 0 }"
                @click="deleteStepRow(index)"
              >
                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                />
              </svg>
            </div>
            <button class="addBtn flex-0" @click.prevent="addNewStep">
              Add Steps
            </button>
          </div>
          <div class="inputWrapper">
            <label class="labelStyle">Estimated Duration(minutes)</label>
            <input
              class="inputStyle"
              type="number"
              v-model="newRecipe.duration"
            />
          </div>
          <div class="addCloseWrapper">
            <button type="submit" class="addBtn bg-[#34d399]">
              Add Recipe
            </button>
            <button class="addBtn" @click="togglePopup">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { RouterLink } from "vue-router";

const store = useStore();
const popupOpen = ref(false);
const newRecipe = ref({
  category: "",
  title: "",
  description: "",
  ingredients: [],
  method: [],
  duration: null,
  ingredientRow: 1,
  steps: 1,
});

function togglePopup() {
  // clear the input fields after if user close the popup
  newRecipe.value = {
    category: "",
    title: "",
    description: "",
    ingredients: [],
    method: [],
    duration: null,
    ingredientRow: 1,
    steps: 1,
  };
  popupOpen.value = !popupOpen.value;
}

function addNewIngredient() {
  newRecipe.value.ingredientRow++;
}

function addNewStep() {
  newRecipe.value.steps++;
}

function deleteIngredientRow(index) {
  newRecipe.value.ingredients.splice(index, 1);
  newRecipe.value.ingredientRow--;
}

function deleteStepRow(index) {
  newRecipe.value.method.splice(index, 1);
  newRecipe.value.steps--;
}

function addNewRecipe() {
  // replace space with "-"
  newRecipe.value.identifier = newRecipe.value.title
    .toLocaleLowerCase()
    .replace(/\s/g, "-");

  if (newRecipe.value.category == "") {
    alert("Please enter a category");
    return;
  }

  if (newRecipe.value.title == "") {
    alert("Please enter a title");
    return;
  }

  if (newRecipe.value.description == "") {
    alert("Please enter the description");
    return;
  }

  if (newRecipe.value.ingredients == "") {
    alert("Please enter the ingredient");
    return;
  }
  if (newRecipe.value.method == "") {
    alert("Please enter the method");
    return;
  }
  if (newRecipe.value.duration == null) {
    alert("Please enter a duration");
    return;
  }

  // while (popupOpen.value === true) {
  //   if (newRecipe.value.method == "") {
  //     alert("Please enter the method");
  //     return;
  //   }
  //   if (newRecipe.value.duration == null) {
  //     alert("Please enter a duration");
  //     return;
  //   }
  // }

  const emptyRemoved = newRecipe.value.ingredients.filter(
    (ingredient) => ingredient !== "empty"
  );

  // set new ingredients array with empty ones removed
  newRecipe.value.ingredients = emptyRemoved;

  // set new ingredientRow count based on new emptyRemoved length
  newRecipe.value.ingredientRow = emptyRemoved.length;

  const emptyMethodRemoved = newRecipe.value.method.filter(
    (step) => step !== "empty"
  );

  // set new method array with empty ones removed
  newRecipe.value.method = emptyMethodRemoved;

  // set new steps count based on new emptyMethodRemoved length
  newRecipe.value.steps = emptyMethodRemoved.length;

  store.commit("addRecipe", newRecipe.value);

  console.log(newRecipe.value);

  // clear the input fields after adding
  newRecipe.value = {
    category: "",
    title: "",
    description: "",
    ingredients: [],
    method: [],
    duration: null,
    ingredientRow: 1,
    steps: 1,
  };
  togglePopup();
}
</script>

<style>
.addRecipeBtn {
  background-color: #34d399;
  font-weight: 700;
  padding: 8px;
  border-radius: 16px;
  margin-top: 12px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.addRecipeBtn:hover {
  transform: translateX(4px) translateY(-4px);
  box-shadow: -4px 4px 4px rgba(60, 60, 93, 0.33);
}

.recipeGrid {
  grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));
}

.cardHover {
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.cardHover:hover {
  transform: translateX(4px) translateY(-4px);
  box-shadow: -10px 10px 4px rgba(245, 202, 11, 0.843);
}

.inputWrapper {
  display: flex;
  flex-direction: column;
  margin: 10px 12px;
}

.labelStyle {
  font-size: 1.1rem;
}

.inputStyle {
  border-radius: 12px;
  padding: 0px 10px;
  font-size: 0.8rem;
  outline: none;
}

.addBtn {
  background-color: #34d399;
  font-weight: 700;
  padding: 0px 8px;
  border-radius: 16px;
  margin-top: 12px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  display: flex;
  font-size: 16px;
  align-self: flex-start;
}

.trashIcon {
  background-color: rgb(226, 14, 14);
  fill: white;
  cursor: pointer;
  padding: 0px 5px;
  border-radius: 10px;
}

.addCloseWrapper {
  display: flex;
  justify-content: space-between;
  margin: 10px 12px;
  margin-top: 30px;
}
</style>
