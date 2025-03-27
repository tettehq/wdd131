const currentYear = document.getElementById("currentyear");
let d = new Date();
currentYear.textContent = `©${d.getFullYear()}`;

const lastUpdated = document.getElementById("lastModified");
lastUpdated.textContent = `Last Modification: ${document.lastModified}`;

const hamButton = document.getElementById("menu");
const navigation = document.getElementById("navigation");

hamButton.addEventListener('click', () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open")
})

// temple object list
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            ""
    },
    {
        templeName: "Sapporo Japan",
        location: "Sapporo, Hokkaido, Japan",
        dedicated: "2016, August, 21",
        area: 48480,
        imageUrl:
            ""
    },
    {
        templeName: "Cedar City Utah",
        location: "Cedar City, Utah, United States",
        dedicated: "2017, December, 10",
        area: 42657,
        imageUrl:
            ""
    },
    {
        templeName: "Quetzaltenango Guatemala",
        location: "Quetzaltenango, Guatemala",
        dedicated: "2011, December, 11",
        area: 21085,
        imageUrl:
            ""
    },
    {
        templeName: "Casper Wyoming",
        location: "Casper, Wyoming, United States",
        dedicated: "2024, November, 24",
        area: 9950,
        imageUrl:
            ""
    },
];

const main = document.querySelector("main");
const pageHeading = document.getElementById("heading");

function createTempleCard(temple) {
    // create div element as card container
    let card = document.createElement("div");
    card.className = "card-container"

    // create and set properties of img element
    let image = document.createElement('img');
    image.src = temple.imageUrl;
    image.alt = `${temple.templeName} image`;
    image.loading = "lazy";

    // create image caption
    let imageData = document.createElement("div");
    let name = document.createElement("h3");
    let loc = document.createElement("p");
    let dedicated = document.createElement("p");
    let size = document.createElement("p");

    name.textContent = temple.templeName;
    loc.innerHTML = `<span class="field">LOCATION:</span> ${temple.location}`;
    dedicated.innerHTML = `<span class="field">DEDICATED:</span> ${temple.dedicated}`;
    size.innerHTML = `<span class="field">SIZE:</span> ${temple.area}`;

    imageData.appendChild(name);
    imageData.appendChild(loc);
    imageData.appendChild(dedicated);
    imageData.appendChild(size);

    card.appendChild(imageData);
    card.appendChild(image);

    main.appendChild(card);
}

// populate home content once page loads
window.addEventListener("DOMContentLoaded", () => filterHome(temples))

// show all temples
const home = document.getElementById("home");
home.addEventListener("click", () => filterHome(temples));

function filterHome(temples) {
    main.replaceChildren();
    main.appendChild(pageHeading);
    for (let i = 0; i < 7; i++) {
        createTempleCard(temples[i]);
    }
    pageHeading.textContent = "Home";
}

// show old temples
const old = document.getElementById("old");
old.addEventListener("click", () => filterOld(temples));

function filterOld(temples) {
    main.replaceChildren();
    main.appendChild(pageHeading);
    temples.forEach(temple => {
        const d = new Date(temple.dedicated);
        const year = d.getFullYear();
        console.log(year);
        if (year < 1900) {
            createTempleCard(temple);
        }
    });
    pageHeading.textContent = "Old Temples"
}

// show new temples
const recent = document.getElementById("new");
recent.addEventListener("click", () => filterNew(temples));

function filterNew(temples) {
    main.replaceChildren();
    main.appendChild(pageHeading);
    temples.forEach(temple => {
        const d = new Date(temple.dedicated);
        const year = d.getFullYear();
        console.log(year);
        if (year > 2000) {
            createTempleCard(temple);
        }
    });
    pageHeading.textContent = "New Temples";
}

// show large temples
const large = document.getElementById("large");
large.addEventListener("click", () => filterLarge(temples));

function filterLarge(temples) {
    main.replaceChildren();
    main.appendChild(pageHeading);
    temples.forEach(temple => {
        if (temple.area > 90000) {
            createTempleCard(temple);
        }
    });
    pageHeading.textContent = "Large Temples";
}

// show large temples
const small = document.getElementById("small");
small.addEventListener("click", () => filterSmall(temples));

function filterSmall(temples) {
    main.replaceChildren();
    main.appendChild(pageHeading);
    temples.forEach(temple => {
        if (temple.area < 10000) {
            createTempleCard(temple);
        }
    });
    pageHeading.textContent = "Small Temples";
}