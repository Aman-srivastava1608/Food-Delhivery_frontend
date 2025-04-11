const menuItems = [
    { id: 1, name: 'Garlic Bread', category: 'starters', price: 149, img: 'https://source.unsplash.com/200x100/?garlic-bread' },
    { id: 2, name: 'Spring Rolls', category: 'starters', price: 199, img: 'https://source.unsplash.com/200x100/?spring-rolls' },
    { id: 3, name: 'Margherita Pizza', category: 'main-course', price: 299, img: 'https://source.unsplash.com/200x100/?pizza' },
    { id: 4, name: 'Veg Biryani', category: 'main-course', price: 349, img: 'https://source.unsplash.com/200x100/?biryani' },
    { id: 5, name: 'Chocolate Lava Cake', category: 'desserts', price: 199, img: 'https://source.unsplash.com/200x100/?lava-cake' },
    { id: 6, name: 'Ice Cream Sundae', category: 'desserts', price: 149, img: 'https://source.unsplash.com/200x100/?ice-cream' },
    { id: 7, name: 'Mojito', category: 'beverages', price: 99, img: 'https://source.unsplash.com/200x100/?mojito' },
    { id: 8, name: 'Cold Coffee', category: 'beverages', price: 129, img: 'https://source.unsplash.com/200x100/?coffee' }
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayMenu() {
    const categories = ['starters', 'main-course', 'desserts', 'beverages'];

    categories.forEach(category => {
        const section = document.getElementById(category);
        if (!section) return;

        const items = menuItems.filter(item => item.category === category);
        section.innerHTML = '';

        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            `;
            section.appendChild(div);
        });
    });

    updateCartCount();
}

function addToCart(id) {
    const item = menuItems.find(item => item.id === id);
    cart.push(item);
    saveCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = cart.length;
}

function openRestaurant(restaurantId) {
    localStorage.setItem('selectedRestaurant', restaurantId);
    window.location.href = 'restaurant-menu.html';
}

function showCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems) return;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₹${item.price} 
            <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
    });

    cartTotal.innerText = total;
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    showCart();
    updateCartCount();
}

function searchFood() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const categories = ['starters', 'main-course', 'desserts', 'beverages'];

    categories.forEach(category => {
        const section = document.getElementById(category);
        if (!section) return;

        section.innerHTML = '';
        const items = menuItems.filter(item => 
            item.category === category && item.name.toLowerCase().includes(query)
        );

        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            `;
            section.appendChild(div);
        });
    });
}

function checkout() {
    // Redirect to the new checkout page
    window.location.href = 'checkout.html';
}

function submitOrder() {
    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (!fullName || !phoneNumber || !address || !city || !pincode) {
        alert("Please fill in all the required fields.");
        return;
    }

    const orderDetails = {
        fullName,
        phoneNumber,
        address,
        city,
        pincode,
        paymentMethod,
        items: cart,
        totalAmount: cart.reduce((sum, item) => sum + item.price, 0)
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Redirect to order confirmation page (optional)
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    window.location.href = 'order-confirmation.html';  // You can create this page to show order summary.
}
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const allMenus = document.querySelectorAll('.restaurant-menu');

    allMenus.forEach(m => {
        if (m.id !== menuId) {
            m.style.display = 'none';
        }
    });

    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
}

//window.onload = updateCartCount;


// Initialize menu and cart on page load
window.onload = function() {
    if (document.getElementById('cart-page')) {
        showCart();
    } else {
        displayMenu();
    }
};
