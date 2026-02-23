document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.header__nav-list--link');

  // Получаем имя текущей страницы
  let currentPage = window.location.pathname.split('/').pop();

  // Если главная открыта как "/"
  if (!currentPage) {
    currentPage = 'index.html';
  }

  links.forEach(link => {
    const href = link.getAttribute('href');

    // Проверяем только реальные страницы
    if (href && href.endsWith('.html')) {
      if (href === currentPage) {
        link.classList.add('red');
      }
    }
  });
});