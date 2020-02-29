import {TransactionData} from "./TransactionData.js";
import {AbstractTransactionHandler} from "./AbstractTransactionHandler.js";

export class SpkCsvCamtTransactionHandler extends AbstractTransactionHandler {

    keys = {
        date: 1,
        text: 3,
        usage: 4,
        secondParty: 5,
        iban: 12,
        bic: 13,
        value: 14,
        currency: 15
    };

    constructor(csvData) {
        super(csvData);
    }

    buildTransactions() {
        let transactions = [];
        for (let i = 0; i < this.csvData.mainData.length; i++) {
            transactions.push(this.createTransaction(this.csvData.mainData[i]));
        }
        return transactions;
    }

    /**
     * @private
     * @param dataRow {Array}
     * @return {TransactionData}
     */
    createTransaction(dataRow) {
        let transaction = new TransactionData();
        transaction.date = dataRow[this.keys.date];
        transaction.text = dataRow[this.keys.text];
        transaction.usage = dataRow[this.keys.usage];
        transaction.secondParty = dataRow[this.keys.secondParty];
        transaction.iban = dataRow[this.keys.iban];
        transaction.bic = dataRow[this.keys.bic];
        transaction.value = dataRow[this.keys.value].replace(',', '.');
        transaction.currency = dataRow[this.keys.currency];
        return transaction;
    }

    static getColumnNames() {
        return [
            'Auftragskonto',
            'Buchungstag',
            'Valutadatum',
            'Buchungstext',
            'Verwendungszweck',
            'Glaeubiger ID',
            'Mandatsreferenz',
            'Kundenreferenz (End-to-End)',
            'Sammlerreferenz',
            'Lastschrift Ursprungsbetrag',
            'Auslagenersatz Ruecklastschrift',
            'Beguenstigter/Zahlungspflichtiger',
            'Kontonummer/IBAN',
            'BIC (SWIFT-Code)',
            'Betrag',
            'Waehrung',
            'Info'
        ];
    }
}