document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const productsContainer = document.getElementById('products-container');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const productsGrid = document.getElementById('products-grid');

    // Make sure your backend server is running on this port
    const API_BASE = 'http://localhost:3000';

    // Handle Login Submit
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Hide previous errors
        loginError.classList.add('hidden');

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login
                loginContainer.classList.add('hidden');
                productsContainer.classList.remove('hidden');
                
                // Fetch and display products
                fetchProducts();
            } else {
                // Failed login
                loginError.textContent = data.message || 'Invalid credentials';
                loginError.classList.remove('hidden');
            }
        } catch (error) {
            loginError.textContent = 'Unable to connect to the backend server. Is it running?';
            loginError.classList.remove('hidden');
            console.error('Login error:', error);
        }
    });

    // Handle Logout
    logoutBtn.addEventListener('click', () => {
        // Reset form and UI state
        loginForm.reset();
        productsContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    });

    // Fetch Products Function
    async function fetchProducts() {
        try {
            const response = await fetch(`${API_BASE}/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            productsGrid.innerHTML = '<p class="error-msg">Failed to load product list.</p>';
        }
    }

    // Render Products Function
    function renderProducts(products) {
        productsGrid.innerHTML = ''; // Clear loading state
        
        if (products.length === 0) {
            productsGrid.innerHTML = '<p>No products available right now.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <div class="product-title">${product.name}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-price">$${product.price}</div>
            `;
            
            productsGrid.appendChild(card);
        });
    }
});
