import {CsvData} from "../CSV/CsvData.js";
import {SpkCsvCamtTransactionHandler} from "../Transaction/SpkCsvCamtTransactionHandler.js";
import {SpkCsvMt940TransactionHandler} from "../Transaction/SpkCsvMt940TransactionHandler.js";
import {NoTransactionHandlerFound} from "../Exception/NoTransactionHandlerFound.js";

export class TransactionHandlerFactory {

    /**
     * @property csvData {CsvData}
     */
    csvData;

    constructor() {
    }

    /**
     * @param csvData {CsvData}
     * @return {AbstractTransactionHandler}
     * @throws {NoTransactionHandlerFound}
     */
    findTransactionHandler(csvData) {
        if (!(csvData instanceof CsvData)) throw new TypeError("parameter must be of type CsvData");
        this.csvData = csvData;
        switch (true) {
            case this.isCorrectHandler(SpkCsvCamtTransactionHandler.getColumnNames()):
                return new SpkCsvCamtTransactionHandler(this.csvData);
            case this.isCorrectHandler(SpkCsvMt940TransactionHandler.getColumnNames()):
                return new SpkCsvMt940TransactionHandler(this.csvData);
            default:
                throw new NoTransactionHandlerFound();
        }
    }

    /**
     * @param columnNames {Array}
     */
    isCorrectHandler(columnNames) {
        return columnNames.length === this.csvData.columnNames.length && this.arraysAreEqual(columnNames, this.csvData.columnNames);
    }

    arraysAreEqual(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
}