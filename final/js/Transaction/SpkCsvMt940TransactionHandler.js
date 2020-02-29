import {TransactionData} from "./TransactionData.js";
import {AbstractTransactionHandler} from "./AbstractTransactionHandler.js";

export class SpkCsvMt940TransactionHandler extends AbstractTransactionHandler {

    constructor(csvData) {
        super(csvData);
    }

    createTransaction() {
        //TODO implement
    }

    static getColumnNames() {
        return [
            'Auftragskonto',
            'Buchungstag',
            'Valutadatum',
            'Buchungstext',
            'Verwendungszweck',
            'Beguenstigter/Zahlungspflichtiger',
            'Kontonummer',
            'BLZ',
            'Betrag',
            'Waehrung',
            'Info'
        ];
    }
}