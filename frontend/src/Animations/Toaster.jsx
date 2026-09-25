const Toaster = ({ show, message, type }) => {
  return (
    <div
      className={` ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}
        ${type === "success" ? "bg-green-500" : "bg-red-500"} fixed right-4 top-20 z-50 border border-gray-200 rounded-xl w-xs h-15 flex items-center shadow-md transition-all duration-300`}
    >
      <div className="w-full flex items-center justify-between p-4 text-md font-medium text-white">
        <p>{message}</p>
        <button className="cursor-pointer">
          <img src="/close.png" alt="close" className="h-2" />
        </button>
      </div>
    </div>
  );
};

export default Toaster;
