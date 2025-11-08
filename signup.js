// validation form register and register user local storage
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const btnRegister = document.querySelector(".signup__signInButton");

// validation form register and register user local storage
btnRegister.addEventListener("click", (e) => {
  e.preventDefault();

  const username = inputUsernameRegister.value.trim();
  const password = inputPasswordRegister.value.trim();

  if (username === "" || password === "") {
    alert("Vui lòng không để trống");
    return;
  }

  // kiểm tra độ mạnh của mật khẩu
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,})/;

  if (!passwordRegex.test(password)) {
    alert(
      "Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất 1 chữ in hoa và 1 ký tự đặc biệt!"
    );
    return;
  }

  // lưu user vào localStorage
  const user = {
    username: username,
    password: password,
  };

  localStorage.setItem(username, JSON.stringify(user));
  alert("Đăng Ký Thành Công!");
  window.location.href = "login.html";
});
