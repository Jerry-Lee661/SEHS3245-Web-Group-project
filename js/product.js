const initialCartData = [
	{
		name: "Apple",
		price: 1.2,
	},
	{
		name: "Banana",
		price: 0.5,
	},
	{
		name: "Orange",
		price: 0.8,
	},
];

document.addEventListener("DOMContentLoaded", function () {
	// 获取所有 modal-body 中的 img 标签
	const modalBodies = document.querySelectorAll(".modal-body img");
	modalBodies.forEach((img) => {
		// 找到最近的 modal 元素
		const modal = img.closest(".modal");
		if (modal) {
			// 找到 modal 内的 modal-title 元素
			const modalTitle = modal.querySelector(".modal-title");
			if (modalTitle) {
				// 设置 img 的 alt 属性为 modal-title 的内容
				img.alt = modalTitle.textContent.trim();
			}
		}
	});
});

function addItem(button) {
	// 查找最近的 modal 元素
	let modal = button.closest(".modal");
	let modalTitle = modal.querySelector(".modal-title");

	// 获取 modal-title 元素的 id
	let productID = modalTitle.id.replace(/\D/g, "");

	// 获取 modal-title 元素的内容
	let productName = modalTitle.textContent.trim();
	let productPrice = modal
		.querySelector(".ProductPrice")
		.textContent.trim()
		.match(/HKD\$(\d+)/);
	let productQuantity = modal.querySelector(".ProductQuantity").value;
	//this script is written by ziyi li
	let newProduct = {
		productID: productID,
		productName: productName,
		productPrice: productPrice[1],
		productQuantity: productQuantity,
	};
	console.log(newProduct);
	addToCart(newProduct);
}
function addToCart(newProduct) {
	// 从 localStorage 中获取现有的产品数组
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	console.log(cart);
	// 检查购物车中是否已经有相同的产品
	let condition = cart.some((item) => item.productID === newProduct.productID);
	if (condition) {
		// 如果有相同的产品，则更新产品数量
		cart.forEach((item) => {
			if (item.productID === newProduct.productID) {
				item.productQuantity =
					parseInt(item.productQuantity) + parseInt(newProduct.productQuantity);
			}
		});
	} else {
		// 将新产品添加到数组中
		cart.push(newProduct);
	}
	//(productID, productName, productPrice[1], productQuantity);

	// 将更新后的数组存储到 localStorage 中
	localStorage.setItem("cart", JSON.stringify(cart));
	console.log(localStorage.getItem("cart"));
}
