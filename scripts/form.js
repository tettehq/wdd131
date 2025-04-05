// footer date and time.
const currentYear = document.getElementById("currentyear");
let d = new Date();
currentYear.textContent = `©${d.getFullYear()}`;

const lastUpdated = document.getElementById("lastModified");
lastUpdated.textContent = `Last Modification: ${document.lastModified}`;


const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// sort array in order of product names
sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
console.log(sortedProducts)

const productSelectField = document.getElementById("pname");

function populateSelectField(product) {
    // create option element
    let option = document.createElement("option");
    option.value = product.id; // set value to product id
    option.textContent = product.name; // set option display to product name

    // add option element to select field
    productSelectField.appendChild(option);
}

if (productSelectField) {
    sortedProducts.forEach(product => {
        populateSelectField(product)
    });
}

// variable to hold review count
let reviewCount = getReviewCount() || 0;

// counter on review.html page
const counter = document.getElementById("reviewCount");

const myForm = document.querySelector(".revForm");

// increment reviewCount after form submission and save count in localstorage
if (myForm) {
    myForm.addEventListener("submit", () => {
        reviewCount++;
        setReviewCount(reviewCount);
    });
}

// function to save reviewCount in localStorage
function setReviewCount(count) {
    localStorage.setItem("count", JSON.stringify(count));
}

// function to retrieve reviewCount from localStorage
function getReviewCount() {
    return JSON.parse(localStorage.getItem("count"));
}

if (counter) {
    counter.textContent = `Number of reviews posted: ${reviewCount}`;
}