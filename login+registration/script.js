function authenticateLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Username: " + username);
    console.log("Password: " + password);

    //send credentials to backend and verify if they exist
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/api/login", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var loginData = {
        'username': username,
        'password': password
    };
    xhr.send(JSON.stringify(loginData));

    xhr.onload = function() {
        if(xhr.status == 200) { //if the database reads that it was successful
            window.location.href = "../Home.html"
            localStorage.setItem('token', username);
        } else {
            const form = document.getElementById("login");
            var wrongLoginMessage = document.getElementById("wrongLoginMessage");
            if (!wrongLoginMessage) {
                // Error message element doesn't exist, create a new one
                var label = document.createElement("p");
                label.textContent = "Login Credentials Incorrect";
                label.style.color = "red";
                label.id = "wrongLoginMessage";
                document.getElementById("login").appendChild(label);
            } else {
                // Error message element exists, update its content
                wrongLoginMessage.textContent = "Login Credentials Incorrect";
            } 
        }
    }

}


function createAccount(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPass").value;
    var email = document.getElementById("email").value;

    console.log("Username: " + username);
    console.log("Password: " + password);
    console.log("Confirmed Password: " + confirmPassword);
    console.log("Email: " + email);

    if(confirmPassword !== password) {
        const form = document.getElementById("login");
        form.reset();
        var label = document.createElement("p");
        document.getElementById("login").appendChild(label);
        label.textContent ="Passwords are not the same, try again";
        label.style.color = "red";
        label.id = "errorMessage";
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/api/register", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var loginData = {
        'username': username,
        'password': password,
        'email': email
    };

    xhr.send(JSON.stringify(loginData));

    xhr.onload = function() {
        if(xhr.status == 200) { //if the database reads that it was successful
            window.location.href = "../Home.html"
            localStorage.setItem('token', username);
        } else {
            var alreadyExistsMessage = document.getElementById("alreadyExistsMessage");
            if (!alreadyExistsMessage) {
                // Error message element doesn't exist, create a new one
                var label = document.createElement("p");
                label.textContent = "Account already exists.";
                label.style.color = "red";
                label.id = "alreadyExistsMessage";
                label.classList.add("errorMessage");
                document.getElementById("loginButton").appendChild(label);
            } else {
                // Error message element exists, update its content
                alreadyExistsMessage.textContent = "Account already exists.";
            }
        }   

    }

}

function sessionCheck(event) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://127.0.0.1:5000/api/session', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            if(window.location.pathname.includes('/loginPage.html')) { //if session already exists and user is on login page,
                window.location.href = "../postLogin.html"; //move them to the post-login page
            }
            
        } else {
            console.log("no session exists")

        }
    };
    xhr.onerror = function() {
        console.error('Unable to check if session for user exists or not');
    };
    xhr.send();

}


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login");
    if(form) {
        form.addEventListener("submit", authenticateLogin);
    }


    const registerForm = document.getElementById("register");
    if (registerForm) { //must do this check, registerButton isn't present on initial login page
        registerForm.addEventListener("submit", createAccount);
    } 
    
    const bypassButton = document.getElementById("sessionToken");
    if(bypassButton) {
        bypassButton.addEventListener("click", bypass)
    }

});

function bypass(event) {
    localStorage.setItem('token', "testSession");
}

window.addEventListener('load', function () {
    const token = localStorage.getItem('token'); 
      if (token) {
      console.log(token);
      console.log('Token found:', token);
      if(window.location.pathname.includes('loginPage.html') || window.location.pathname.includes('registrationPage.html')) {
        window.location.href = "../Home.html";
      }
    } else {
      // Token does not exist, handle accordingly (e.g., redirect to login)
      console.log('Token not found');
    }
  });

//   localStorage.setItem('token', "testSession");

    