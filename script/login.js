 document.getElementById("sign-in-btn").addEventListener('click',() =>{
    const inputUserName = document.getElementById("input-username");
    const inputPassword = document.getElementById("input-password");
    const userName = inputUserName.value;
    const password = inputPassword.value;
    if(userName == "admin" && password =="admin123"){
        alert("SignUp Success")
        window.location.href = "home.html";
    }
    else{
        alert("Sign In Failed!! Enter correct Username & Password")
        return;
    }
  
 })