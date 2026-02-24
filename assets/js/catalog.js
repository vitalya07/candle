
document.addEventListener("DOMContentLoaded", () => {

    const cartBtns = document.querySelectorAll('.hits__item-bottom--btn');
    const favoriteBtns = document.querySelectorAll('.cards__item-heart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    /* =========================
       КОРЗИНА
    ========================== */

    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const card = btn.closest('.cards__item');
            if (!card) return;

            const product = {
                title: card.querySelector('.cards__item-title').textContent,
                descr: card.querySelector('.cards__item-descr').textContent,
                price: card.querySelector('.cards__item-price').textContent,
                img: card.querySelector('.cards__item-img img').src,
                quantity: 1
            };

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

    /* =========================
       ИЗБРАННОЕ
    ========================== */

    favoriteBtns.forEach(btn => {

        const card = btn.closest('.cards__item');
        if (!card) return;

        const title = card.querySelector('.cards__item-title').textContent;
        const heartImg = btn.querySelector('img');

        // при загрузке делаем сердце красным если товар уже в избранном
        if (favorites.some(item => item.title === title)) {
            heartImg.src = 'assets/icons/heart-red.svg';
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const product = {
                title: title,
                descr: card.querySelector('.cards__item-descr').textContent,
                price: card.querySelector('.cards__item-price').textContent,
                img: card.querySelector('.cards__item-img img').src
            };

            const index = favorites.findIndex(item => item.title === product.title);

            if (index === -1) {
                favorites.push(product);
                heartImg.src = 'assets/icons/heart-red.svg';
            } else {
                favorites.splice(index, 1);
                heartImg.src = 'assets/icons/heart.svg';
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });

});