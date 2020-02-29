import {TransactionListHandler} from "./Transaction/TransactionListHandler.js";
import {TransactionGroupHandler} from "./Group/TransactionGroupHandler.js";
import {UiHandler} from "./UiHandler.js";
import {CsvDataHandler} from "./CSV/CsvDataHandler.js";
import {CsvData} from "./CSV/CsvData.js";
import {TransactionHandlerFactory} from "./Transaction/TransactionHandlerFactory.js";

export class Analysis {
    listHandler;
    groupHandler;
    uiHandler;
    transactionHandlerFactory;

    constructor() {
        this.uiHandler = new UiHandler();
        this.listHandler = new TransactionListHandler();
        this.groupHandler = new TransactionGroupHandler();
        this.transactionHandlerFactory = new TransactionHandlerFactory();
        this.uiHandler.groupHandler = this.groupHandler;
        this.uiHandler.listHandler = this.listHandler;
    }

    addGroup(name) {
        this.uiHandler.addGroup(this.groupHandler.addGroup(name), this.groupHandler, this.listHandler);
    }

    readInFiles(fileInput) {
        this.listHandler.refreshList();
        this.uiHandler.clearTransactionContainer();
        for (let i = 0; i < fileInput.files.length; i++) {
            let reader = new FileReader();
            reader.onload = () => {
                let csvHandler = new CsvDataHandler(new CsvData(reader.result));
                csvHandler.parse();
                csvHandler.validate();
                let transactionHandler = this.transactionHandlerFactory.findTransactionHandler(csvHandler.csvData);
                this.listHandler.fillTransactionList(transactionHandler, this.uiHandler);
            };
            reader.readAsBinaryString(fileInput.files[i]);
        }
        this.uiHandler.showAnalysisButton();
    }

    analise() {
        for (let i = 0; i < this.groupHandler.transactionGroups.length; i++) {
            this.calculateGroupValue(i);
        }
        this.uiHandler.showAnalysis(this.groupHandler.transactionGroups);
    }

    calculateGroupValue(groupId) {
        if (this.groupHandler.transactionGroups[groupId] === null) return;
        this.groupHandler.transactionGroups[groupId].transactionCount = 0;
        this.groupHandler.transactionGroups[groupId].value = 0;
        this.groupHandler.transactionGroups[groupId].ibanGroups.forEach((ibanGroup) => {
            this.groupHandler.transactionGroups[groupId].transactionCount += ibanGroup.transactions.length;
            ibanGroup.transactions.forEach((id) => {
                this.groupHandler.transactionGroups[groupId].value += parseFloat(this.listHandler.transactionList.transactions[id].value);
            });
        });
    }

    close() {

        this.uiHandler.closeAnalysis();
    }
}