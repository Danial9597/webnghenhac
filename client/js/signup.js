if (localStorage.getItem("currentUser")) {
  location.href = "./index.html";
}

let form = document.querySelector("form");//Tìm và chọn thẻ <form> đầu tiên trong trang HTML
form.addEventListener("submit", (e) => {

  console.log("signup")
  e.preventDefault();//ngăn trang không bị reload sau khi bấm nút Submit

  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  console.log("email", email)
  console.log("password", password)
  auth.createUserWithEmailAndPassword(email, password).then((usersCredential) => {
      alert("User created successfully, please login")
      location.href = "../html/login.html"
  }).catch((error) => {
      console.error("Lỗi đăng ký: ", error.message);
      alert("Lỗi đăng ký: " + error.message);
  });


  // if (localStorage.getItem("users")) {
  //   let users = JSON.parse(localStorage.getItem("users"));
  //   if (
  //     users.find((e) => {
  //       e.email === email;
  //     })
  //   ) {
  //     alert("Email is existed");
  //     return;
  //   } else {
  //       let passwordError = checkPassword(password)
  //       if(passwordError){
  //           alert(passwordError)
  //           return
  //       }

  //       users.push({
  //           email,
  //           password,
  //           username
  //       })
  //       localStorage.setItem("users", JSON.stringify(users))
  //   }
  // }else{
  //   let passwordError = checkPassword(password)
  //       if(passwordError){
  //           alert(passwordError)
  //           return
  //       }
  //   localStorage.setItem("users", 
  //       JSON.stringify([
  //           {
  //               email,
  //               password,
  //               username
  //           }
  //       ])
  //   )
  // }
});

// function checkPassword(password) {
//   let lowerCaseLetter = /[a-z]/g;
//   let upperCaseLetter = /[A-Z]/g;
//   let numbers = /[0-9]/g;

//   if (password.length < 8) {
//     return "Password must be at least 8 characters";
//   } else if (!password.match(lowerCaseLetter)) {
//     return "Password must  contain a lowercase letter";
//   } else if (!password.match(upperCaseLetter)) {
//     return"Password must  contain a uppercase letter";
//   } else if (!password.match(numbers)) {
//     return"Password must  contain a number or special character";
//   }

//   return null;
// }//kiểm tra mật khẩu