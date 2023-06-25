// Form

const priceCleaning = document.querySelector(".calculate-container-cost-descr-cost-value");
let priceMultiplier = 80;
let priceAdditional = 0;
let price = 2400;

// --> Type clean
const dropdownHeader = document.querySelector(".calculate-container-type-clean-room-name");
const dropdownArrow = document.querySelector(".calculate-container-type-clean-room-arrow");
const dropdownContent = document.querySelector(".calculate-container-type-clean-room-choice");
const dropdownItems = document.querySelectorAll(".calculate-container-type-clean-room-dropdown-item");
const calculateTypeClean = document.querySelector(".calculate-container-cost-descr-type-clean");

accordion(dropdownContent, dropdownArrow);

dropdownItems.forEach((e) => e.addEventListener('click', () => {
    dropdownHeader.textContent = e.textContent;
    calculateTypeClean.textContent = e.textContent;
    priceMultiplier = e.dataset.multiplier;

    calculatePrice();
}));

// --> Area clean
const areaValue = document.querySelector(".calculate-container-area-room-value");
const rangeValue = document.querySelector(".calculate-container-area-room-range");
const calculateAreaRoom = document.querySelector(".calculate-container-cost-descr-area-room");

rangeValue.addEventListener("change", () => {
    areaValue.value = rangeValue.value;
    calculateAreaRoom.innerHTML = rangeValue.value + " м<sup>2</sup>";

    calculatePrice();
});

areaValue.addEventListener("change", () => {
    if (areaValue.value >= 150) areaValue.value = 150;

    rangeValue.value = areaValue.value;
    calculateAreaRoom.innerHTML = rangeValue.value + " м<sup>2</sup>";

    calculatePrice();
});

// --> Type room
const typesRoom = document.querySelectorAll(".calculate-container-type-room-input");
const calculateTypeRoom = document.querySelector(".calculate-container-cost-descr-type-room");

typesRoom.forEach((e) => e.addEventListener('change', () => {
    calculateTypeRoom.textContent = e.value;
}))

// --> Additional
const additionals = document.querySelectorAll(".calculate-container-additional-item-input");
const calculateAddition = document.querySelector(".calculate-container-cost-descr-additional");

additionals.forEach((e) => e.addEventListener('change', () => {
    calculateAddition.textContent = e.value;
    priceAdditional = +e.dataset.price;

    calculatePrice();
}))

// --> Calculate price
function calculatePrice() {
    price = areaValue.value * priceMultiplier + priceAdditional;
    priceCleaning.textContent = "від " + price + "грн.";
}

// --> Send form
document.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();

    const nameEl = document.querySelector('#name');
    const telEl = document.querySelector('#tel');
    const modalWindow = document.querySelector('.modal-window');
    const overlayModalWindow = document.querySelector('.overlay');

    const name = nameEl.value;
    const tel = telEl.value;
    const typeClean = calculateTypeClean.textContent;
    const typeRoom = calculateTypeRoom.textContent;
    const areaRoom = areaValue.value;
    const addition = calculateAddition.textContent;

    const data = { typeClean, typeRoom, areaRoom, addition, name, tel, price };

    const handleFormData = async () => {
        const sent = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        try {
            const response = sent.status;
            if (response == 200) {
                nameEl.classList.remove("error");
                telEl.classList.remove("error");
                modalWindow.classList.add("active");
                overlayModalWindow.classList.add("active");
                nameEl.value = "";
                telEl.value = "";
            } else {
                nameEl.classList.add("error");
                telEl.classList.add("error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    overlayModalWindow.addEventListener("click", () => {
        modalWindow.classList.remove("active");
        overlayModalWindow.classList.remove("active");
    })

    let checkedFlag = !!document.querySelector(".calculate-container-cost-input-checkbox:checked");

    if (checkedFlag) handleFormData();
})

// Tab

const tablinks = document.querySelectorAll(".room-list-item");
const roomImg = document.querySelectorAll(".room-card-img");
let enterTab = tablinks[0];

tablinks.forEach((e) => e.addEventListener('click', () => {
    enterTab.classList.remove("active");
    e.classList.add("active");

    enterTab = e;
}))

for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener('click', () => {
        enterTab.classList.remove("active");
        tablinks[i].classList.add("active");

        enterTab = tablinks[i];

        roomImg.forEach(element => {
            element.setAttribute("src", element.getAttribute("src").slice(0, -5) + (i + 1) + ".jpg");
        });
    })
}

// Carousel

// --> Work results

const workCard = document.querySelectorAll(".work-result-card");
const workImg = document.querySelectorAll(".work-result-picture");
const workButtonsTab = document.querySelectorAll(".work-result-button-item");
const workContent = document.querySelector(".work-result-content");
let workEnterButtonTab = 2;

for (let i = 0; i < workButtonsTab.length; i++) {
    workButtonsTab[i].addEventListener('click', () => {
        workButtonsTab[workEnterButtonTab].classList.remove("active");
        workCard[workEnterButtonTab].classList.add("nonactive");
        workImg[workEnterButtonTab].classList.remove("active");

        workButtonsTab[i].classList.add("active");
        workCard[i].classList.remove("nonactive");
        workImg[i].classList.add("active");

        workContent.style.translate = +workContent.style.translate.slice(0, -2) +
            (workImg[workEnterButtonTab].getBoundingClientRect().x - workImg[i].getBoundingClientRect().x) + "px";

        workEnterButtonTab = i;
    })
}

// --> Reviews

const reviewCard = document.querySelectorAll(".reviews-content-card");
const reviewButtonsTab = document.querySelectorAll(".reviews-result-button-item");
const reviewContent = document.querySelector(".reviews-content");
let reviewEnterButtonTab = 2;

for (let i = 0; i < reviewButtonsTab.length; i++) {
    reviewButtonsTab[i].addEventListener('click', () => {
        reviewButtonsTab[reviewEnterButtonTab].classList.remove("active");
        reviewCard[reviewEnterButtonTab].classList.remove("active");

        reviewButtonsTab[i].classList.add("active");
        reviewCard[i].classList.add("active");

        reviewContent.style.translate = +reviewContent.style.translate.slice(0, -2) +
            (reviewCard[reviewEnterButtonTab].getBoundingClientRect().x - reviewCard[i].getBoundingClientRect().x) + "px";

        reviewEnterButtonTab = i;
    })
}

// Accordion 

const accordionHeaders = document.querySelectorAll(".faq-container-item");
const accordionArrows = document.querySelectorAll(".faq-container-item-question-arrow");

for (let i = 0; i < accordionHeaders.length; i++) {
    accordion(accordionHeaders[i], accordionArrows[i]);
}

function accordion(accordionHeader, accordionArrow) {
    accordionHeader.addEventListener('click', () => {
        if (accordionHeader.classList.contains('show')) {
            accordionHeader.classList.remove('show'); //
            accordionArrow.classList.remove('show');
        } else {
            accordionHeader.classList.add('show'); //
            accordionArrow.classList.add('show');
        }
    });
}