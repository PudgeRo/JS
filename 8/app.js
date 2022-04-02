'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

//Basket start
const basketItems = {};

const basket = document.querySelector('.cartIconWrap');
let basketHidden = document.querySelector('.basket.hidden');
basket.addEventListener('mouseover', () => {
    basketHidden.classList.remove('hidden');
});
basket.addEventListener('mouseout', () => {
    basketHidden.classList.add('hidden');
});

const addProductBasket = document.querySelector('.featuredItems');
addProductBasket.addEventListener('click', event => {
    if (!event.target.closest('.addToBasket')) {
        return;
    }

    const item = event.target.closest('.featuredItem');
    const idItem = item.dataset.id;
    const nameItem = item.dataset.name;
    const priceItem = item.dataset.price;
    addToBasket(idItem, nameItem, priceItem);
});

let numberItimesBasket = 0;
const basketCounter = document.querySelector('.cartIconWrap span');
const basketTotal = document.querySelector('.basketTotal span');
function addToBasket(idItem, nameItem, priceItem) {
    if (!(idItem in basketItems)) {
        basketItems[idItem] = {
            id: idItem,
            name: nameItem,
            price: priceItem,
            count: 1
        }
        numberItimesBasket++;
        basketCounter.textContent = numberItimesBasket;
        basketTotal.textContent = +basketTotal.textContent + +priceItem;
    document.querySelector('table').insertAdjacentHTML('beforeend', 
        `<tr>
            <td align="middle">${document.querySelector(`[data-id="${idItem}"] .featuredName`)
            .textContent}</td>
            <td class='count${idItem}' align="middle">${basketItems[idItem].count}</td>
            <td align="middle">$${priceItem}</td>
            <td class='totalPrice${idItem}'align="middle">$${priceItem}</td>
        </tr>`
    );
    } else {
        basketItems[idItem].count++;
        numberItimesBasket++;
        basketCounter.textContent = numberItimesBasket;
        basketTotal.textContent = +basketTotal.textContent + +priceItem;
        document.querySelector(`.count${idItem}`).textContent++;
        document.querySelector(`.totalPrice${idItem}`).textContent = 
        '$' + (priceItem * basketItems[idItem].count);
    }
};


