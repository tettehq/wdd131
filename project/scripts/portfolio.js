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
});

// store various forms and elements in variables
const projectForm = document.getElementById("projectForm");

const loginForm = document.getElementById("loginForm");

const regForm = document.getElementById("regForm");

const projectDisplaySection = document.getElementById("projects");

const bannerMessage = document.getElementById("bannerMessage");

const authButton = document.getElementById("authButton");
const logType = document.getElementById("logType");


if (projectForm) {
    projectForm.addEventListener("submit", function (e) {
        e.preventDefault(); // stop default submission

        const formData = new FormData(this);

        const projectName = formData.get("pname");
        const description = formData.get("description");
        const imageUrl = formData.get("imgUrl");
        const link = formData.get("link");

        const project = {
            projectName: projectName,
            description: description,
            imageUrl: imageUrl,
            link: link
        }

        projects.push(project);

        storeProjectList(projects); // store projects array in local storage

        window.location.href = "index.html";
    });
}

// get project array from localStorage, or initialize a new one if nothing
// is found in localStorage
let projects = getProjectList() || [];

// store list of projects in localStorage
function storeProjectList(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// get list of projects from localStorage
function getProjectList() {
    return JSON.parse(localStorage.getItem("projects"));
}

function displayProject(project) {
    const image = document.createElement("img");
    const heading = document.createElement("h2");
    const summary = document.createElement("p");
    const link = document.createElement("a");
    const infoBox = document.createElement("div");
    const projectBox = document.createElement("div");
    
    projectBox.className = "projectBox";

    if (project.imageUrl != "") {
        image.src = project.imageUrl;
    }
    else {
        image.src = "https://placehold.co/300/webp?text=Project+Image"
    }
    image.alt = "project screenshot";

    image.loading = "lazy";

    heading.textContent = project.projectName;

    summary.textContent = project.description;

    link.href = project.link;
    link.text = `${project.link}`;

    infoBox.appendChild(heading);
    infoBox.appendChild(summary);
    infoBox.appendChild(link);

    projectBox.appendChild(image);
    projectBox.appendChild(infoBox);

    projectDisplaySection.appendChild(projectBox);
}

let users = getUserList() || [];

// get list of users from localStorage
function getUserList() {
    return JSON.parse(localStorage.getItem("users"));
}

// variable that checks if user is logged In
const loggedIn = JSON.parse(sessionStorage.getItem("loginCredentials"));


if (loggedIn && loggedIn.isLoggedIn) {
    const currentUser = users.find(user => user.username === loggedIn.username);
    bannerMessage.innerHTML = `<span>Hi! My name is ${currentUser.firstName} and this is my portfolio</span><span>Scroll down to view some of my projects.</span>`

    projects.forEach(project => {
        displayProject(project);
    });
}
