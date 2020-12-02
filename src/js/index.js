import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/effect'
import 'bootstrap';
import 'bootstrap-star-rating';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';
import noUiSlider from 'nouislider';
import IMask from 'imask';

function headerPosition() {
    let offsetY = window.pageYOffset;
    let header = document.querySelector('header.header');

    console.log(header);

    if (offsetY > 0) {
        header.classList.add('offset-y');
    }
    else {
        header.classList.remove('offset-y');
    }
}

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    headerPosition();

    b.removeClass('loaded');
});

document.addEventListener('scroll', headerPosition, {passive: true});

$(function () {
    // Callback
    $('.callback').on('click', function () {
        let content = $('.header-content-wrap');
        let form = $('.header-form-wrap');

        $('.callback-close').on('click', function () {
            form.addClass('d-none');
            content.removeClass('d-none');
        });

        if (!content.hasClass('d-none')) {
            content.addClass('d-none');
            form.removeClass('d-none');
        }
        else {
            form.addClass('d-none');
            content.removeClass('d-none');
        }
    });

    // Swiper slider
    if ($('.swiper-container').length) {
        let slider;
        let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

        if (slide > 1) {
            slider = new Swiper('.swiper-container', {
                observer: true,
                observeParents: true,
                loop: true,
                autoplay: true,
                spaceBetween: 25,
                slidesPerView: 1,
                /*navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },*/
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                /*scrollbar: {
                    el: '.swiper-scrollbar',
                },*/
                dynamicBullets: true,
            });
        }
    }

    // Range slide
    if ($('input[type="range"]')) {
        let sliderRange = document.querySelectorAll('.slider-range');
        let sliderHandles = document.querySelectorAll('.slider-handles');

        if (sliderRange.length) {
            sliderRange.forEach(function (elem) {
                let input = elem.childNodes[0];
                let startValue = input.hasAttribute('value') ? Number(input.getAttribute('value')) : 1;
                let minValue = input.hasAttribute('min') ? Number(input.getAttribute('min')) : 1;
                let maxValue = input.hasAttribute('max') ? Number(input.getAttribute('max')) : 100;

                input.remove();

                noUiSlider.create(elem, {
                    start: [startValue],
                    step: 1,
                    behavior: 'tap',
                    connect: [true, false],
                    range: {
                        'min': [minValue],
                        'max': [maxValue]
                    }
                });
            });
        }

        if (sliderHandles.length) {
            sliderHandles.forEach(function (elem) {
                let input = elem.childNodes[0];
                let minValue = input.hasAttribute('min') ? Number(input.getAttribute('min')) : 1;
                let maxValue = input.hasAttribute('max') ? Number(input.getAttribute('max')) : 100;

                input.remove();

                noUiSlider.create(elem, {
                    start: [minValue, maxValue/2],
                    step: 1,
                    behavior: 'tap-drag',
                    connect: true,
                    range: {
                        'min': minValue,
                        'max': maxValue
                    }
                });
            });
        }
    }

    // Input mask
    let element = document.querySelectorAll('.mask-phone');
    element.forEach(function (e) {
        let mask = IMask(e, {
            mask: '{+7}(000)000-00-00',
            lazy: false,
            placeholderChar: '_'
        });

        let placeholder = '+7(';
        e.onfocus = function () {
            if (this.value === placeholder || this.value === '') {
                this.value = placeholder
            }
        };
        e.onblur = function () {
            if (this.value === placeholder) {
                this.value = ''
            }
        };
    });

    // star rating
    let rateInput = document.querySelectorAll('.rating-input');
    rateInput.forEach(function (input) {
        if (input.classList.contains('rating-read')) {
            $(input).rating({
                showCaption: false,
                showClear: false,
                displayOnly: true,
                max: 5,
                size: 'xs',
                emptyStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#936f62" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
                filledStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#317b0c" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
            });
        } else {
            $(input).rating({
                showCaption: false,
                showClear: false,
                stars: 5,
                min: 0,
                max: 5,
                step: 1,
                size: 'xs',
                emptyStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#936f62" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
                filledStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#317b0c" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
            });
        }
    });

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});