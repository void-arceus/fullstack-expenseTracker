import { useForm } from "react-hook-form";
import type { IThemeProp } from "../../pages/UserDashboard";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { FaArrowRight, FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "./auth.api";

export interface IRegisterInput {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Register({ handleToggleTheme, theme }: IThemeProp) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IRegisterInput>();
    const navigate = useNavigate();

    async function onSubmit(data: IRegisterInput) {
        try {
            await RegisterUser(data);
            navigate("/signin");
        } catch (error: any) {
            console.error(
                "Registration failed:",
                error.response?.message || error.message,
            );
        }
    }

    return (
        <main className="h-screen w-full relative bg-(--background) px-2">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl border border-(--border) rounded-xl px-5 sm:px-10 py-6 flex flex-col items-center gap-4 shadow-lg/5 bg-(--surface)"
            >
                <div className="w-full flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-md font-extrabold text-(--accent) hover:cursor-pointer hover:text-(--accent-hover) select-none"
                    >
                        ExpenseTracker
                    </button>
                    <button
                        type="button"
                        onClick={handleToggleTheme}
                        className="p-2 bg-(--accent-soft) rounded-full hover:cursor-pointer"
                    >
                        {theme === "light" ? (
                            <IoMoonOutline
                                size={20}
                                className="text-(--accent)"
                            />
                        ) : (
                            <IoSunnyOutline
                                size={20}
                                className="text-(--accent)"
                            />
                        )}
                    </button>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2">
                    <h1 className="text-3xl font-bold text-(--text-primary)">
                        Create your account
                    </h1>
                    <p className="text-(--text-secondary) text-sm font-semibold">
                        Join Expense Tracker and take control <br /> of your
                        money
                    </p>
                </div>
                <div className="relative w-full flex flex-col items-start justify-start gap-2">
                    <label
                        htmlFor="usrename"
                        className="text-xs text-(--text-secondary) font-bold"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        {...register("username", {
                            required: "username is required",
                        })}
                        placeholder="Choose a username"
                        className="w-full py-4 pr-3 px-8 border border-(--border) focus:border-(--border-strong) rounded-lg outline-0 text-xs text-(--text-secondary) font-semibold"
                    />
                    <FaRegUser
                        size={16}
                        className="absolute text-(--text-secondary) top-10.5 left-2"
                    />
                    {errors.username && (
                        <span className="text-xs font-semibold text-(--danger)">
                            {errors.username.message}
                        </span>
                    )}
                </div>
                <div className="relative w-full flex flex-col items-start justify-start gap-2">
                    <label
                        htmlFor="email"
                        className="text-xs text-(--text-secondary) font-bold"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                        placeholder="you@example.com"
                        className="w-full py-4 pr-3 px-8 border border-(--border) focus:border-(--border-strong) rounded-lg outline-0 text-xs text-(--text-secondary) font-semibold"
                    />
                    <HiOutlineMail
                        size={20}
                        className="absolute text-(--text-secondary) top-10 left-2"
                    />
                    {errors.email && (
                        <span className="text-xs font-semibold text-(--danger)">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="relative w-full flex flex-col items-start justify-start gap-2">
                    <label
                        htmlFor="password"
                        className="text-xs text-(--text-secondary) font-bold"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters long",
                            },
                            validate: {
                                hasLowerCase: (value) =>
                                    /[a-z]/.test(value) ||
                                    "Password must contain at least one lowercase character",
                                hasUpperCase: (value) =>
                                    /[A-Z]/.test(value) ||
                                    "Password must contain at least one uppercase character",
                                hasSpecialChar: (value) =>
                                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                    "Password must contain at least one special character",
                            },
                        })}
                        placeholder="Enter your password"
                        className="w-full py-4 pr-3 px-8 border border-(--border) focus:border-(--border-strong) rounded-lg outline-0 text-xs text-(--text-secondary) font-semibold"
                    />
                    <GoLock
                        size={20}
                        className="absolute text-(--text-secondary) top-10 left-2"
                    />
                    {errors.password && (
                        <span className="text-xs font-semibold text-(--danger)">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="relative w-full flex flex-col items-start justify-start gap-2">
                    <label
                        htmlFor="confirmPassword"
                        className="text-xs text-(--text-secondary) font-bold"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (val) => {
                                if (watch("password") !== val) {
                                    return "Your passwords do not match";
                                }
                            },
                        })}
                        placeholder="Confirm your password"
                        className="w-full py-4 pr-3 px-8 border border-(--border) focus:border-(--border-strong) rounded-lg outline-0 text-xs text-(--text-secondary) font-semibold"
                    />
                    <GoLock
                        size={20}
                        className="absolute text-(--text-secondary) top-10 left-2"
                    />
                    {errors.confirmPassword && (
                        <span className="text-xs font-semibold text-(--danger)">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <div className="w-full mt-2">
                    <button
                        type="submit"
                        className="w-full p-3.5 text-sm font-semibold text-[#ffffff] bg-(--accent) flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-(--accent-hover) rounded-lg shadow-md/10 hover:shadow-md/20 active:scale-[0.98] select-none"
                    >
                        Register <FaArrowRight size={15} />
                    </button>
                </div>
                <div className="w-full flex items-center justify-center gap-2">
                    <hr className="w-full text-(--text-muted)" />
                    <span className="text-xs font-semibold text-(--text-secondary)">
                        OR
                    </span>
                    <hr className="w-full text-(--text-muted)" />
                </div>
                <div className="w-full flex items-center justify-center gap-2">
                    <p className="text-xs font-semibold text-(--text-primary)">
                        Already have an account?
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/signin")}
                        className="text-xs font-semibold hover:cursor-pointer text-(--accent) hover:text-(--accent-hover)"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </main>
    );
}

export default Register;
