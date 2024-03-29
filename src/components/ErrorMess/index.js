import PropTypes from "prop-types";

function ErrorMess({text, className, id}) {
  return (
    <>
    {(text !== "" && text !== undefined) && 
    (<div className={`text-red font-medium text-[15px] flex items-center mt-2 ${className}`}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3588/3588294.png"
        width={"19px"}
      />
      <span id={id} className="ml-1 text-[#f87171]">
        {text}
      </span>
    </div>)}
    </>
  );
}
ErrorMess.propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
}
export default ErrorMess;
