import CategoryBreakdown from "./CategoryBreakdown";
import DashboardHeader from "./DashboardHeader";
import QuickActions from "./QuickActions";
import RecentTransactions from "./RecentTransactions";
import SpendingOverview from "./SpendingOverview";

function Dashboard() {
    return (
        <main className="w-full h-full pt-18 flex overflow-scroll">
            <div className="flex-1 p-4">
                <DashboardHeader />
                <div className="flex-1 p-4 flex items-center justify-center gap-4">
                    <div className="w-full p-2 border border-(--border) rounded-lg bg-(--surface) flex flex-col items-start justify-start gap-3">
                        <div className="w-full p-2">
                            <h1 className="text-sm font-bold text-(--text-primary)">
                                Spendings Overview
                            </h1>
                        </div>
                        <SpendingOverview />
                    </div>
                    <div className="w-full p-2 flex flex-col items-start justify-start gap-3 border border-(--border) rounded-lg bg-(--surface)">
                        <div className="w-full p-2">
                            <h1 className="text-sm font-bold text-(--text-primary)">
                                Categories
                            </h1>
                        </div>
                        <CategoryBreakdown />
                    </div>
                </div>
                <div className="p-4">
                    <QuickActions />
                </div>
            </div>
            {/* recent transactions */}
            <div className="w-sm p-4">
                <RecentTransactions />
            </div>
        </main>
    );
}

export default Dashboard;
