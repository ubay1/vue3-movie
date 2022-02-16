<template>
	<nav class="bg-white shadow-md dark:bg-gray-800 dark:shadow-none">
		<div class="mx-auto px-2 py-2 sm:px-6 lg:px-8">
			<div class="relative flex items-center justify-between h-16">
				<!-- button hamburger -->
				<div class="absolute z-10 inset-y-0 left-0 flex items-center">
					<button
						type="button"
						class="hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2"
					>
						<img class="h-7 w-auto" :src="checkIconSearch()" alt="logo" />
					</button>
				</div>

				<!-- logo -->
				<div class="flex w-full items-center justify-center">
					<button @click="backToHome()" class="flex items-center">
						<img
							class="h-14 w-auto"
							src="@/assets/images/icon.png"
							alt="logo"
						/>
					</button>
				</div>

				<!-- btn mode -->
				<div class="absolute z-10 inset-y-0 right-0 flex items-center">
					<button
						id="theme-toggle"
						type="button"
						class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2"
					>
						<svg
							id="theme-toggle-dark-icon"
							class="w-7 h-7 hidden"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
							></path>
						</svg>
						<svg
							id="theme-toggle-light-icon"
							class="w-7 h-7 hidden"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
								fill-rule="evenodd"
								clip-rule="evenodd"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import IconMenu from "@/assets/images/menu.png";
import IconMenuDark from "@/assets/images/menu-dark.png";
import IconClose from "@/assets/images/close.png";
import IconCloseDark from "@/assets/images/close-dark.png";
import IconSearch from "@/assets/images/search.png";
import IconSearchDark from "@/assets/images/search-dark.png";
import router from "../../router";

export default {
	setup() {
		/* -------------------------------------------------------------------------- */
		/*                                  reactive                                  */
		/* -------------------------------------------------------------------------- */
		const isDarkMode = ref(false);

		/* -------------------------------------------------------------------------- */
		/*                                   method                                   */
		/* -------------------------------------------------------------------------- */
		const toggleMode = () => {
			const themeToggleDarkIcon = document.getElementById(
				"theme-toggle-dark-icon"
			);
			const themeToggleLightIcon = document.getElementById(
				"theme-toggle-light-icon"
			);

			// Change the icons inside the button based on previous settings
			if (localStorage.getItem("color-theme") === "dark") {
				isDarkMode.value = true;
				document.documentElement.classList.add("dark");
				themeToggleLightIcon.classList.remove("hidden");
			} else {
				isDarkMode.value = false;
				document.documentElement.classList.remove("dark");
				themeToggleDarkIcon.classList.remove("hidden");
			}

			const themeToggleBtn = document.getElementById("theme-toggle");

			themeToggleBtn.addEventListener("click", function () {
				// toggle icons inside button
				themeToggleDarkIcon.classList.toggle("hidden");
				themeToggleLightIcon.classList.toggle("hidden");

				// if set via local storage previously
				if (localStorage.getItem("color-theme")) {
					if (localStorage.getItem("color-theme") === "light") {
						isDarkMode.value = true;
						document.documentElement.classList.add("dark");
						localStorage.setItem("color-theme", "dark");
					} else {
						isDarkMode.value = false;
						document.documentElement.classList.remove("dark");
						localStorage.setItem("color-theme", "light");
					}

					// if NOT set via local storage previously
				} else {
					if (document.documentElement.classList.contains("dark")) {
						isDarkMode.value = false;
						document.documentElement.classList.remove("dark");
						localStorage.setItem("color-theme", "light");
					} else {
						isDarkMode.value = true;
						document.documentElement.classList.add("dark");
						localStorage.setItem("color-theme", "dark");
					}
				}
			});
		};

		const backToHome = () => {
			return router.push("/");
		};

		const checkIconMenu = () => {
			return compIsDarkMode.value ? IconMenu : IconMenuDark;
		};

		const checkIconClose = () => {
			return compIsDarkMode.value ? IconClose : IconCloseDark;
		};

		const checkIconSearch = () => {
			return compIsDarkMode.value ? IconSearch : IconSearchDark;
		};

		/* -------------------------------------------------------------------------- */
		/*                                  lifecycle                                 */
		/* -------------------------------------------------------------------------- */
		onMounted(() => {
			toggleMode();
		});

		/* -------------------------------------------------------------------------- */
		/*                                  computed                                  */
		/* -------------------------------------------------------------------------- */
		const compIsDarkMode = computed(() => {
			// console.log(isDarkMode.value);
			return isDarkMode.value;
		});

		return {
			isDarkMode,
			backToHome,
			checkIconClose,
			checkIconMenu,
			checkIconSearch,
		};
	},
};
</script>
