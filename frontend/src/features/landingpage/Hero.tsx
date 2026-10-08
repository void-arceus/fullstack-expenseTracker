import { BsStars } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";

function Hero() {
    return (
        <div className="h-screen w-full bg-(--background)">
            <div className="h-full w-full max-w-6xl mx-auto flex flex-col items-start gap-2 bg-(--background) px-4 lg-px-0">
                <div className="h-16 w-full" />
                <div className="w-full h-full flex flex-col md:flex-row items-center gap-2">
                    <div className="w-full h-full md:flex-1 flex flex-col items-start justify-center gap-6">
                        <span className="p-2 px-4 bg-(--accent-soft) rounded-full text-xs font-bold text-(--accent) flex items-center justify-start gap-2">
                            <BsStars size={15} /> Smart money habits, A better
                            tomorrow.
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-(--text-primary)">
                            Take Control of <br /> your money.
                        </h1>
                        <p className="text-sm font-semibold text-(--text-secondary) w-full max-w-sm">
                            Track your expenses, set budgets, and build better
                            financial habits - all in one place
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="px-5 py-3 bg-(--accent) hover:bg-(--accent-hover) hover:cursor-pointer rounded-xl text-sm text-[#ffffff] font-bold flex items-center justify-center gap-1 active:scale-[0.96] transition transform-scale duration-100 ease-in-out">
                                Get Started
                                <HiArrowRight size={18} />
                            </button>
                            <button className="px-6 py-3 border border-(--border) hover:border-(--border-strong) hover:cursor-pointer text-sm font-bold text-(--text-secondary) rounded-xl active:scale-[0.96] transition transform-scale duration-100 ease-in-out">
                                Sign In
                            </button>
                        </div>
                        <div className="flex items-center justify-start gap-6">
                            <div className="flex items-center justify-start gap-2">
                                <IoMdCheckmark
                                    size={20}
                                    className="text-(--accent)"
                                />
                                <p className="text-xs font-bold text-(--text-secondary)">
                                    Secure & Private
                                </p>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <IoMdCheckmark
                                    size={20}
                                    className="text-(--accent)"
                                />
                                <p className="text-xs font-bold text-(--text-secondary)">
                                    Easy to use
                                </p>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <IoMdCheckmark
                                    size={20}
                                    className="text-(--accent)"
                                />
                                <p className="text-xs font-bold text-(--text-secondary)">
                                    Works on Any Device
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1">
                        <img src="/hero_banner.svg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
