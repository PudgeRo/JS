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
        };
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