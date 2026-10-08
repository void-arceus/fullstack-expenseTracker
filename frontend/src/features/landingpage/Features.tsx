import { BiBarChartAlt2 } from "react-icons/bi";
import { FaMobileScreen } from "react-icons/fa6";
import { ImTarget } from "react-icons/im";
import { RiPieChart2Fill, RiSecurePaymentFill } from "react-icons/ri";

function Features() {
    return (
        <section className="w-full bg-(--surface)">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-start justify-start gap-4 py-10 px-4 lg:px-0">
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <span className="text-xs font-bold text-(--accent) bg-(--accent-soft) px-4 py-1.5 rounded-full">
                        Why Choose Us
                    </span>
                    <h1 className="text-center text-3xl font-extrabold text-(--text-primary)">
                        Everything you need to manage your finances
                    </h1>
                    <p className="text-xs font-semibold text-(--text-secondary) w-full max-w-md text-center">
                        Simple tools, powerful insights, and a clean experience
                        - designed to help you spend smarter and reach your
                        goals
                    </p>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-2">
                    <div className="w-full flex flex-col items-start gap-1 p-4">
                        <div className="w-fit p-2 bg-(--accent-soft) rounded-full flex items-center justify-center text-(--accent)">
                            <BiBarChartAlt2 size={25} />
                        </div>
                        <h1 className="text-lg text-(--text-primary) font-bold">
                            Track Expenses
                        </h1>
                        <p className="text-xs font-semibold text-(--text-secondary) leading-5">
                            Log your daily expenses and see where your money
                            goes in real time.
                        </p>
                    </div>

                    <div className="w-full flex flex-col items-start gap-1 p-4">
                        <div className="w-fit p-2 bg-(--accent-soft) rounded-full flex items-center justify-center text-(--accent)">
                            <ImTarget size={25} />
                        </div>
                        <h1 className="text-lg text-(--text-primary) font-bold">
                            Set Budgets
                        </h1>
                        <p className="text-xs font-semibold text-(--text-secondary) leading-5">
                            Create category-wise budgets and stay on track with
                            your financial goals.
                        </p>
                    </div>

                    <div className="w-full flex flex-col items-start gap-1 p-4">
                        <div className="w-fit p-2 bg-(--accent-soft) rounded-full flex items-center justify-center text-(--accent)">
                            <RiPieChart2Fill size={25} />
                        </div>
                        <h1 className="text-lg text-(--text-primary) font-bold">
                            Visual Insights
                        </h1>
                        <p className="text-xs font-semibold text-(--text-secondary) leading-5">
                            Get clear charts and reports to understand your
                            spending patterns.
                        </p>
                    </div>

                    <div className="w-full flex flex-col items-start gap-1 p-4">
                        <div className="w-fit p-2 bg-(--accent-soft) rounded-full flex items-center justify-center text-(--accent)">
                            <RiSecurePaymentFill size={25} />
                        </div>
                        <h1 className="text-lg text-(--text-primary) font-bold">
                            Secure & Private
                        </h1>
                        <p className="text-xs font-semibold text-(--text-secondary) leading-5">
                            Your data is safe with us. We use industry-standard
                            security practices.
                        </p>
                    </div>

                    <div className="w-full flex flex-col items-start gap-1 p-4">
                        <div className="w-fit p-2 bg-(--accent-soft) rounded-full flex items-center justify-center text-(--accent)">
                            <FaMobileScreen size={25} />
                        </div>
                        <h1 className="text-lg text-(--text-primary) font-bold">
                            Access Anywhere
                        </h1>
                        <p className="text-xs font-semibold text-(--text-secondary) leading-5">
                            Use Expense Tracker no any device, anytime,
                            anywhere.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;
