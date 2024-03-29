import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useState, useEffect } from "react";
import { doRequest, getUsername } from "../../utils/common";
import dataProvince from "../../constants/provinces.json";
import dataDistrict from "../../constants/districts.json";
import dataWard from "../../constants/wards.json";
import { PATTERN } from "../../constants/common";
export default function Create({ closeAddNewAddressForm, getDeliveryAddress }) {
  const userName = getUsername();
  const [provincesInit, setProvincesInit] = useState([]);
  const [districtsInit, setDistrictsInit] = useState([]);
  const [wardsInit, setWardsInit] = useState([]);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [fullname, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  const [address, setAddress] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const [errorFullName, setErrorFullName] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorProvince, setErrorProvince] = useState(false);
  const [errorDistrict, setErrorDistrict] = useState(false);
  const [errorWard, setErrorWard] = useState(false);
  const [errorSpecificAddress, setErrorSpecificAddress] = useState(false);

  const [showOption, setShowOption] = useState(false);

  async function getDataProvinces() {
    setProvincesInit(dataProvince.data.data);
  }

  async function getDataDistricts(e) {
    const [code, name] = e.target.value.split(",");
    const filterDistricts = dataDistrict.data.data.filter((distict) =>
      distict.parent_code.includes(code)
    );
    setDistrictsInit(filterDistricts);
    setProvince(name != undefined ? name : "");
  }

  async function getDataWard(e) {
    const [code, name] = e.target.value.split(",");
    const filterDistricts = dataWard.data.data.filter((ward) =>
      ward.parent_code.includes(code)
    );
    setWardsInit(filterDistricts);
    setDistrict(name != undefined ? name : "");
  }

  const handleSetSpecificAddress = (e) => {
    setSpecificAddress(e.target.value);
    setErrorSpecificAddress(false);
  };

  const handleSetFullName = (e) => {
    setFullName(e.target.value);
    setErrorFullName(false);
  };

  const handleSetPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    setErrorPhoneNumber(false);
  };

  const handleSetDefault = (e) => {
    setIsDefault(e.target.checked);
  };

  const isValidPhone = () => {
    return !PATTERN.PHONE.test(phoneNumber);
  };

  const AddNewAddress = async () => {
    let flag = true;

    const checkAndSetError = (value, setError) => {
      if (value.trim() === "") {
        flag = false;
        setError(true);
      }
    };

    checkAndSetError(fullname, setErrorFullName);
    checkAndSetError(phoneNumber, setErrorPhoneNumber);
    checkAndSetError(specificAddress, setErrorSpecificAddress);
    checkAndSetError(province, setErrorProvince);
    checkAndSetError(district, setErrorDistrict);
    checkAndSetError(ward, setErrorWard);

    if (isValidPhone()) {
      flag = false;
      setErrorPhoneNumber(true);
    }

    if (flag) {
      const response = await doRequest(
        "post",
        "api/DeliveryAddress/AddNewAddress",
        {
          data: {
            userName: userName,
            fullName: fullname,
            phoneNumber: phoneNumber,
            address: address,
            specificAddress: specificAddress,
            isDefault: isDefault,
          },
        }
      );
      await getDeliveryAddress();
      closeAddNewAddressForm();
    }
  };

  useEffect(() => {
    getDataProvinces();
  }, []);

  useEffect(() => {
    setAddress(() => {
      let updatedState = "";

      if (province !== "") {
        updatedState += province;
        setErrorProvince(false);
      }

      if (district !== "") {
        updatedState += ", " + district;
        setErrorDistrict(false);
      }

      if (ward !== "") {
        updatedState += ", " + ward;
        setErrorWard(false);
      }

      return updatedState;
    });
  }, [province, district, ward]);

  const handleSetWard = (e) => {
    setWard(e.target.value);
  };

  const toggleShowOption = () => {
    setShowOption(!showOption);
  };

  return (
    <>
      {/* Form add address */}
      <div className="fixed top-0 left-0 bg-[rgba(0,0,0,.3)] h-[100%] w-[100%] z-[100]">
        <div className="update-review fixed bg-slate-50 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 w-[30%]">
          <div className="flex px-6 py-3 border-solid border-b-2">
            <span className="text-[20px] font-bold">Add new address</span>
          </div>
          <div className="block pt-0 px-6 pb-6 h-[350px]">
            {/* Item */}
            <div className="row mb-9">
              <div className="col-md-6">
                <Input
                  type="text"
                  placeholder="Your full name"
                  className={`!text-[16px] w-full ${
                    errorFullName ? "!border-red-500" : ""
                  }`}
                  handleChange={(e) => handleSetFullName(e)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  type="text"
                  placeholder="Phone number"
                  className={`!text-[16px] ${
                    errorPhoneNumber ? "!border-red-500" : ""
                  }`}
                  handleChange={(e) => handleSetPhoneNumber(e)}
                />
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="option"
                  className="w-full relative cursor-pointer"
                  onClick={() => toggleShowOption()}
                >
                  <input
                    type="text"
                    value={address}
                    className={`form-control !bg-[#fff] flex cursor-pointer ${
                      errorProvince || errorDistrict || errorWard
                        ? "!border-red-500"
                        : ""
                    }`}
                    readOnly
                  />
                  <div className="absolute top-0 right-4 translate-y-1/3 translate-x-1/2">
                    <i className="fa solid fa-chevron-down"></i>
                  </div>
                </label>
              </div>
              {showOption && (
                <>
                  <div className="col-md-4 w-full">
                    <select
                      id="provinces"
                      className={`w-full border p-2 ${
                        errorProvince ? "!border-red-500" : ""
                      }`}
                      onChange={(e) => getDataDistricts(e)}
                    >
                      <option value="">Select provinces</option>
                      {provincesInit.map((item) => (
                        <option
                          value={item.code + "," + item.name_with_type}
                          key={item._id}
                        >
                          {item.name_with_type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select
                      id="districts"
                      className={`w-full border p-2 ${
                        errorDistrict ? "!border-red-500" : ""
                      }`}
                      onChange={(e) => getDataWard(e)}
                    >
                      <option value="">Select district</option>
                      {districtsInit.length > 0 &&
                        districtsInit.map((item) => (
                          <option
                            value={item.code + "," + item.name_with_type}
                            key={item._id}
                          >
                            {item.name_with_type}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-4 w-full">
                    <select
                      id="wards"
                      className={`w-full border p-2 ${
                        errorWard ? "!border-red-500" : ""
                      }`}
                      onChange={(e) => handleSetWard(e)}
                    >
                      <option value="">Select ward</option>
                      {wardsInit.length > 0 &&
                        wardsInit.map((item) => (
                          <option value={item.name_with_type} key={item._id}>
                            {item.name_with_type}
                          </option>
                        ))}
                    </select>
                  </div>
                </>
              )}
            </div>
            {/* Item end */}
            <div>
              <Input
                type="text"
                placeholder="Specific address"
                className={`!text-[16px] ${
                  errorSpecificAddress ? "!border-red-500" : ""
                }`}
                value={specificAddress}
                handleChange={(e) => handleSetSpecificAddress(e)}
              />
            </div>
            <div className="flex mt-3">
              <label
                className="relative flex items-center rounded-full cursor-pointer !mb-1"
                htmlFor="red"
              >
                <input
                  type="checkbox"
                  className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#ffc43d] checked:bg-[#ffc43d] checked:before:bg-[#ffc43d] hover:before:opacity-10 
                      `}
                  id="red"
                  onChange={(e) => handleSetDefault(e)}
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <span className="ml-2">Default address</span>
            </div>
          </div>
          <div className="flex bg-white border-t-2 border-solid px-6 h-16 justify-end">
            <Button
              text="Cancel"
              className="border-[1px] border-solid border-[#ffc43d] bg-white !text-[#ffc43d] mr-2 !px-4 h-10"
              handleClickBtn={() => closeAddNewAddressForm()}
            />
            <Button
              text="Submit"
              className="!px-4 h-10"
              handleClickBtn={() => AddNewAddress()}
            />
          </div>
        </div>
      </div>
      {/* End Form add address */}
    </>
  );
}
