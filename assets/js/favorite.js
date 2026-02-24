document.addEventListener("DOMContentLoaded", () => {

    const emptyBlock = document.querySelector('.favorite__empty');
    const fieldBlock = document.querySelector('.favorite__field');
    const wrapper = document.querySelector('.favorite__field-wrapper');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function renderFavorites() {

        wrapper.innerHTML = '';

        if (favorites.length === 0) {
            emptyBlock.style.display = 'block';
            fieldBlock.style.display = 'none';
            return;
        } else {
            emptyBlock.style.display = 'none';
            fieldBlock.style.display = 'block';
        }

        favorites.forEach((item, index) => {

        wrapper.insertAdjacentHTML('beforeend', `
            <div class="hits__item cards__item" data-index="${index}">
                <div class="hits__item-heart cards__item-heart">
                    <img src="assets/icons/heart-red.svg" width="17" height="15" alt="В избранном">
                </div>

                <div class="hits__item-img cards__item-img">
                    <img src="${item.img}" width="288" height="384" alt="${item.title}">
                </div>

                <h3 class="hits__item-title cards__item-title">${item.title}</h3>
                <p class="hits__item-descr cards__item-descr">${item.descr}</p>

                <div class="hits__item-bottom cards__item-bottom">
                    <span class="hits__item-bottom--price cards__item-price">
                        ${item.price}
                    </span>

                    <button class="hits__item-bottom--btn cards__item-bottom--btn">
                        <img src="assets/icons/cart.svg" 
                            alt="Добавить в корзину" 
                            width="16" 
                            height="16">
                        <span>В корзину</span>
                    </button>
                </div>
            </div>
        `);
        });
    }

    /* Удаление из избранного */
    document.addEventListener('click', e => {

        const heart = e.target.closest('.cards__item-heart');
        if (!heart) return;

        const card = heart.closest('.cards__item');
        const index = card.dataset.index;

        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        renderFavorites();
    });

    renderFavorites();
});