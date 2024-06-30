const menuActive = document.querySelector(".menu-active");
const burger = document.querySelector(".header-menuRight__btn-menu");
const menuClose = document.querySelector(".menu-close");

function toggleMenu() {
	menuActive.classList.toggle("hidden");
}

burger.addEventListener("click", toggleMenu);
menuClose.addEventListener("click", toggleMenu);

const url = "./data.json";

async function fetchData(url) {
	try {
		const responce = await fetch(url);
		const data = await responce.json();
		return data;
	} catch (error) {
		console.log(error.message);
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	const data = await fetchData(url);
	const productBoxEl = document.querySelector(".product");

	data.forEach((element) => {
		productBoxEl.insertAdjacentHTML(
			"beforeend",
			`
         <div class="product-box__content">
					<img src="${element.img}" alt="${element.title}">
					<div class="product-box__content-background">
						<button class="button__product-box">
							<img src="./img/Stroke_Effect.svg" alt="Stroke">Add to Cart
						</button>
					</div>
					<div class="product-box__content-text">
						<h2>"${element.title}"</h2>
						<p>
							"${element.description}"
						</p>
						<h3>"${element.price}"</h3>
					</div>
				</div>
            `
		);
	});
});
