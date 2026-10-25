import { useState } from "react";
import TransactionHeader from "./TransactionHeader";
import TransactionsTable from "./TransactionsTable";
import CreateTransaction from "./CreateTransaction";

function Transactions() {
  const [showTransactionForm, setShowTransactionForm] =
    useState<boolean>(false);

  function handleShowTransactionForm(val: boolean): void {
    setShowTransactionForm(val);
  }

  return (
    <div className="pt-18 px-6 flex flex-col h-screen w-full">
      <TransactionHeader
        handleShowTransactionForm={handleShowTransactionForm}
      />
      <div className="w-full h-full">
        {showTransactionForm ? (
          <CreateTransaction
            handleShowTransactionForm={handleShowTransactionForm}
          />
        ) : (
          <TransactionsTable />
        )}
      </div>
    </div>
  );
}

export default Transactions;
