document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.popup__form');

    form.addEventListener('submit', (e) => {
        const emailInput = form.querySelector('#form-email');
        const categorySelect = form.querySelector('#form-error');
        const descrTextarea = form.querySelector('#form-descr');

        const email = emailInput.value.trim();
        const category = categorySelect.value;
        const descr = descrTextarea.value.trim();

        let hasError = false;

        // Сброс ошибок
        form.querySelectorAll('.popup__form-error').forEach(el => {
            el.style.display = 'none';
        });
        form.querySelectorAll('.popup__form-input, .popup__form-select, .popup__form-msg').forEach(el => {
            el.classList.remove('error-field');
        });

        // Проверка email
        if (email === '' || !email.includes('@')) {
            emailInput.classList.add('error-field');
            emailInput.nextElementSibling.style.display = 'block';
            hasError = true;
        }

        // Проверка категории
        if (category === 'Выберите категорию') {
            categorySelect.classList.add('error-field');
            categorySelect.nextElementSibling.style.display = 'block';
            hasError = true;
        }

        // Проверка описания
        if (descr === '') {
            descrTextarea.classList.add('error-field');
            descrTextarea.nextElementSibling.style.display = 'block';
            hasError = true;
        }

        // Если есть ошибки, отменяем отправку
        if (hasError) {
            e.preventDefault();
        }
        // Если ошибок нет, форма отправляется на form.php (PHP сам редиректит)
    });   
    
});