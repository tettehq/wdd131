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

const projectDisplaySection = document.getElementById("projects");

const bannerMessage = document.getElementById("bannerMessage");
if (bannerMessage) {
    bannerMessage.innerHTML = `<span>Welcome to My Portfolio Builder</span><span>Sign In to view your projects</span>`;
}

// variable that checks if user is logged In
const loggedIn = JSON.parse(sessionStorage.getItem("loginCredentials"));

const newProjectLink = document.querySelector('a[href="project.html"]');

newProjectLink.addEventListener("click", function (e) {
    e.preventDefault();

    if (!loggedIn) {
        window.location.href = "login.html";
    }
    else {
        window.location.href = "project.html";
    }
});

const authButton = document.getElementById("authButton");
const logType = document.getElementById("logType");

// get project array from localStorage, or initialize a new one if nothing
// is found in localStorage
let projects = getProjectList() || [];

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
    infoBox.className = "infoBox";

    const projectBox = document.createElement("div");
    projectBox.className = "projectBox";

    if (project.imageUrl != "") {
        image.src = `/wdd131/project/images/${project.imageUrl}`;
    }
    else {
        image.src = "https://placehold.co/300/webp?text=Project+Image"
    }
    image.alt = "project screenshot";

    image.loading = "lazy";

    heading.textContent = project.projectName;

    summary.textContent = project.description;

    link.href = project.link;
    link.text = `${project.projectName} link`;

    infoBox.appendChild(heading);
    infoBox.appendChild(summary);
    infoBox.appendChild(link);

    projectBox.appendChild(image);
    projectBox.appendChild(infoBox);

    if (projectDisplaySection) {
        projectDisplaySection.appendChild(projectBox);
    }
}

let users = getUserList() || [];

// get list of users from localStorage
function getUserList() {
    return JSON.parse(localStorage.getItem("users"));
}

if (loggedIn && loggedIn.isLoggedIn) {
    const currentUser = users.find(user => user.username === loggedIn.username);
    if (bannerMessage) {
        bannerMessage.innerHTML = `<span>Hi! My name is ${currentUser.firstName} and this is my portfolio</span><span>Scroll down to view some of my projects.</span>`;
    }

    const filteredProjects = projects.filter(project => project.user == loggedIn.username)

    if (filteredProjects) {
        filteredProjects.forEach(project => {
            displayProject(project);
        });
    }

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