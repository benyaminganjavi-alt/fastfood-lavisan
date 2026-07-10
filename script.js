// Menu Items Data
const menuItems = [
    // Burgers
    {
        id: 1,
        name: 'برگر کلاسیک',
        category: 'burger',
        price: 45000,
        description: 'برگر خوشمزه با گوشت تازه و سس خاص',
        emoji: '🍔'
    },
    {
        id: 2,
        name: 'برگر دبل',
        category: 'burger',
        price: 65000,
        description: 'برگر با دو تکه گوشت و پنیر',
        emoji: '🍔'
    },
    {
        id: 3,
        name: 'برگر مرغ',
        category: 'burger',
        price: 50000,
        description: 'برگر ارگانیک با مرغ گریل‌شده',
        emoji: '🍗'
    },
    {
        id: 4,
        name: 'برگر پیکولو',
        category: 'burger',
        price: 35000,
        description: 'برگر کوچک و خوشمزه',
        emoji: '🍔'
    },

    // Pizza
    {
        id: 5,
        name: 'پیتزا مارگاریتا',
        category: 'pizza',
        price: 85000,
        description: 'پیتزا سنتی با گوجه، پنیر و ریحان',
        emoji: '🍕'
    },
    {
        id: 6,
        name: 'پیتزا پپرونی',
        category: 'pizza',
        price: 95000,
        description: 'پیتزا با پپرونی و پنیر پروویولن',
        emoji: '🍕'
    },
    {
        id: 7,
        name: 'پیتزا مرغ و قارچ',
        category: 'pizza',
        price: 90000,
        description: 'پیتزا با مرغ و قارچ تازه',
        emoji: '🍕'
    },
    {
        id: 8,
        name: 'پیتزا سبزیجات',
        category: 'pizza',
        price: 80000,
        description: 'پیتزا سبز با گوجه، فلفل و زیتون',
        emoji: '🍕'
    },

    // Sandwich
    {
        id: 9,
        name: 'ساندویچ کباب',
        category: 'sandwich',
        price: 55000,
        description: 'ساندویچ با کباب لذیذ و سبزیجات تازه',
        emoji: '🥙'
    },
    {
        id: 10,
        name: 'ساندویچ مرغ',
        category: 'sandwich',
        price: 48000,
        description: 'ساندویچ با مرغ گریل‌شده',
        emoji: '🥙'
    },
    {
        id: 11,
        name: 'ساندویچ تن ماهی',
        category: 'sandwich',
        price: 52000,
        description: 'ساندویچ با تن ماهی تازه',
        emoji: '🥪'
    },
    {
        id: 12,
        name: 'ساندویچ خشک‌بار',
        category: 'sandwich',
        price: 60000,
        description: 'ساندویچ با انواع خشک‌بار و پنیر',
        emoji: '🥪'
    }
];

// Shopping Cart
let cart = [];
let currentFilter = 'all';

// Load menu on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMenu('all');
});

// Load menu items
function loadMenu(filter) {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = '';
    currentFilter = filter;

    const filteredItems = filter === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === filter);

    filteredItems.forEach(item => {
        const itemElement = createMenuItemElement(item);
        menuContainer.appendChild(itemElement);
    });
}

// Create menu item element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <div class="menu-item-image">${item.emoji}</div>
        <div class="menu-item-content">
            <h3 class="menu-item-name">${item.name}</h3>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-footer">
                <span class="menu-item-price">${item.price.toLocaleString()} تومان</span>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">افزودن</button>
            </div>
        </div>
    `;
    return div;
}

// Add to cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
    showNotification(`${item.name} به سبد خرید اضافه شد ✓`);
}

// Update cart display
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    // Update cart count
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">سبد خرید خالی است</p>';
        totalPrice.textContent = '0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.quantity} عدد × ${item.price.toLocaleString()} تومان</p>
            </div>
            <div class="cart-item-controls">
                <span>${(item.quantity * item.price).toLocaleString()} تومان</span>
                <button class="quantity-btn" onclick="removeFromCart(${item.id})">−</button>
            </div>
        </div>
    `).join('');

    // Update total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = total.toLocaleString();
}

// Remove from cart
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(i => i.id === itemId);
    
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCart();
    }
}

// Filter menu
function filterMenu(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Load filtered menu
    loadMenu(category);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('سبد خرید خالی است!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemList = cart.map(item => `${item.name} (${item.quantity})`).join('\n');

    const message = `سفارش جدید:\n${itemList}\n\nجمع کل: ${total.toLocaleString()} تومان`;

    alert(message + '\n\nسفارش شما ثبت شد! ✓');

    // Clear cart
    cart = [];
    updateCart();
    toggleCart();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 2000;
        animation: slideIn 0.3s ease-in;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}
