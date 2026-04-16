import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { isLoggedIn, logout, user, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleLogoutUser() {
    axios
      .post(`http://localhost:3000/api/auth/logout`)
      .then(() => {
        logout();
        showToast("Logged out successfully", "success");
        navigate("/login");
      })
      .catch((err) => {
        let message = err.response.data.message || "Something went wrong";
        showToast(message, "error");
      });
  }

  return (
    <section className="max-h-1/2 w-full border-b border-gray-200 flex items-center justify-between py-2 px-4">
      <div className="flex-1 text-lg font-bold text-shadow-lg">
        ExpenseTracker
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold underline">
              {!loading && user.name}
            </h2>
            <button
              onClick={handleLogoutUser}
              className="bg-gray-800 py-1 px-2.5 shadow-md rounded-lg text-gray-100 font-medium text-md cursor-pointer hover:opacity-90 hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="bg-gray-100 flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer shadow-md hover:shadow-lg text-md font-medium"
            >
              <img src="/login_logo.png" alt="login-logo" className="h-6 w-6" />
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="bg-gray-900 py-2 px-4 rounded-lg flex items-center gap-2 text-white cursor-pointer shadow-md hover:shadow-lg text-md font-medium"
            >
              <img
                src="/register_logo.png"
                alt="register-logo"
                className="h-6 w-6 bg-white rounded-sm"
              />
              Signup
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
