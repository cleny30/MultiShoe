import { Link, useNavigate } from "react-router-dom";
import ShoesBg from "../../assets/img/bg_shoes_register.png";
import "../../assets/css/signUp.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorMess from "../../components/ErrorMess";
import { doRequest } from "../../utils/common";
import Verify from "./Verify";
import { signup, PATTERN, ERROR_MESSAGE } from "../../constants/common";
import { useEffect, useState } from "react";

function SignUp() {
  const [userName, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isVerify, setIsVerify] = useState(false);
  const [serverOTP, setServerOTP] = useState("");
  const navigate = useNavigate();

  const handleChange = (e, atr) => {
    const attributeToSetterMap = {
      username: setUsername,
      fullname: setFullname,
      email: setEmail,
      phonenum: setPhone,
      password: setPassword,
      re_password: setRePassword,
    };

    const setter = attributeToSetterMap[atr];
    if (setter) {
      setter(e.target.value);
    }
  };

  const setErrorMessage = (index, condition, message) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = condition ? message : "";
      return newErrors;
    });
  };

  const validateField = (
    index,
    value,
    maxLength,
    validationFunc,
    errorMessage
  ) => {
    const isEmpty = value == null || value.trim() === "";
    setErrorMessage(index, isEmpty, ERROR_MESSAGE.REQUIRE);

    if (!isEmpty) {
      setErrorMessage(index, value.length > maxLength, errorMessage);
      if (validationFunc) {
        setErrorMessage(index, validationFunc(value), errorMessage);
      }
    }
  };

  const handleValidateSignUp = () => {
    reset();
    validateField(
      0,
      userName,
      20,
      (value) => value.length < 3,
      ERROR_MESSAGE.SIGNUP.USERNAME
    );
    validateField(1, fullname, 50, null, ERROR_MESSAGE.SIGNUP.FULLNAME);
    validateField(2, email, null, isValidEmail, ERROR_MESSAGE.SIGNUP.EMAIL);
    validateField(3, phone, null, isValidPhone, ERROR_MESSAGE.SIGNUP.PHONE);
    validateField(
      4,
      password,
      null,
      isValidPassword,
      ERROR_MESSAGE.SIGNUP.PASSWORD
    );
    validateField(
      5,
      rePassword,
      null,
      (value) => value !== password,
      ERROR_MESSAGE.SIGNUP.RE_PASSWORD
    );
    setErrors((prevErrors) => {
      // Check if there are any errors before proceeding to VerifyAccount()
      if (prevErrors.some((error) => error !== "")) {
        // There are errors, do not proceed to VerifyAccount()
        return prevErrors;
      }

      // No errors, proceed to VerifyAccount()
      VerifyAccount();

      // Return an empty array to ensure it's cleared after verification
      return [];
    });
  };

  const isValidEmail = () => {
    return !PATTERN.EMAIL.test(email);
  };

  const isValidPhone = () => {
    return !PATTERN.PHONE.test(phone);
  };

  const isValidPassword = () => {
    return !PATTERN.PASSWORD.test(password);
  };

  const handleSetServerOTP = (value) => {
    setServerOTP(value);
  };

  const reset = () => {
    setErrors([]);
  };

  async function VerifyAccount() {
    const response = await doRequest(
      "get",
      `api/Register/VerifyAccount?userName=${userName}&email=${email}`
    );

    const [userNameResult, emailResult] = response.data.result;

    if (userNameResult == null && emailResult == null) {
      setIsVerify(true);
    } else {
      if (userNameResult != null) {
        validateField(0, userName, null, null, userNameResult);
      }

      if (emailResult != null) {
        validateField(2, email, null, null, emailResult);
      }
    }
  }

  async function sendOTP() {
    const response = await doRequest(
      "get",
      `api/Email/SendVerificationEmail?userName=${userName}&email=${email}`
    );
    handleSetServerOTP(response.data.result);
  }

  async function Register() {
    const response = await doRequest("post", "api/Register/Register", {
      data: {
        userName: userName,
        password: password,
        fullName: fullname,
        phoneNumber: phone,
        email: email,
      },
    });

    if (response.data.isSuccess === true) {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (isVerify) {
      sendOTP();
    }
  }, [isVerify]);
  return (
    <div id="signUpPage" className="w-full h-full">
      <div className="vh-100">
        <div className="py-5 h-100">
          <div
            id="formGroup"
            className="d-flex justify-content-center align-items-center h-100 items"
          >
            <div id="image">
              <img id="shoesBg" src={ShoesBg} />
            </div>
            {!isVerify ? (
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong m-auto">
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Sign Up</h3>
                    {signup.map((item, index) => {
                      return (
                        <div className="form-outline mb-4" key={item.NAME}>
                          <Input
                            type={item.TYPE}
                            name={item.NAME}
                            placeholder={item.PLACEHOLDER}
                            isRequired={true}
                            handleChange={handleChange}
                          />
                          <ErrorMess text={errors[index]} />
                        </div>
                      );
                    })}
                    <Link
                      to="/login"
                      className=" text-black hover:text-black ml-[84%]"
                    >
                      Login
                    </Link>
                    <Button
                      className="btn-common-lg w-full mt-3"
                      type="submit"
                      text="Sign up"
                      handleClickBtn={() => handleValidateSignUp()}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Verify
                serverOTP={serverOTP}
                Register={Register}
                sendOTP={sendOTP}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
