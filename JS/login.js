
// declaration of global variable to be used in multiple functions 
let pwd = document.getElementById("password");
let stren = document.getElementById("cstren");
let check = document.getElementById("check");
let confirmpass = document.getElementById("cpassword");
let mail = document.getElementById("emails");
let validLog = 0;

// function to check password strength  
function checkPass() {
    // declaration of variables and Regex
    let cpwd = document.getElementById("cpassword");
    let strength = document.getElementById("strength");
    /*
      (?=.*[a-z])      at least 1 lowercase letter
      (?=.*[A-Z])      at least 1 uppercase letter
      (?=.*[0-9])      at least 1 digit
      */
    let strongRegex = RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

    /*
      (?=.*[a-z])      at least 1 lowercase letter
      (?=.*[0-9])      at least 1 digit
      */

    let mediumRegex =
        RegExp("(?=.*[a-z])(?=.*[0-9])");

    //at least 4 characters long
    let minRegex = RegExp("(?=.{4,})");

// checks if minimum amount of characters required is met 
    if (minRegex.test(pwd.value) == false) {
        // changes style depending on the error
        strength.innerHTML =
            '<span style="color:red; margin: auto 7px;">Invalid';
            stren.style.margin = "25px 50px";
// check if the different regex function are met 
    } else if (strongRegex.test(pwd.value)) {
        // changes style depending on the error
        strength.innerHTML =
            '<span style="color:green; margin: auto 7px;">Strong</span>';
            stren.style.margin = "25px 45px";
    } else if (mediumRegex.test(pwd.value)) {
        // changes style depending on the error
        strength.innerHTML =
            '<span style="color:yellow; margin: auto 7px;">Medium</span>';
            stren.style.margin = "25px 52px";
    } else {
        // changes style depending on the error
        strength.innerHTML =
            '<span style="color:orange; margin: auto 7px;">Weak';
            stren.style.margin = "25px 40px";
    }
    // check if confirm password field is not empty 
    if (cpwd.value != "") {
        // changes css style 
        strength.innerHTML = "";
        stren.style.margin = "25px auto";
        confirmpass.style.marginTop="-7px";
    }
    //checks if password value is equal to confirm password value 
    if (pwd.value == cpwd.value) {
        // if so, set a green border to confirm password input field
        confirmpass.style.border="2px solid green";
        confirmpass.style.marginTop="-7px";
    } else if (pwd.value != cpwd.value){
        // if not, set a red border to confirm password input field
        confirmpass.style.border="2px solid red";
        confirmpass.style.marginTop="-7px";
    }
    // check Regex to display appropriate message 
    if (minRegex.test(pwd.value) == false) {
        // if not equal, check if sign up button is present and if yes, remove it and display error message in its place 
          if (document.getElementById("inputBt") !== null)
            {
                document.getElementById("inputBt").remove();
            }
        check.innerHTML ='<span class="checkText">Password should be at least 4 characters</span>';
        confirmpass.style.marginTop="-7px";
    }else if (strongRegex.test(pwd.value) == false || mediumRegex.test(pwd.value) == false)
    {
        check.innerHTML ='<span class="checkText">Password should be strong<br>Add Uppercase, lowercase & digits</span>';
        confirmpass.style.marginTop="-7px";
    }else if (pwd.value != cpwd.value)
    {
        check.innerHTML ='<span class="checkText">Passwords do not match</span>';
        confirmpass.style.marginTop="-7px";
    // if password = confirm password, add sign up button again to be able to sign up 
    }else if (pwd.value == cpwd.value){
        confirmpass.style.marginTop="-7px";
        check.innerHTML ='<input id="inputBt" class="input-btn-sign" onclick="Signup()" type="submit" value="Signup" />';
    }
}

function Signup()
{
    let email = document.getElementById("emails").value;
    let password = document.getElementById("password").value;
    let ConfirmPassword = document.getElementById("cpassword").value;

    //Store user if no field is empty 
    if ((email != "") && (password != "") && (ConfirmPassword != "")) {
        fetch('http://localhost:3000/api/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                Swal.fire({
                    title: "Error",
                    text: "Email already exists. Please Log In.",
                    icon: "error"
                });
            } else {
                fetch('http://localhost:3000/api/SendData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                .then(response => response.text())
                .then(data => {
                    if (data == "Data inserted successfully") {
                        Swal.fire({
                            title: "Success",
                            text: "You have successfully signed in.",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "There was an error when creating your account.",
                            icon: "error"
                        });
                    }
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
            }
        })
        .catch(error => console.error('Error:', error));
    
        check.innerHTML = '<input id="inputBt" class="input-btn-sign" onclick="Signup()" type="submit" value="Signup" />';
    }
    
}

function log(event) {
    event.preventDefault(); // Prevent the default form submission
    let email = document.getElementById("logUsernme").value;
    let password = document.getElementById("logPasswd").value;
    if (email !== "" && password !== "") {
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: "Success",
                    text: "You have successfully logged in.",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: data.message,
                    icon: "error"
                });
            }
            
        })
        .catch(error => console.error('Error:', error));
    } else {
        Swal.fire({
            title: "Error",
            text: "Email and password must not be empty.",
            icon: "error"
        });
    }
}

