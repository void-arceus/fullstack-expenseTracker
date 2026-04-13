import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddExpenseForm from "./components/AddExpenseForm";
import DisplayExpenses from "./components/DisplayExpenses";
import ToastLayout from "./Layout/ToastLayout";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<ToastLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addExpense" element={<AddExpenseForm />} />
              <Route path="viewExpenses" element={<DisplayExpenses />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
