"use strict"

// header

// menu - burger

const isMobile = {
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
        return (
            this.Android() ||
            this.BlackBerry() ||
            this.iOS() ||
            this.Opera() ||
            this.Windows());
    },
};

if (isMobile.any()) {
    document.body.classList.add('_mobile');

    //const menuLogo = document.querySelector('.menu__logo');
    const menuBody = document.querySelector('.menu__body');
    const mobileMenuBody = document.createElement('div');
    mobileMenuBody.classList.add('_mobile-menu-body');
    const burger = document.querySelector('.burger');
    
    menuBody.append(mobileMenuBody);
    //mobileMenuBody.append(menuLogo);
    mobileMenuBody.append(burger);

    let mobileMenuList = document.createElement('ul');
    mobileMenuList.classList.add('_mobile-menu-list');
    const menuLinks = document.querySelectorAll('.menu__link');
    for (let index = 0; index < menuLinks.length; index++) {
        const link = menuLinks[index];
        let listItem = document.createElement('li');
        listItem.innerHTML = link.outerHTML;
        mobileMenuList.append(listItem);
    }

    burger.addEventListener('click', function(e) {
        if (burger.classList.contains('_opened')) {
            burger.classList.remove('_opened');
            mobileMenuList.classList.remove('_opened');
            mobileMenuList.remove();
        } else {
            burger.classList.add('_opened');
            mobileMenuList.classList.add('_opened');
            menuBody.append(mobileMenuList);
        }
    })
} else {
    document.body.classList.add('_pc');
}


// slider

new Swiper('.swiper', {
    /*navigation: {
        nextEl: '.slider__btn_next',
        prevEl: '.slider__btn_prev',
    },*/
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 0,
});

// content

// featured products

const app = Vue.createApp({
    data() {
        return {
            featuredProducts: [
                {id: 1, image: 'img/featured_product_01.png', price: '$50', salePrice: '', title: 'CBD Vegan Gummies'},
                {id: 2, image: 'img/featured_product_02.png', price: '$150', salePrice: '', title: 'Mint CBD Oil 1000mg'},
                {id: 3, image: 'img/featured_product_03.png', price: '$100', salePrice: '', title: '3.4oz Topical CBD Ointment'},
                {id: 4, image: 'img/featured_product_04.png', price: '$70', salePrice: '$60', title: 'CBD Capsules'},
            ],
            blogEntries: [
                {id: 1, image: 'img/blog_img_01.jpg', date: 'Jan 02, 2020', title: 'The Ultimate Experience With CBD Bath Bombs', link: ''},
                {id: 2, image: 'img/blog_img_02.jpg', date: 'Jan 02, 2020', title: 'WHhat are CBD Lollipips?', link: ''},
                {id: 3, image: 'img/blog_img_03.jpg', date: 'Jan 02, 2020', title: 'CBD Candy: Why Are These Edibles Becoming So Popular?', link: ''},
            ],
        }
    },
});

app.component('featured-product', {
    props: ['product'],
    template:`
    <div class="products__item product">
        <div class="product__image">
            <img :src="product.image" alt="featured product">
        </div>
        <div class="product__title">{{ product.title }}</div>
        <div class="product__price">
            <span v-if="!product.salePrice">{{ product.price }}</span>
            <span v-else>
                <span style="text-decoration: line-through">{{ product.price }}</span>
                <span>&nbsp &nbsp</span>
                <span style="color: #fa897b">{{ product.salePrice }}</span>
            </span>
        </div>
    </div>
    `,
});

app.component('blog-entry', {
    props: ['entry'],
    template: `
    <div class="blog__item blog-entry">
        <div class="blog-entry__image">
            <a :href="entry.link"><img :src="entry.image" alt="blog entry"></a>
        </div>
        <div class="blog-entry__date">{{ entry.date }}</div>
        <div class="blog-entry__title">{{ entry.title }}</div>
        <div class="blog-entry__link"><a :href="entry.link">Read More <span>></span></a></div>
    </div>
    `
});

// subscribe

const subscribeForm = document.querySelector('.subscribe__form');

subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = subscribeForm.querySelector('.subscribe__input');
    console.log(emailInput);
    console.log(emailInput.value);
    if (checkEmail(emailInput.value)) {
        sendForm(emailInput.value);
        if (emailInput.classList.contains('_error')) {
            emailInput.classList.remove('_error');
        }
        animateSendingForm();
        emailInput.value = '';
    } else {
        alert('Please, enter the correct e-mail adress.');
        emailInput.classList.add('_error');
    }
});

function checkEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email);
}
function sendForm(data) {
    //
}
function animateSendingForm() {
    subscribeForm.classList.add('_sending');

    setTimeout(() => {subscribeForm.classList.remove('_sending')}, 1000);
}


