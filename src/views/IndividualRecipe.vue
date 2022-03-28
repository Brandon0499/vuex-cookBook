<template>
  <div
    class="flex flex-col m-4 p-4 max-w-[800px] mx-auto rounded-xl bg-sky-100"
  >
    <!-- <h1>This is recipe: {{ $route.params.id }}</h1> -->
    <RouterLink to="/" class="individualBtn"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="w-6 mr-2"
      >
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M512 256C512 273.7 497.7 288 480 288H160.1l0 72c0 9.547-5.66 18.19-14.42 22c-8.754 3.812-18.95 2.077-25.94-4.407l-112.1-104c-10.24-9.5-10.24-25.69 0-35.19l112.1-104c6.992-6.484 17.18-8.218 25.94-4.406C154.4 133.8 160.1 142.5 160.1 151.1L160.1 224H480C497.7 224 512 238.3 512 256z"
        />
      </svg>
      <h1>Home</h1>
    </RouterLink>
    <h1 class="text-red-800 font-bold text-[1.4rem] mb-1">
      {{ recipe.category }}
    </h1>
    <div class="sm:flex justify-between my-3 items-center">
      <h2 class="text-5xl font-medium whitespace-nowrap">
        {{ recipe.title }}
      </h2>
      <div class="flex item-center mt-2 sm:mt-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="w-6 fill-green-700 mr-2 shrink-0"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"
          />
        </svg>
        <h2 class="text-xl">Duration: {{ recipe.duration }} min</h2>
      </div>
    </div>

    <h2 class="text-lg my-3">
      {{ recipe.description }}
    </h2>
    <hr />

    <!-- ingredients div -->
    <div class="my-3 outline outline-red-400 bg-amber-100 rounded-lg py-2 px-4">
      <h1 class="font-semibold text-2xl">Ingredients</h1>
      <ul class="my-2 text-base">
        <li
          class="ingredientList"
          v-for="ingredient in recipe.ingredients"
          :key="ingredient"
        >
          {{ ingredient }}
        </li>
      </ul>
    </div>

    <!-- method div -->
    <div class="my-3">
      <h1 class="font-semibold text-2xl">Method</h1>
      <ul class="my-2">
        <div v-for="step in recipe.method" :key="step">
          <li class="methodList my-2">
            {{ step }}
          </li>
          <hr class="methodLine" />
        </div>
      </ul>
    </div>

    <div class="flex mt-6 self-end">
      <button @click="togglePopup" class="individualBtn mx-2 bg-orange-300">
        edit
      </button>
      <button class="individualBtn bg-red-400">delete</button>
    </div>

    <!-- pop-up on edit  recipe -->
    <div
      class="bg-blue-300 bg-opacity-50 fixed top-0 left-0 bottom-0 right-0 overflow-y-scroll"
      v-if="popupOpen"
    >
      <div class="bg-orange-300 p-4 text-4xl max-w-[800px] mx-auto rounded-xl">
        <h1 class="text-center">Add New Recipe</h1>

        <form @submit.prevent="addNewRecipe">
          <div class="inputWrapper">
            <label class="labelStyle">Category</label>
            <input class="inputStyle" type="text" v-model="recipe.category" />
          </div>
          <div class="inputWrapper">
            <label class="labelStyle">Title</label>
            <input class="inputStyle" type="text" v-model="recipe.title" />
          </div>
          <div class="inputWrapper">
            <label class="labelStyle">Description</label>
            <textarea
              class="inputStyle leading-[20px] min-h-[100px] py-2"
              type="text"
              v-model="recipe.description"
            />
          </div>
          <div class="inputWrapper">
            <label class="labelStyle">Ingredients</label>

            <div
              class="flex w-full mb-2"
              v-for="(ingredient, index) in recipe.ingredientRow"
              :key="ingredient"
            >
              <input
                class="inputStyle flex-1"
                type="text"
                v-model="recipe.ingredients[index]"
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
              v-for="(step, index) in recipe.steps"
              :key="step"
            >
              <textarea
                class="inputStyle flex-1 leading-[20px] min-h-[80px] py-2"
                type="text"
                v-model="recipe.method[index]"
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
            <input class="inputStyle" type="number" v-model="recipe.duration" />
          </div>
          <div class="addCloseWrapper">
            <button type="submit" class="addBtn bg-[#34d399]">
              Confirm Changes
            </button>
            <button class="addBtn" @click="togglePopup">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref } from "vue";

const store = useStore();
const route = useRoute();
const popupOpen = ref(false);

function getCurrentRecipe() {
  const recipe = store.state.recipes.find(
    (singleRecipe) => singleRecipe.identifier === route.params.id
  );

  return recipe;
}

const recipe = ref(getCurrentRecipe());

recipe.value.ingredientRow = recipe.value.ingredients.length;
recipe.value.steps = recipe.value.method.length;

function togglePopup() {
  // clear the input fields after if user close the popup
  popupOpen.value = !popupOpen.value;
}

function addNewIngredient() {
  recipe.value.ingredientRow++;
}
function addNewStep() {
  recipe.value.steps++;
}
function deleteIngredientRow(index) {
  recipe.value.ingredients.splice(index, 1);
  recipe.value.ingredientRow--;
}
function deleteStepRow(index) {
  recipe.value.method.splice(index, 1);
  recipe.value.steps--;
}
function addNewRecipe() {
  // replace space with "-"
  if (recipe.value.category == "") {
    alert("Please enter a category");
    return;
  }
  if (recipe.value.title == "") {
    alert("Please enter a title");
    return;
  }
  if (recipe.value.description == "") {
    alert("Please enter the description");
    return;
  }
  if (recipe.value.ingredients == "") {
    alert("Please enter the ingredient");
    return;
  }
  if (recipe.value.method == "") {
    alert("Please enter the method");
    return;
  }
  if (recipe.value.duration == null) {
    alert("Please enter a duration");
    return;
  }

  const emptyRemoved = recipe.value.ingredients.filter(
    (ingredient) => ingredient !== "empty" || ingredient !== ""
  );
  // set new ingredients array with empty ones removed
  recipe.value.ingredients = emptyRemoved;
  // set new ingredientRow count based on new emptyRemoved length
  recipe.value.ingredientRow = emptyRemoved.length;
  const emptyMethodRemoved = recipe.value.method.filter(
    (step) => step !== "empty"
  );
  // set new method array with empty ones removed
  recipe.value.method = emptyMethodRemoved;
  // set new steps count based on new emptyMethodRemoved length
  recipe.value.steps = emptyMethodRemoved.length;
  store.commit("editRecipe", { ...recipe.value });
  console.log(recipe.value);

  togglePopup();
}

function editRecipe() {}
</script>

<style>
.individualBtn {
  background-color: #34d399;
  font-weight: 700;
  padding: 6px 8px;
  border-radius: 10px;
  margin: 12px 0px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  font-size: 20px;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
}

hr {
  border: 2px solid black;
}

.ingredientList {
  list-style: disc;
  list-style-position: inside;
}

.methodList {
  list-style: decimal;
  list-style-position: inside;
}

.methodLine {
  border: 0.1px solid black;
}
</style>
