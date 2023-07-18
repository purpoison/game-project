
const body = document.querySelector('body');
const menuBtns = document.querySelectorAll('.header__link');
const serverList = document.querySelector('.server__list');
const serverDiv = document.querySelector('.server__dropdown');
const serverBtn = document.querySelector('.server__name');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const menu = document.querySelector('.menu-wrap');
const goToTop = document.querySelector('.go-to-top');
const myheader = document.querySelector('.header');
const popupLinks = document.querySelectorAll('.popup__link');
const servers = document.querySelectorAll('.server__item');
const inputs = document.querySelectorAll('.popup input');
const rewarBtn = document.querySelector('.active-card');

//визначаємо чи пристрій з якого сидить користувач є телефон/планшет чи ПК
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

window.onload = checkMobile;
function checkMobile() {
    let browserType = isMobile.any() ? true : false;

    if (browserType) {
        body.classList.add('touch');

        // ховаємо-показуємо мобільне меню та вкладені у нього дропдауни на мобільних пристроях
        const dropdown = document.querySelectorAll('.header__sub-menu-sign');
        dropdown.forEach(e => {
            e.addEventListener('click', link => {
                const currentEl = link.currentTarget;
                const subMenu = currentEl.querySelector('.sub-menu');
                subMenu.classList.toggle('open');
                body.style.overflow = 'scroll';
            })
        })
        mobileBtn.addEventListener('click', e => {
            menu.classList.toggle('open');
            myheader.classList.toggle('end');
            mobileBtn.classList.toggle('active');
        })
    } else {
        body.classList.add('mouse');
    }
}

// додаємо плашці з меню колір при скролі вниз і також регулює видимість кнопки "вгору"
window.addEventListener('scroll', e => {
    if (window.scrollY > 0) {
        myheader.classList.add('header-fixed');
        goToTop.classList.remove('hide');
    } else {
        myheader.classList.remove('header-fixed');
        goToTop.classList.add('hide');

    }
});


// змінюємо колір активній кнопці меню
menuBtns.forEach(el => {
    el.addEventListener('click', e => {
        menuBtns.forEach(btn => {
            btn.classList.remove('active__link');
        })
        e.target.classList.add('active__link');
    })
})

// логіка кнопки "вгору"
goToTop.addEventListener('click', e => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
})

/* логіка для відображення вікна реєстрації та входу */
if (popupLinks.length > 0) {
    popupLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            let currentLink = e.target.dataset.name;
            let currentPopup = document.getElementById(currentLink);
            body.style.overflow = 'hidden';
            currentPopup.classList.add('popup__open');
            let selector = `#${currentLink} .popup__close `;
            let closePopup = document.querySelector(selector);
            closePopup.addEventListener('click', close => {
                currentPopup.classList.remove('popup__open');
                body.style.overflow = 'auto';
                menuBtns.forEach(el => { el.classList.remove('active__link') });
                serverBtn.value = '';
                serverList.classList.remove('popup__open');
                serverDiv.classList.remove('dropdown__open');
                const inputs = document.querySelectorAll('.popup input');
                inputs.forEach(input => {
                    input.value = '';
                })
            })
            document.addEventListener('click', el => {
                if (el.target.classList.contains('popup__body')) {
                    currentPopup.classList.remove('popup__open');
                    body.style.overflow = 'auto';
                    menuBtns.forEach(el => { el.classList.remove('active__link') });
                    serverList.classList.remove('popup__open');
                    serverDiv.classList.remove('dropdown__open');
                    serverBtn.value = '';
                    inputs.forEach(input => {
                        input.value = '';
                    })
                }
            });
        })
    })
}

/* логіка випадаючого меню для вибору сервера */
serverBtn.addEventListener('click', e => {
    serverDiv.classList.toggle('dropdown__open');
    serverList.classList.toggle('popup__open');
    servers.forEach(server => {
        server.addEventListener('click', el => {
            let serverValue = el.currentTarget.textContent;
            serverBtn.value = serverValue;
            serverList.classList.remove('popup__open');
            serverDiv.classList.remove('dropdown__open');
        })
    })
})


const serverInfoBtn = document.querySelectorAll('.server-news__dropdown');
if (serverInfoBtn.length) {
    serverInfoBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const newsContent = e.currentTarget.parentElement;
            newsContent.classList.toggle('close');
            newsContent.classList.toggle('open')
        })
    })
}
