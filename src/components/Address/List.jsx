import React from "react";
import Button from "../../components/Button";

export default function List({
  deliveryAddress,
  addressIdSelected,
  handleChangeAddressIdRadio,
  openAddNewAddressForm,
  openUpdateAddressForm,
  closeChangeAddressForm,
  handleChangeAddress,
}) {
  return (
    <>
      {/* Form change address */}
      <div className="fixed top-0 left-0 bg-[rgba(0,0,0,.3)] h-[100%] w-[100%] z-[100]">
        <div className="update-review fixed bg-slate-50 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 w-[28%]">
          <div className="flex px-6 py-3 border-solid border-b-2">
            <span className="text-[20px] font-bold">My delivery address</span>
          </div>
          <div className="block pt-0 px-6 pb-6 h-[450px] overflow-y-scroll list-item-delivery">
            {deliveryAddress.map((item) => (
              <div className="flex py-4" key={item.id}>
                <div className="pr-1 mr-2">
                  <label className="container-radio-delivery">
                    <input
                      type="radio"
                      defaultChecked={addressIdSelected == item.id.toString()}
                      value={item.id}
                      onChange={(e) => handleChangeAddressIdRadio(e)}
                      name="radio-delivery"
                    />
                    <span className="checkmark-delivery"></span>
                  </label>
                </div>
                <div className="w-[100%]">
                  <div className="flex">
                    <div className="flex">
                      <span className="inline-flex font-medium">
                        {item.fullname}
                      </span>
                      <div className="border-l-[0.5px] border-solid border-[#00000042] mx-2"></div>
                      <span className="inline-flex">{item.phoneNumber}</span>
                    </div>
                    <div className="ml-auto w-fit">
                      <Button
                        className="bg-transparent border-0 !text-[#ffc107] outline-none p-0 whitespace-nowrap m-0"
                        text="Edit"
                        handleClickBtn={() => openUpdateAddressForm(item.id)}
                      />
                    </div>
                  </div>
                  <div className="text-[.875rem] leading-[1.25rem] mt-1">
                    {item.specificAddress}
                  </div>
                  <div className="text-[.875rem] leading-[1.25rem] mt-1">
                    {item.address}
                  </div>
                  {item.isDefault && (
                    <div className="text-[.875rem] leading-[1.25rem] mt-1 text-red-500 border-[1px] border-solid border-red-500 w-fit p-1">
                      Default address
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div>
              <Button
                text={
                  <>
                    <i className="fa solid fa-plus"></i>
                    <span className="ml-2">Add new address</span>
                  </>
                }
                className="border-[1px] border-solid border-[#ffc43d] bg-transparent !text-[#ffc43d] mr-2 !px-4 h-10"
                handleClickBtn={() => openAddNewAddressForm()}
              />
            </div>
          </div>
          <div className="flex bg-white border-t-2 border-solid px-6 h-16 justify-end">
            <Button
              text="Cancel"
              className="border-[1px] border-solid border-[#ffc43d] bg-white !text-[#ffc43d] mr-2 !px-4 h-10"
              handleClickBtn={() => closeChangeAddressForm()}
            />
            <Button
              text="Submit"
              className="!px-4 h-10"
              handleClickBtn={() => handleChangeAddress()}
            />
          </div>
        </div>
      </div>
      {/* End Form change address */}
    </>
  );
}
