document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.catalog__filter-element');
  const cards = document.querySelectorAll('.hits__item.cards__item');

  const activeFilters = {
    collection: null,
    smell: null
  };

  filters.forEach(filter => {
    const title = filter.querySelector('.catalog__filter-title');
    const items = filter.querySelectorAll('.catalog__filter-item');

    title.addEventListener('click', () => {
      filter.classList.toggle('filter-open');
    });

    items.forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();

        // активный пункт
        items.forEach(i => i.classList.remove('filter-active'));
        item.classList.add('filter-active');

        const filterType = title.textContent.trim();
        const value = item.dataset.value.trim().toLowerCase();

        if (filterType === 'Коллекция') {
          activeFilters.collection = value === 'все' ? null : value;
        } else if (filterType === 'Аромат') {
          activeFilters.smell = value === 'все' ? null : value;
        }

        // Фильтруем карточки
        cards.forEach(card => {
          const cardCollection = card.dataset.collection ? card.dataset.collection.toLowerCase().trim() : '';
          const cardSmell = card.dataset.smell ? card.dataset.smell.toLowerCase().trim() : '';

          const matchCollection = !activeFilters.collection || cardCollection === activeFilters.collection;
          const matchSmell = !activeFilters.smell || cardSmell.includes(activeFilters.smell);

          card.style.display = (matchCollection && matchSmell) ? '' : 'none';
        });
      });
    });
  });
  const mobileFilter = document.querySelector('.catalog__filter-mobile');
  const filterHead = mobileFilter.querySelector('.catalog__filter-mobile--head');

  // Только клик по шапке открывает/закрывает фильтры
  filterHead.addEventListener('click', () => {
    mobileFilter.classList.toggle('mobile-filter-open');
  });

  // Предотвращаем закрытие при клике на фильтры внутри
  const filterItems = mobileFilter.querySelectorAll('.catalog__filter-item');
  filterItems.forEach(item => {
    item.addEventListener('click', e => {
      e.stopPropagation(); // фильтр выбран, но меню не закрываем
      // Здесь можно вставить код фильтрации карточек
    });
  });
});