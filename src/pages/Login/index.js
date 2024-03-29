import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoesBg from "../../assets/img/shoesbg.png";
import "../../assets/css/login.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorMess from "../../components/ErrorMess";
import { doRequest, getUsername } from "../../utils/common";
import Cookies from 'js-cookie';
import { ERROR_MESSAGE } from "../../constants/common";
import { toast } from "react-toastify";
import Notification from "../../components/Notification/Notification";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e, atr) => {
    setErrorUsername('');
    setErrorPassword('');
    const attributeToSetterMap = {
      username: setUserName,
      password: setPassword,
    };

    const setter = attributeToSetterMap[atr];
    if (setter) {
      setter(e.target.value);
    }
  };
  const handleValidateLogin = () => {
    var isValid = true;
    if (userName.trim() === "") {
      setErrorUsername(ERROR_MESSAGE.REQUIRE);
      isValid = false;
    } else if (userName.length > 20) {
      setErrorUsername(ERROR_MESSAGE.LOGIN.USERNAME);
      isValid = false;
    } else {
      setErrorUsername("");
    }

    if (password.trim() === "") {
      setErrorPassword(ERROR_MESSAGE.REQUIRE);
      isValid = false;
    } else if (password.length < 0) {
      setErrorPassword(ERROR_MESSAGE.LOGIN.PASSWORD);
      isValid = false;
    } else {
      setErrorPassword("");
    }
    if (isValid) {
      handleLogin();

    }
  };

  const handleRememberMe = () => {
    setIsRemember(!isRemember);
  }

  const handleCreateCookie = () => {
    // Set cookie to expire in 3 days
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);

    Cookies.set('username', userName, { expires: expirationDate, path: '/' });
  }
  async function handleLogin() {
    if (errorUsername === "" && errorPassword === "") {
      const response = await doRequest("post", "api/Login/Login", { data: { userName: userName, password: password } });

      if (response.data.isSuccess === true) {

        if (isRemember) {
          handleCreateCookie();
        }
        sessionStorage.setItem("username", userName);
        navigate("/");
      } else {
        setErrorPassword("Username or password is incorrect");
      }
    }
  }

  const notify = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    if (getUsername() !== null) {
      navigate("/");
    }

    if (sessionStorage.getItem("alert") !== "undefined") {
      notify(sessionStorage.getItem("alert"));
      setTimeout(function () {
        sessionStorage.removeItem("alert");
      }, 3000);
    }

  }, []);

  return (
    <div>
      <Notification />
      <div id="loginPage" className="vh-100">
        <div className="container py-5 h-100">
          <div className="d-flex align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
              <div className="contentLogin">
                <h6>Nice to see you again</h6>
                <h1>WELCOME BACK!</h1>
              </div>
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Login</h3>
                  <div className="form-outline mb-4">
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      handleChange={handleChange}
                    />
                    <ErrorMess text={errorUsername} />
                  </div>
                  <div className="form-outline mb-4">
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      handleChange={handleChange}
                    />
                    <ErrorMess text={errorPassword} />
                  </div>
                  <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" onChange={handleRememberMe} />
                        <label className="form-check-label">Remember me</label>
                      </div>
                    </div>

                    <div className="col text-right">
                      <Link
                        to="/signup"
                        className="m-auto text-black hover:text-black"
                      >
                        Sign up
                      </Link>
                      <br />
                      <Link
                        to="/"
                        className="m-auto text-black hover:text-black"
                      >
                        Forget Password
                      </Link>
                    </div>
                  </div>
                  <Button
                    text="Login"
                    className="btn-common-lg w-full"
                    handleClickBtn={() => handleValidateLogin()}
                  ></Button>
                </div>
              </div>
            </div>
            <div></div>
            <div id="image">
              <img id="shoesBg" src={ShoesBg} className="ml-[10rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
