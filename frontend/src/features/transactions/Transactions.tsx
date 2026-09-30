import TransactionHeader from "./TransactionHeader";
import TransactionsTable from "./TransactionsTable";

function Transactions() {
    return (
        <div className="pt-18 px-6 flex flex-col h-screen w-full">
            <TransactionHeader />
            <div className="w-full h-full">
                <TransactionsTable />
            </div>
        </div>
    );
}

export default Transactions;
