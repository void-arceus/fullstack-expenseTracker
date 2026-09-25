import DashboardHeader from "./DashboardHeader";
import RecentTransactions from "./RecentTransactions";

function Dashboard() {
    return (
        <main className="w-full h-full pt-18 flex gap-2">
            <div className="flex-1 p-4">
                <DashboardHeader />
            </div>
            {/* recent transactions */}
            <div className="w-sm p-4">
                <RecentTransactions />
            </div>
        </main>
    );
}

export default Dashboard;
