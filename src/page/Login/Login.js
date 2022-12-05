import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../utils/API";
import { sweetAlert } from "../../utils/SweetAlert";
const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState({ username: false, password: false });
  const [remember, setRemember] = useState(false);

  // 初始化：如果有check remember 就取得user資料，且將remember賦予true
  useEffect(() => {
    if (window.localStorage.getItem("user") !== null) {
      setUser(
        JSON.parse(window.localStorage.getItem("user")) || {
          username: "",
          password: "",
        }
      );
      setRemember(() => true);
    }
  }, []);
  const onSubmit = () => {
    if (user.username === "" || user.username.match(emailValidation) === null) {
      setIsError((state) => ({ ...state, username: true }));
    }
    if (user.password === "") {
      setIsError((state) => ({ ...state, password: true }));
    }
    if (
      user.username !== "" &&
      user.username.match(emailValidation) !== null &&
      user.password !== ""
    ) {
      loginAPI(user).then((res) => {
        if (res.success) {
          const { token, expired } = res;
          document.cookie = `myToken=${token};expires=${new Date(expired)}`;
          // console.log(token, expired, new Date(expired), user); // 在設定之前可以先看是否有取得到資料
          navigate("/back/dashboard/products");
          sweetAlert("success", res.message);
        } else {
          sweetAlert("error", res.message, res.error.message);
        }
      });
    }
  };

  // watch user(username&password):
  useEffect(() => {
    if (user.username !== "" && user.username.match(emailValidation) !== null) {
      setIsError((state) => ({ ...state, username: false }));
    }
    if (user.password !== "") {
      setIsError((state) => ({ ...state, password: false }));
    }
  }, [user.username, user.password]);

  // watch remember:
  // remember === true: set localStorage user
  // remember === false: remove localStorage user
  useEffect(() => {
    if (remember) {
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("user");
    }
  }, [remember, user]);
  const handleForget = () =>
    sweetAlert(`info`, `Hi！Irene！`, `忘記密碼了嗎？去翻翻你的筆記本～`);
  return (
    <>
      <div className="loginPage">
        <div className="container">
          <Link to="/" className="material-symbols-outlined go-home">
            home
          </Link>
          <div className="login">
            <form className="login-form" onSubmit={onSubmit}>
              <label htmlFor="username">
                <span className="title">信箱｜Email</span>
                <input
                  type="text"
                  id="username"
                  placeholder="請輸入Email"
                  style={isError.username ? { borderColor: "#ff5f5f" } : {}}
                  value={user.username}
                  onChange={(e) =>
                    setUser((state) => ({ ...state, username: e.target.value }))
                  }
                />
                {isError.username ? (
                  <span className="input-error">請輸入正確Email格式</span>
                ) : null}
              </label>
              <label htmlFor="password">
                <span className="title">密碼｜Password</span>
                <input
                  type="password"
                  id="password"
                  placeholder="請輸入密碼"
                  style={isError.password ? { borderColor: "#ff5f5f" } : {}}
                  value={user.password}
                  onChange={(e) =>
                    setUser((state) => ({ ...state, password: e.target.value }))
                  }
                />
                {isError.password ? (
                  <span className="input-error">請輸入密碼</span>
                ) : null}
              </label>
              <label className="remember" htmlFor="remember">
                <span className={`checkbox ${remember?'isChecked':''}`}></span>
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember((state) => !state)}
                />
                <span className="rememberMe">記住我</span>
              </label>
              <button type="submit">送出</button>
              <p>
                忘記密碼｜<span onClick={handleForget}>Forgot password？</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
