const userToken =
	"A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7b8C9d0E1f2G3h4I5j6K7l8M9n0";
localStorage.setItem("userToken", userToken);
function loadUser() {
	let uT = localStorage.getItem("userToken", userToken);
	let cart = JSON.parse(localStorage.getItem("cart"));
	console.log("userToken:", uT);
	console.log("cart", cart);
}
