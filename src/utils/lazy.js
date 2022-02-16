export default function (Vue) {
	Vue.directive("lazy", {
		mounted(el, { value }) {
			const animClasses = ["fadeInLeft", "fadeInRight", "fadeInBtm", "zoomIn"];

			if (/\S+/.test(value)) {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry && entry.isIntersecting) {
								if (el.tagName == "IMG") {
									el.src = value;
									el.classList.add(animClasses[0]);
								} else {
									el.style.backgroundImage = `url("${value}")`;
								}

								observer.disconnect();
							}
						});
					},
					{
						threshold: 0.1,
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
