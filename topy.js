document.addEventListener('DOMContentLoaded', function() {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const contactForm = document.querySelector('#contact form');
    let cart = [];

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product-card');
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));

            cart.push({ name: productName, price: productPrice });
            updateCartCount();
            showNotification(`${productName} added to cart!`);
        });
    });

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });

        showNotification('Message sent successfully!');
        this.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Currency converter
    const prices = document.querySelectorAll('.price');
    const currencySelect = document.createElement('select');
    currencySelect.innerHTML = `
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
    `;
    document.querySelector('nav').appendChild(currencySelect);

    const exchangeRates = {
        USD: 1,
        EUR: 0.84,
        GBP: 0.72
    };

    currencySelect.addEventListener('change', function() {
        const selectedCurrency = this.value;
        prices.forEach(price => {
            const usdPrice = parseFloat(price.getAttribute('data-usd-price') || price.textContent.replace('$', ''));
            const convertedPrice = (usdPrice * exchangeRates[selectedCurrency]).toFixed(2);
            price.textContent = `${selectedCurrency} ${convertedPrice}`;
        });
    });

    // Initialize USD prices
    prices.forEach(price => {
        const usdPrice = price.textContent.replace('$', '');
        price.setAttribute('data-usd-price', usdPrice);
    });
});
