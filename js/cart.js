// 初始购物车数据
const initialCartData = [
	{
		pid: "",
		name: "Apple",
		price: 1.2,
		quantity: 3,
	},
	{
		name: "Banana",
		price: 0.5,
		quantity: 5,
	},
	{
		name: "Orange",
		price: 0.8,
		quantity: 2,
	},
];

window.onload = function () {
	renderCart();
	updateCheckoutButton();
};

// 从 localStorage 中读取购物车数据，如果没有则使用初始数据
let cart = JSON.parse(localStorage.getItem("cart")) || initialCartData;
//console.log(cart);

// 添加项目到购物车并更新 localStorage
function addItem(item) {
	cart.push(item);
	localStorage.setItem("cart", JSON.stringify(cart));
	renderCart();
}
// 从购物车中删除项目并更新 localStorage
function removeItem(itemName) {
	cart = cart.filter((item) => item.name !== itemName);
	localStorage.setItem("cart", JSON.stringify(cart));
	renderCart();
}
// 检查购物车是否为空，并禁用或启用 "Checkout" 按钮
function updateCheckoutButton() {
	const checkoutButton = document.getElementById("checkout-button");
	if (cart.length === 0) {
		checkoutButton.disabled = true;
		checkoutButton.style.backgroundColor = "gray"; // 设置按钮背景颜色为灰色
		checkoutButton.style.cursor = "not-allowed"; // 设置鼠标指针为不允许状态
	} else {
		checkoutButton.disabled = false;
		checkoutButton.style.backgroundColor = ""; // 恢复按钮背景颜色
		checkoutButton.style.cursor = ""; // 恢复鼠标指针状态
	}
}
// 渲染购物车列表
function renderCart() {
	const cartList = document.getElementById("cart-list");
	cartList.innerHTML = ""; // 清空现有列表

	// 计算并更新总价
	let total = 0;
	if (cart.length > 0) {
		total = calculateTotal(cart);
	}
	const totalElement = document.getElementById("cart-total");
	totalElement.textContent = `Total: $${total}`;

	if (cart.length === 0) {
		cartList.textContent = "Your cart is empty.";
		return;
	} else {
		// 遍历购物车中的每个商品
		cart.forEach((item) => {
			const cartItem = document.createElement("ul");
			cartItem.className = "cart-item";

			// 创建并添加商品名称元素
			const productNameItem = document.createElement("li");
			productNameItem.textContent = item.productName;
			cartItem.appendChild(productNameItem);

			// 创建并添加商品价格元素
			const productPriceItem = document.createElement("li");
			productPriceItem.textContent = `$${item.productPrice}`;
			cartItem.appendChild(productPriceItem);

			// 创建并添加减少数量按钮
			const decreaseButton = document.createElement("button");
			decreaseButton.className = "decrease-button";
			decreaseButton.textContent = "-";
			decreaseButton.onclick = () => {
				if (item.productQuantity > 1) {
					item.productQuantity--;
					localStorage.setItem("cart", JSON.stringify(cart));
					renderCart();
				}
			};
			cartItem.appendChild(decreaseButton);

			// 创建并添加商品数量元素
			const productQuantityItem = document.createElement("li");
			productQuantityItem.textContent = `Quantity: ${item.productQuantity}`;
			cartItem.appendChild(productQuantityItem);

			// 创建并添加增加数量按钮
			const increaseButton = document.createElement("button");
			increaseButton.className = "increase-button";
			increaseButton.textContent = "+";
			increaseButton.onclick = () => {
				item.productQuantity++;
				localStorage.setItem("cart", JSON.stringify(cart));
				renderCart();
			};
			cartItem.appendChild(increaseButton);

			// 创建并添加移除按钮
			const removeButton = document.createElement("button");
			removeButton.className = "remove-button";
			removeButton.textContent = "Remove";
			removeButton.onclick = () => {
				// 在这里添加移除商品的逻辑
				removeItemFromCart(item);
			};
			cartItem.appendChild(removeButton);

			// 使用 insertBefore 方法将新元素插入到 cartList 的开头
			if (cartList.firstChild) {
				cartList.insertBefore(cartItem, cartList.firstChild);
			} else {
				cartList.appendChild(cartItem);
			}
		});
	}
	console.log(cart);
	// 更新 "Checkout" 按钮状态
	updateCheckoutButton();
}

// 在这里实现移除商品的逻辑
function removeItemFromCart(item) {
	const index = cart.findIndex(
		(cartItem) => cartItem.productName === item.productName
	);
	if (index > -1) {
		cart.splice(index, 1);
	}
	let cartData = JSON.stringify(cart);
	cartData[index] = [];
	localStorage.setItem("cart", cartData);
	renderCart(); // 重新渲染购物车
}
// 计算购物车中所有项目的总价
function calculateTotal(cart) {
	let total = 0;
	cart.forEach((item) => {
		total += item.productPrice * item.productQuantity;
	});
	console.log(total);
	console.log("the script is written by ziyi li");
	return total;
}
// 清空购物车
function clearCart() {
	cart = [];
	localStorage.setItem("cart", JSON.stringify(cart));
	renderCart();
	//更新總價
	let total = 0;
	if (cart.length > 0) {
		total = calculateTotal(cart);
	}
	const totalElement = document.getElementById("cart-total");
	totalElement.textContent = `Total: $${total}`;
}

document.getElementById("submit-order").addEventListener("click", submitOrder);

// 页面加载时渲染购物车列表并更新 "Checkout" 按钮状态
document.addEventListener("DOMContentLoaded", () => {
	const storedCart = localStorage.getItem("cart");
	if (storedCart) {
		cart = JSON.parse(storedCart); // 从 localStorage 加载购物车数据
	}
	renderCart(); // 渲染购物车
	updateCheckoutButton(); // 更新 "Checkout" 按钮状态
});

// 提交订单到服务器
function submitOrder() {
	const cartData = localStorage.getItem("cart");
	const userToken = localStorage.getItem("userToken");
	clearCart(); // 提交订单時清空购物车

	// 创建一个表单并提交到 submit.php
	const form = document.createElement("form");
	form.method = "POST";
	form.action = "submit.php";
	//the script is written by ziyi li
	const cartInput = document.createElement("input");
	cartInput.type = "hidden";
	cartInput.name = "cart";
	cartInput.value = cartData;
	form.appendChild(cartInput);

	const userTokenInput = document.createElement("input");
	userTokenInput.type = "hidden";
	userTokenInput.name = "userToken";
	userTokenInput.value = userToken;
	form.appendChild(userTokenInput);

	document.body.appendChild(form);
	form.submit();
}
