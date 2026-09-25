import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData.entries());
    console.log("Data:", dataObj);
    if (dataObj.password !== dataObj.confirmPassword) {
      // later will change to toaster message
      console.log("Password didn't matched");
      return;
    }
    axios
      .post(`http://localhost:3000/api/auth/register`, dataObj)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data.message));
  }
  return (
    <div className="h-screen w-full relative">
      <div className="flex flex-col items-center gap-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-sm h-fit py-10 rounded-2xl border-2 border-gray-200 shadow-xl">
        <div className="w-full text-center">
          <h1 className="text-4xl font-medium text-shadow-lg">Register</h1>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="w-full p-2 flex flex-col items-center gap-3"
        >
          <div className="w-full flex flex-col items-center gap-3">
            <input
              type="text"
              name="name"
              placeholder="username"
              required
              className="w-full border-2 border-gray-300 rounded-lg p-2.5 outline-0 focus:border-gray-600"
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              required
              className="w-full border-2 border-gray-300 rounded-lg p-2.5 outline-0 focus:border-gray-600"
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              className="w-full p-2.5 border-2 border-gray-300 rounded-lg outline-0 focus:border-gray-600"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              required
              className="w-full p-2.5 border-2 border-gray-300 rounded-lg outline-0 focus:border-gray-600"
            />
          </div>
          <div className="w-full">
            <p className="text-md font-medium">
              Already have an Account? &nbsp;
              <span className="text-red-700 underline cursor-pointer hover:text-red-500">
                Login
              </span>
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <button className="bg-gray-900 text-gray-100 font-medium w-full p-2.5 rounded-lg shadow-sm cursor-pointer hover:shadow-lg hover:opacity-95">
              Register
            </button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-black text-md font-medium hover:underline hover:opacity-90 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
