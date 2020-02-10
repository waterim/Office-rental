let login = document.querySelector("#login");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let error = document.querySelector("#error");
let formReg = document.querySelector("#reg-form");

formReg.addEventListener("submit", e => {
    let messages = [];
    let passReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{4,})$/;
    let loginReg = /^[a-z0-9_-].$/;
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailReg.test(email.value)){
        email.classList.add("error");
        messages.push("Email is incorrect")
    }
    if(login.value.length <= 4){
        login.classList.add("error");
        messages.push("Username is already registered or is incorrect")
    }
    if(password.value.length <=4){
        password.classList.add("error");
        messages.push("password is incorrect")
    }    
    
    if(messages.length > 0){
        e.preventDefault();
        error.innerText = messages.join(', ');
    }
});

let loginLog = document.querySelector("#login-log");
let passwordLog = document.querySelector("#password-log");
let errorLog = document.querySelector("#error-log");
let formLog = document.querySelector("#log-form");


formLog.addEventListener("submit", e => {
    let messages = [];
    console.log(passwordLog.value.length);
    if(passwordLog.value.length <= 6){
        loginLog.classList.add("error");
        messages.push("Password can't be <6 symbols")
    }
    if(loginLog.value === null && loginLog.value === null){
        passwordLog.classList.add("error");
        messages.push("login can't be empty")
    }
    if(messages.length > 0){
        e.preventDefault();
        errorLog.innerText = messages.join(', ');
    }
});

