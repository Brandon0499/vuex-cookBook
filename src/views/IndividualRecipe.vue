<template>
  <div
    class="flex flex-col m-4 p-4 max-w-[800px] mx-auto rounded-xl bg-sky-100"
  >
    <!-- <h1>This is recipe: {{ $route.params.id }}</h1> -->
    <RouterLink to="/" class="homeBtn"
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
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

// computed:{
//     recipe(){

//     }
// }

const recipe = computed(() =>
  store.state.recipes.find(
    (singleRecipe) => singleRecipe.identifier === route.params.id
  )
);

console.log(recipe.value.title);
</script>

<style>
.homeBtn {
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
