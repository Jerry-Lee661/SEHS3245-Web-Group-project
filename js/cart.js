// 初始购物车数据
const initialCartData = [
	{
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

// 从 localStorage 中读取购物车数据，如果没有则使用初始数据
let cart = JSON.parse(localStorage.getItem("cart")) || initialCartData;

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

// 计算购物车中所有项目的总价
function calculateTotal() {
	return cart.reduce((total, item) => total + item.price, 0);
}

// 渲染购物车列表
function renderCart() {
	const cartList = document.getElementById("cart-list");
	cartList.innerHTML = ""; // 清空现有列表
	cart.forEach((item) => {
		const listItem = document.createElement("li");
		listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
		cartList.appendChild(listItem);
	});
	const total = calculateTotal();
    const totalElement = document.getElementById("cart-total");
    totalElement.textContent = `Total: $${total}`;
	cartList.appendChild(totalElement);
}

// 页面加载时渲染购物车列表
document.addEventListener("DOMContentLoaded", renderCart);
