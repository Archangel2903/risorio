import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/effect'
import 'bootstrap';
import 'bootstrap-star-rating';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';
import IMask from 'imask';
import 'select2';

function headerPosition() {
    let offsetY = window.pageYOffset;
    let header = document.querySelector('header.header');

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
    // Mobile menu
    $('.main-menu__switch').on('click', function () {
        $(this).toggleClass('active');
        $(this).next().toggleClass('active');
    });
    $('.main-menu__link').on('click', function (e) {
        // e.preventDefault();
        let anchor = $(this).attr('href');
        let item = $(anchor);
        $([document.documentElement, document.body]).animate({
            scrollTop: Number(item.offset().top) - 70
        }, 1500);

    });

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

    // Input mask
    if ($('.mask-phone').length) {
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
    }

    // Star rating
    if ($('.rating-input').length) {
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
    }

    // Select2
    if ($('.select-list').length) {
        $('.select-list').select2({
            minimumResultsForSearch: Infinity,
        });

        $('.checkout__fields-select').on('select2:select', function (e) {
            let data = e.params.data.text;
            $(this).nextAll('.checkout__fields-select-address').text(data);
        });
    }

    // Order delivery method
    if ($('.checkout__delivery-radio').length) {
        $('.checkout__delivery-radio').on('click', function () {
            if ($(this).data('method') === 'postmat') {
                $('.checkout__fields-box_addresses').removeClass('d-none');
                $('.checkout__fields-box_address').addClass('d-none');
            }
            else {
                $('.checkout__fields-box_addresses').addClass('d-none');
                $('.checkout__fields-box_address').removeClass('d-none');
            }
        });
    }

    // Order product quantity
    if ($('.checkout__order-quantity').length) {
        $('.checkout__order-quantity-arrow').on('click', function () {
            let quantityInput = $('.checkout__order-quantity-input');
            let inputVal = quantityInput.val();

            if ($(this).hasClass('quantity-plus')) {
                quantityInput.val(++inputVal);
            }
            else if ($(this).hasClass('quantity-minus')) {
                if (inputVal > 1) {
                    quantityInput.val(--inputVal);
                }
            }
            else {
                return false;
            }
        });
    }

    // Order pay method
    if ($('.checkout__order-pay-input').length) {
        $('.checkout__order-pay-input').on('click', function () {
            if (!$(this).hasClass('pay-delivery')) {
                if ($(this).data('method') === 'on-delivery') {
                    $('.checkout__order-pay-delivery').slideDown();
                }
                else {
                    $('.checkout__order-pay-delivery').slideUp();
                }
            }
        });
    }

    // Checkout
    if ($('.checkout').length) {
        $('.checkout__box.active').find('.checkout__box-body').slideDown(300);
        $('.checkout__box-header').on('click', function () {
            if ($(this).parent().hasClass('active')) {
                $(this).next().slideUp(300);
                $(this).parent().removeClass('active');
            }
            else {
                $('.checkout__box').removeClass('active').find('.checkout__box-body').slideUp(300);
                $(this).next().slideDown(300);
                $(this).parent().addClass('active');
            }
        });

        $('.checkout__footer-button').on('click', function () {
            let thisBox = $(this).parent().parent().parent();
            let thisBody = $(this).parent().parent();
            switch($(this).data('nav')) {
                case true:
                    let nextBox = thisBox.next();
                    thisBox.removeClass('active');
                    thisBody.slideUp(300);
                    nextBox.addClass('active');
                    nextBox.find('.checkout__box-body').slideDown(300);
                    break;
                case false:
                    let prevBox = thisBox.prev();
                    thisBox.removeClass('active');
                    thisBody.slideUp(300);
                    prevBox.addClass('active');
                    prevBox.find('.checkout__box-body').slideDown(300);
                    break;
                default:
                    console.log('данных нет или они не верны');
                    break;
            }
            // if ($(this).data('nav') == true) {}
        });
    }

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