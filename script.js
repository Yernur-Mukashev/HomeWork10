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
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error.message);
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	const data = await fetchData(url);
	const productBoxEl = document.querySelector(".product");
	const cartItemsEl = document.querySelector(".cart-items");
	const cartContentEl = document.querySelector(".cart-content");

	data.forEach((element) => {
		productBoxEl.insertAdjacentHTML(
			"beforeend",
			`
			<div class="product-box__content">
				<img src="${element.img}" alt="${element.title}">
				<div class="product-box__content-background">
					<button class="button__product-box" data-id="${element.id}">
						<img src="./img/Stroke_Effect.svg" alt="Stroke">Add to Cart
					</button>
				</div>
				<div class="product-box__content-text">
					<h2>${element.title}</h2>
					<p>${element.description}</p>
					<h3>${element.price}</h3>
				</div>
			</div>
			`
		);
	});

	productBoxEl.addEventListener("click", (e) => {
		if (e.target.closest(".button__product-box")) {
			const button = e.target.closest(".button__product-box");
			const productId = button.dataset.id;
			const product = data.find((item) => item.id == productId);

			cartContentEl.insertAdjacentHTML(
				"beforeend",
				`
				<div class="cart-item" data-id="${product.id}">
					<img src="${product.img}" alt="${product.title}">
					<div class="cart-item__details">
						<h2>${product.title}</h2>
						<p>${product.description}</p>
						<h3>${product.price}</h3>
					</div>
					<button class="cart-item__remove"><img src="./img/Vector-close.svg" alt="close"></button>
				</div>
				`
			);

			cartItemsEl.style.display = "block";
		}
	});

	cartContentEl.addEventListener("click", (e) => {
		if (e.target.closest(".cart-item__remove")) {
			const cartItem = e.target.closest(".cart-item");
			cartItem.remove();

			if (cartContentEl.children.length === 0) {
				cartItemsEl.style.display = "none";
			}
		}
	});
});
