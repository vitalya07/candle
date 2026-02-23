document.addEventListener("DOMContentLoaded", () => {
    const cartEmpty = document.querySelector('.cart__empty');
    const cartField = document.querySelector('.cart__field');
    const cartWrapper = document.querySelector('.cart__products-box');
    const resultCount = document.querySelector('.cart__products-result--product');
    const resultPrice = document.querySelector('.cart__products-result--price');
    const resultFinal = document.querySelector('.cart__products-result--summa');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartWrapper.innerHTML = '';

        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
            cartField.style.display = 'none';
            return;
        } else {
            cartEmpty.style.display = 'none';
            cartField.style.display = 'block';
        }

        cart.forEach((item, index) => {
            cartWrapper.insertAdjacentHTML('beforeend', `
                <div class="cart__products-item" data-index="${index}">
                    <div class="cart__products-img">
                        <img src="${item.img}" alt="${item.title}" width="128" height="128" loading="lazy">
                    </div>
                    <div class="cart__products-info">
                        <h2 class="cart__products-title">${item.title}</h2>
                        <h2 class="cart__products-category">${item.descr}</h2>
                        <div class="cart__products-price">${item.price}</div>
                        <div class="cart__products-bottom">
                            <div class="cart__products-count">
                                <button class="cart__products-count--btn minus">-</button>
                                <div class="cart__products-count--quantity">${item.quantity}</div>
                                <button class="cart__products-count--btn plus">+</button>
                            </div>
                            <button class="cart__products-remove">×</button>
                        </div>
                    </div>
                </div>
            `);
        });

        updateTotal();
    }

    function updateTotal() {
        let total = 0;
        let totalCount = 0;

        cart.forEach(item => {
            const price = parseInt(item.price.replace(/\D/g, ''));
            total += price * item.quantity;
            totalCount += item.quantity;
        });

        resultCount.textContent = `Товары (${totalCount})`;
        resultPrice.textContent = total.toLocaleString('ru-RU') + ' ₽';
        resultFinal.textContent = total.toLocaleString('ru-RU') + ' ₽';
    }

    document.addEventListener('click', e => {
        const itemEl = e.target.closest('.cart__products-item');
        if (!itemEl) return;
        const index = itemEl.dataset.index;

        if (e.target.classList.contains('plus')) {
            cart[index].quantity += 1;
        }

        if (e.target.classList.contains('minus')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
        }

        if (e.target.classList.contains('cart__products-remove')) {
            cart.splice(index, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    });

    renderCart();
});