import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import type { IThemeProp } from "../../pages/Homepage";
import { useForm } from "react-hook-form";
import { DiRequirejs } from "react-icons/di";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";

interface ILoginInput {
    email: string;
    password: string;
}

function Login({ handleToggleTheme, theme }: IThemeProp) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ILoginInput>();

    return (
        <main className="h-screen w-full relative bg-(--background)">
            <form className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl border border-(--border) rounded-xl px-10 py-15 flex flex-col items-center gap-6 shadow-lg/5 bg-(--surface)">
                <div className="w-full flex items-center justify-end">
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
                        Welcome back
                    </h1>
                    <p className="text-(--text-secondary) text-sm font-semibold">
                        Log in to your account and continue <br /> managing your
                        finances.
                    </p>
                </div>
                <div className="relative w-full flex flex-col items-start justify-start gap-2">
                    <label
                        htmlFor="email"
                        className="text-xs text-(--text-secondary) font-bold"
                    >
                        Email
                    </label>
                    <input
                        {...register("email", { required: true })}
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
                        type="password"
                        {...register("password", { required: true })}
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
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2 flex-row-reverse">
                        <label
                            htmlFor="rememberme"
                            className="text-xs text-(--text-secondary) font-semibold select-none hover:cursor-pointer"
                        >
                            Remember me
                        </label>
                        <input
                            id="rememberme"
                            type="checkbox"
                            className="hover:cursor-pointer"
                        />
                    </div>
                    <button
                        type="button"
                        className="text-xs font-semibold text-(--accent) hover:text-(--accent-hover) hover:cursor-pointer"
                    >
                        Forgot Password?
                    </button>
                </div>
                <div className="w-full">
                    <button
                        type="button"
                        className="w-full p-3.5 text-sm font-semibold text-[#ffffff] bg-(--accent) flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-(--accent-hover) rounded-lg shadow-md/10 hover:shadow-md/20 active:scale-[0.98]"
                    >
                        Sign in <FaArrowRight size={15} />
                    </button>
                </div>
            </form>
        </main>
    );
}

export default Login;
