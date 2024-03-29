import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function NotificationEmptyCart() {
  const navigate = useNavigate();

  return (
    <>
      {/* Form alert cart empty  */}
      <div className="fixed top-0 left-0 bg-[rgba(0,0,0,.3)] h-[100%] w-[100%] z-[100]">
        <div className="update-review fixed bg-slate-50 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 w-[30%] p-4">
          <p>
            Some products in the shopping cart have just been updated, please
            check and try again.
          </p>
          <div className="flex justify-end">
            <Button
              text={"OK"}
              handleClickBtn={() => navigate("/cart")}
              className="!px-10"
            />
          </div>
        </div>
      </div>
      {/* End Form alert cart empty */}
    </>
  );
}
