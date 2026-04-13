import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import axios from "axios";

const Login = () => {
  const { login, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleUserLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData.entries());
    if (!dataObj.email || !dataObj.password) {
      showToast("Missing Credentials", "error");
      return;
    }
    axios
      .post(`http://localhost:3000/api/auth/login`, dataObj)
      .then((res) => {
        console.log(res.data.data);
        login(res.data.data);
        showToast(res.data.message, "success");
        navigate("/");
      })
      .catch((err) => {
        const message = err.response.data.message || "Something went wrong";
        showToast(message, "error");
      });
  }

  return (
    <div className="h-screen w-full relative">
      <div className="flex flex-col items-center gap-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-85 h-fit py-10 rounded-2xl border-2 border-gray-200 shadow-xl">
        <div className="w-full text-center">
          <h1 className="text-4xl font-medium text-shadow-lg">Login</h1>
        </div>
        <form
          onSubmit={handleUserLogin}
          className="w-full p-2 flex flex-col items-center gap-3"
        >
          <div className="w-full flex flex-col items-center gap-3">
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
          </div>
          <div className="w-full">
            <p className="text-md font-medium">
              Don't have an account? &nbsp;
              <span className="text-red-700 underline cursor-pointer hover:text-red-500">
                Create
              </span>
            </p>
            <p className="text-md font-medium hover:underline cursor-pointer text-red-700 hover:text-red-500">
              Forgot Password
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <button
              type="submit"
              className="bg-gray-900 text-gray-100 font-medium w-full p-2.5 rounded-lg shadow-sm cursor-pointer hover:shadow-lg hover:opacity-95"
            >
              Login
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
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

export default Login;
