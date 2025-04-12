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

const loginForm = document.getElementById("loginForm");

const regForm = document.getElementById("regForm");

const newProjectLink = document.querySelector('a[href="project.html"]');

newProjectLink.addEventListener("click", function (e) {
    e.preventDefault();

    alert("You need to sign in before you can add a new project.");

    window.location.href = "login.html";
});

// login and user registration logic
let users = getUserList() || [];

// store list of users in localStorage
function storeUserList(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// get list of users from localStorage
function getUserList() {
    return JSON.parse(localStorage.getItem("users"));
}

if (regForm) {
    regForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        const fname = formData.get("fname");
        const lname = formData.get("lname");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const uname = formData.get("uname");
        const passKey = formData.get("password");

        const user = {
            firstName: fname,
            lastName: lname,
            email: email,
            phone: phone,
            username: uname,
            passKey: passKey
        }

        const exists = users.some(user => user.firstName === fname);

        if (!exists) {
            users.push(user);

            storeUserList(users);

            window.location.href = "login.html";
        }
        else {
            window.alert("This account already exists.")
        }
    })
}

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        const userName = formData.get("uname");
        const passKey = formData.get("password");

        // check if user exists in user list
        const exists = users.some(user => user.username === userName && user.passKey === passKey);

        if (!exists) {
            window.alert("This account does not exist. Please check your username and password!");
            return;
        }
        const loginCredentials = {
            isLoggedIn: true,
            username: userName
        }

        sessionStorage.setItem("loginCredentials", JSON.stringify(loginCredentials));
        window.location.href = "index.html";
    })
}