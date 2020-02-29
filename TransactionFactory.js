import {Error} from "Error";
import {SparkassenFactory} from "SparkassenFactory";
class TransactionFactory {


    constructor() {

    }

    getCorrectFactory(csvHeader) {
        switch (csvHeader) {
            case this.isCorrectFactory(csvHeader, SparkassenFactory.getColumnCount(), SparkassenFactory.getHeader()):
                return new SparkassenFactory();
            default:
                throw new Error.NoTransactionFactoryFound();
        }
    }

    isCorrectFactory(csvHeader, columnCount, specificHeader) {
        return this.isCorrectColumnCount(csvHeader, columnCount) && this.arraysAreEqual(csvHeader, specificHeader);
    }

    isCorrectColumnCount(csvHeader, columnCount) {
        if (csvHeader.length !== columnCount) return false;
    }

    arraysAreEqual(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }
}