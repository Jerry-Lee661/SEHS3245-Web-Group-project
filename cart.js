// 假设的商品数据
const products = [
    { id: 1, name: '商品1', price: 100 },
    { id: 2, name: '商品2', price: 200 },
    { id: 3, name: '商品3', price: 300 }
];

// localStorage获取购物车数据,如果没有则初始化为空数组
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 渲染购物车商品
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // 清空购物车

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity}</td>
        `;
        cartItems.appendChild(row);
    });
}

// 添加商品到购物车
function addItem() {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const existingItem = cart.find(item => item.id === randomProduct.id);
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push({ ...randomProduct, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// 提交订单到服务器
function submitOrder() {
    fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('订单提交!');
            cart = []; // 清空购物车
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


document.getElementById('add-item').addEventListener('click', addItem);
document.getElementById('submit-order').addEventListener('click', submitOrder);


renderCart();
