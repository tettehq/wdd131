const loggedIn = JSON.parse(sessionStorage.getItem("loginCredentials"));

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

const projectForm = document.getElementById("projectForm");

const authButton = document.getElementById("authButton");
const logType = document.getElementById("logType");

let projects = getProjectList() || [];

// store list of projects in localStorage
function storeProjectList(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// get list of projects from localStorage
function getProjectList() {
    return JSON.parse(localStorage.getItem("projects"));
}

projectForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop default submission

    const formData = new FormData(this);

    const projectName = formData.get("pname");
    const description = formData.get("description");
    const imageUrl = formData.get("imgUrl");
    const link = formData.get("link");
    const user = loggedIn.username;

    const project = {
        projectName: projectName,
        description: description,
        imageUrl: imageUrl,
        link: link,
        user: user
    }

    projects.push(project);

    storeProjectList(projects); // store projects array in local storage

    window.location.href = "index.html";
});

if (loggedIn && loggedIn.isLoggedIn) {
    logType.textContent = "Logout";
    authButton.href = "index.html";

    authButton.addEventListener('click', function (e) {
        e.preventDefault();

        logout();
    });
}

function logout() {
    const result = confirm("Are you sure you want to logout?");
    if (result) {
        sessionStorage.clear();
        logType.textContent = "Login";
        authButton.href = "login.html";
        window.location.href = "index.html"
    }
}