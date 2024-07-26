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
    if ((email != "") && (password != "") && (ConfirmPassword != ""))
    {
        fetch('http://localhost:3000/api/SendData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.text())
        .then(data => {
            if (data == "Table created or already exists")
                {
                    Swal.fire({
                        title: "Success",
                        text: "You have sucessfully signed in.",
                        icon: "success"
                      });
                }
                else
                {
                    Swal.fire({
                        title: "Error",
                        text: "There was an error when creating your account.", 
                        icon: "error"
                      });
                }
                console.log(data); 
            ;
        })
        .catch(error => console.error('Error:', error));

        check.innerHTML ='<input id="inputBt" class="input-btn-sign" onclick="Signup()" type="submit" value="Signup" />';
    }
    
}

//checks if username is already present in local storage 
function checkusrname()
{
    //get username written by user 
    let usrname = document.getElementById("username").value;
    // checks if user is present
    if(localStorage[usrname] != undefined){
        //if so, checks if signup button is present, if yes, remove it 
        if (document.getElementById("inputBt") !== null)
        {
            document.getElementById("inputBt").remove();
        }
        //display error message 
        check.innerHTML ='<span class="checkText">Username is already taken<br>Enter another one</span>';
        return; //Do nothing else
    }
    if((localStorage[usrname] === undefined) && (check.innerHTML ='<span class="checkText">Username is already taken<br>Enter another one</span>')){
        //Inform user that they do not have an account
        check.innerHTML ='<input id="inputBt" class="input-btn-sign" onclick="Signup()" type="submit" value="Signup" />';
    }
}

// function to remove login button if it is present 
function removeLogBtn()
{
    if (document.getElementById("btnLog") !== null)
        {
            document.getElementById("btnLog").remove();
        }
}

function checkemail()
{   
    // create empty array and create an array of keys
    let emailarray = [];
    let userarray = (Object.keys(localStorage));
    // iterates through array of keys 
    for(let i=0; i < userarray.length; i++){
        let usernme = userarray[i]; 
        let usrObj = JSON.parse(localStorage[usernme]);//Convert to object
        // populate email array 
        emailarray.push(usrObj.email);
    }
    // iterates through all the keys 
    for(let i=0; i < userarray.length; i++){
        //compare email written to email already stored  
        if (mail.value == emailarray[i])
        {
            // if so, remove login button and display error message and breaks out of function 
            if (document.getElementById("inputBt") !== null)
            {
                document.getElementById("inputBt").remove();
            }
            check.innerHTML ='<span class="checkText">Email assigned to another account<br>Please log-in</span>';
            break; 
        }
        // if email not equal; add signup button back 
        if (mail.value != emailarray[i])
        {
            check.innerHTML ='<input id="inputBt" class="input-btn-sign" onclick="Signup()" type="submit" value="Signup" />';
        }
    } 
}

// function to set popup invisible 
function closepopup()
{
    document.getElementById("popupOpen").style.display = "none";
}

function checkLog()
{
    let userLog = document.getElementById("logUsernme").value;
    let pwdLog = document.getElementById("logPasswd");
    let checkLog = document.getElementById("checkLog");
    let valid = 0; 
    let userpass = "";
    // checks if username exists in local storage and check if user is already logged 
    if(localStorage[userLog] == undefined && validLog == 0){
        // if false remove login button and display error message 
        removeLogBtn();
        checkLog.innerHTML ='<span class="checkText">Username does not exist<br> Please sign up if you do not have an account</span>';
        valid = 0; 
    }
    // if username exists re create login button
    if(localStorage[userLog] != undefined && validLog == 0){
        checkLog.innerHTML=' <input id="btnLog" class="input-btn-log" type="submit" onclick="log()" value="Log in">';
        valid = 1;
        // gets user password for this user 
        let usrObj = JSON.parse(localStorage[userLog]);//Convert to object
        userpass = usrObj.password;
    }
    if (valid == 1)
    {
        // Checks if password is equal to what the user is typing. if false, display error message else let login button visible 
        if (pwdLog.value != userpass  && validLog == 0)
        {
            removeLogBtn();
            checkLog.innerHTML ='<span class="checkText">Password is incorrect <br><br></span>';
            validLog = 0; 
        }
        else if (pwdLog.value == userpass && validLog == 0)
        {
            checkLog.innerHTML=' <input id="btnLog" class="input-btn-log" type="submit" onclick="log()" value="Log in">';
            validLog = 1; 
        }
    }
}


function log()
{   
    //if password and username correct, set log object from false to true in local storage 
    if (validLog == 1)
    {
        let userLog = document.getElementById("logUsernme").value;
        let usrObj = JSON.parse(localStorage[userLog]);//Convert to object
        usrObj.log = true; 
        localStorage.setItem(userLog, JSON.stringify(usrObj));
    }
}

// checks if any user has already logged in and if so, remove log in button and display message 
let userarray = (Object.keys(localStorage));
    for(let i=0; i < userarray.length; i++){
        let usernme = userarray[i]; 
        let usrObj = JSON.parse(localStorage[usernme]);//Convert to object
        if (usrObj.log == true){
            removeLogBtn();
            document.getElementById("checkLog").innerHTML='<span class="checkText">'+usernme+' is logged in<br>Sign out to log in on another account </span>'; 
            validLog = 1;
        }
    }