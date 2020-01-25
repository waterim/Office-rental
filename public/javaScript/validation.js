// function validateLogin(){
//     let login = document.querySelector("#login")
//     let loginText = login.value.trim();
//     var loginReg = /^[a-zA-Z0-9]+$/;
//    if(loginReg.test(login)){
//         login.style.background="green"
//         // login.classList.remove("error");
//         // login.classList.add("success");
//    }else{
//        login.style.background="red";
//         // login.classList.remove("success");
//         // login.classList.add("error");
//    }
// }

// function validatePassword(){
//     let password = document.querySelector("#register")
//     let passwordText = password.value.trim();
//     let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

//     if(passReg.test(password)){
//         password.classList.remove("error");
//         password.classList.add("success");
//     }else{
//         password.classList.remove("success");
//         password.classList.add("error");
//     }
// }



function validateForm(){
    let result = true;
    let login = document.querySelector("#login");
    let password = document.querySelector("#password");
    let passReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/;
    var loginReg = /^[a-z0-9_-].$/;
    if(!(loginReg.test(login) && passReg.test(password))){
        result = false;
        alert("incorrect password or username");
        password.value = "";
        login.value = "";
    }
   // return result;
}