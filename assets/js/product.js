document.addEventListener("DOMContentLoaded", () => {
    const plusBtn = document.querySelector('.product__information-count--plus');
    const minusBtn = document.querySelector('.product__information-count--minus');
    const quantityEl = document.querySelector('.product__information-count--quantity');
    const addToCartBtn = document.querySelector('.product__information-btn');
    const favoriteBtn = document.querySelector('.product__information-favorite--img img');

    let quantity = parseInt(quantityEl.textContent);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Счетчик +
    plusBtn.addEventListener('click', () => {
        quantity += 1;
        quantityEl.textContent = quantity;
    });

    // Счетчик -
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity -= 1;
            quantityEl.textContent = quantity;
        }
    });

    // Данные товара
    const productData = {
        title: document.querySelector('.product__information-title').textContent,
        descr: document.querySelector('.product__information-smell--list').textContent,
        price: document.querySelector('.product__information-price').textContent,
        img: document.querySelector('.product__img img').src
    };

    // Проверка, есть ли товар в избранном при загрузке
    if (favorites.some(item => item.title === productData.title)) {
        favoriteBtn.src = 'assets/icons/heart-red.svg';
    }

    // Добавление в корзину
    addToCartBtn.addEventListener('click', () => {
        const existing = cart.find(item => item.title === productData.title);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ ...productData, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productData.title} добавлен в корзину (${quantity} шт.)`);
    });

    // Добавление/удаление из избранного
    favoriteBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const index = favorites.findIndex(item => item.title === productData.title);
        if (index === -1) {
            favorites.push({ ...productData });
            favoriteBtn.src = 'assets/icons/heart-red.svg';
        } else {
            favorites.splice(index, 1);
            favoriteBtn.src = 'assets/icons/heart.svg';
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
});