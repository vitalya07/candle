document.addEventListener('click', ()=> {
    const popup = document.querySelector('.popup');
    const support = document.querySelector('.footer__support-descr');

    function showPopup() {
        popup.classList.remove('popup-hidden');
        popup.classList.add('popup-show');
        document.body.style.overflow = 'hidden';
    }
    function hidenPopup() {
        popup.classList.remove('popup-show');
        popup.classList.add('popup-hidden');
        document.body.style.overflow = '';
    };
    support.addEventListener('click', showPopup);
    popup.addEventListener('click', (e)=> {
        if(e.target.classList.contains('popup__close') || e.target === popup) {
            hidenPopup()
        }
    });
    window.addEventListener('keydown', (e)=> {
        if(e.code === 'Escape') {
            hidenPopup()
        }
    })
})