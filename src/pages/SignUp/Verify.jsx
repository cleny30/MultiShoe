import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import verifyimg from "../../assets/img/verify.png";
import ErrorMess from "../../components/ErrorMess";

export default function Verify({ serverOTP, Register, sendOTP }) {
  const [error, setError] = useState();
  const [otp, setOtp] = useState("");
  const [countDown, setCountDown] = useState(15);
  const [resendEnabled, setResendEnabled] = useState(false);
  const handleSetOTP = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = () => {
    if (serverOTP == otp) {
      Register();
    } else {
      setError("Your OTP is incorrect");
    }
  };

  const handleResend = () => {
    sendOTP();
    setError("");
    setCountDown(60);
    setResendEnabled(false);
  };

  useEffect(() => {
    let timer;

    if (countDown > 0) {
      timer = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countDown]);

  return (
    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
      <div className="card shadow-2-strong m-auto">
        <div className="card-body p-5 text-center">
          <img src={verifyimg} className="m-auto" />
          <h3 className="mb-1 font-semibold">Enter OTP Code:</h3>
          <Input type="text" className="mb-2" handleChange={handleSetOTP} />
          <ErrorMess text={error} className="text-lg mb-2" />
          <span
            className={`hover:text-[coral] cursor-pointer`}
            onClick={resendEnabled ? handleResend : undefined}
          >
            Resend OTP <span>({countDown})</span>
          </span>
          <Button
            className="btn-common-lg w-full rounded-sm mt-2 !bg-[#5c66ea]"
            type="submit"
            text="Verify"
            handleClickBtn={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
}
