import {TransactionList} from "./TransactionList.js";
import {AbstractTransactionHandler} from "./AbstractTransactionHandler.js";
import {UiHandler} from "../UiHandler.js";

export class TransactionListHandler {

    /**
     * @property transactionList {TransactionList}
     */
    transactionList;

    constructor() {
        this.transactionList = new TransactionList();
    }

    /**
     * @param transactionHandler {AbstractTransactionHandler}
     * @param uiHandler {UiHandler}
     */
    fillTransactionList(transactionHandler, uiHandler) {
        transactionHandler.buildTransactions().forEach((transaction) => {
            transaction.id = this.transactionList.transactions.length;
            this.transactionList.transactions.push(transaction);
            uiHandler.addTransaction(transaction);
        });
    }

    getTransactionIdsByIban(iban) {
        let ids = [];
        this.transactionList.transactions.forEach((transaction) => {
            if (transaction.iban === iban) ids.push(transaction.id);
        });
        return ids;
    }

    refreshList(){
        this.transactionList = new TransactionList();
    }
}