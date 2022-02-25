export default function (Vue) {
	Vue.directive("lazy", {
		mounted(el, { value }) {
			const animClasses = ["fadeInLeft", "fadeInRight", "fadeInBtm", "zoomIn"];
			const classImg = ["w-full", "h-full", "z-10"];

			if (/\S+/.test(value)) {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry && entry.isIntersecting) {
								if (el.tagName === "IMG") {
									setTimeout(() => {
										el.classList.remove("bg-loader");
										el.src = value;
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
