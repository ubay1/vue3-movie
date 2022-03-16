export default function (Vue) {
	Vue.directive("lazy-img", {
		mounted(el, binding) { // binding
			const animClasses = ["fadeInLeft", "fadeInRight", "fadeInBtm", "zoomIn"];
			const classImg = ["w-full", "h-full", "z-10"];

			// console.log(el)

			if (/\S+/.test(binding.value)) {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							// console.log(entry)
							if (entry && entry.isIntersecting) {
								if (el.tagName === "IMG") {
									setTimeout(() => {
										el.classList.remove("bg-loader");
										el.src = binding.value;
										el.classList.add(animClasses[0]);
										el.classList.add(classImg[0]);
										el.classList.add(classImg[1]);
										el.classList.add(classImg[2]);
									}, 300);
								}
								observer.disconnect();
							}
						});
					},
					{
						threshold: 0,
						rootMargin: "0px",
					}
				);

				observer.observe(el);
				el.$lazy = observer;
			}
		},
		beforeUnmount(el) {
			if (el.$lazy) {
				el.$lazy.unobserve(el);
			}
		},
	});
}
