<template>
  <div class="m-10 w-full mx-auto flex flex-col">
    <div class="text-center">
      <h1 class="text-[42px] font-semibold">My Recipes</h1>
      <button class="addRecipeBtn">Add new recipe</button>
    </div>

    <!-- recipe cards section -->
    <div
      class="m-6 grid recipeGrid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        class="outline outline-2 m-2 bg-white cardHover rounded-md overflow-hidden"
        v-for="i in 4"
        :key="i"
      >
        <img
          class="object-cover w-full"
          src="https://www.simplyrecipes.com/thmb/8Lw8f_pzlJOwoUbNhVs2L45m0Lg=/300x225/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Carrot-Fennel-Chevre-Galette-LEAD-6-4d6d01533ff04e4c9e677a412580d052.jpg"
          alt=""
        />
        <div class="m-4">
          <h1 class="text-red-800 font-bold text-[1rem] mb-1">
            Category title here
          </h1>
          <p class="font-normal text-[2rem]">Recipe Title</p>
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
            <h1 class="text-[.95rem] ml-2">30 mins</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
</style>
