import {CsvData} from "../CSV/CsvData.js";

export class AbstractTransactionHandler {

    csvData;

    /**
     * @param csvData {CsvData}
     */
    constructor(csvData) {
        if (!(csvData instanceof CsvData)) throw new TypeError("parameter must be of type CsvData");
        this.csvData = csvData;
    }

    /**
     * @abstract
     */
    buildTransactions() {
        throw new Error("Called abstract method");
    }

    /**
     * @abstract
     */
    createTransaction() {
        throw new Error("Called abstract method");
    }

    /**
     * @abstract
     */
    static getColumnNames() {
        throw new Error("Called abstract method");
    }
}