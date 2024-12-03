let enterEmail = document.querySelector("#enterEmail");
let enterPass = document.querySelector("#enterpass");
let enterNameUp = document.querySelector("#nameUp");
let enterEmailUp = document.querySelector("#emailUp");
let enterPassUp = document.querySelector("#passUp");
let btnLogin = document.querySelector("#btnLogin");
let btnLogup = document.querySelector("#btnLogup");
let btnout = document.querySelector("#btnout");
let emailsList = JSON.parse(localStorage.getItem("emails")) || [];
btnLogup.addEventListener("click", validateAndSignup);
btnLogin.addEventListener("click", sinn);

window.onload = function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    const welcomeMessage = document.getElementById("welcomeMessage");
    if (welcomeMessage) {
      welcomeMessage.textContent = `Welcome, ${currentUser.userName}!`;
    } else {
      console.error("welcomeMessage element not found.");
    }
  } else {
    window.location.href = "index.html";
  }
  const btnout = document.querySelector("#btnout");
  if (btnout) {
    btnout.addEventListener("click", function () {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  } else {
    console.error("btnout button not found.");
  }
};

document.getElementById("btnout").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

function validateAndSignup() {
  const name = enterNameUp.value.trim();
  const email = enterEmailUp.value.trim();
  const password = enterPassUp.value;
  const errorElement = document.getElementById("signupError");
  errorElement.textContent = "";

  if (name === "") {
    errorElement.textContent = "Name cannot be empty.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorElement.textContent = "Invalid email format.";
    return;
  }

  if (emailsList.some((user) => user.userEmailUp === email)) {
    errorElement.textContent =
      "Email already exists. Please use another email.";
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    errorElement.textContent =
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.";
    return;
  }

  let newUser = {
    userName: name,
    userEmailUp: email,
    userPassUp: password,
  };

  emailsList.push(newUser);
  localStorage.setItem("emails", JSON.stringify(emailsList));
  alert("User signed up successfully!");

  enterNameUp.value = "";
  enterEmailUp.value = "";
  enterPassUp.value = "";
}

function sinn() {
  checkData(enterEmail.value.trim(), enterPass.value);
}
function checkData(email, password) {
  let found = false;
  let currentUser = null;

  for (let i = 0; i < emailsList.length; i++) {
    if (
      emailsList[i].userEmailUp === email &&
      emailsList[i].userPassUp === password
    ) {
      found = true;
      currentUser = emailsList[i];
      break;
    }
  }

  const result = document.getElementById("result");
  if (found) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "welcome.html";
  } else {
    result.textContent = "Invalid email or password.";
  }
}
function btnoout() {
  console.log("User logged out");
  window.location.href = "index.html";
}
