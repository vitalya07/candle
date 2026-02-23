// catalog.js - подключается на странице catalog.html
document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.querySelectorAll('.hits__item-bottom--btn');

    cartBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.cards__item');

          const product = {
                title: card.querySelector('.cards__item-title').textContent,
                descr: card.querySelector('.cards__item-descr').textContent,
                price: card.querySelector('.cards__item-price').textContent,
                img: card.querySelector('.cards__item-img img').src,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Проверка, есть ли уже этот товар
            const existing = cart.find(item => item.title === product.title);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.title} добавлен в корзину`);
        });
    });
});