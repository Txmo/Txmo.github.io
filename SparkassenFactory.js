import Transaction from "Transaction";
import Error from "Error";

export const KEYS = {
    date: 1,
    text: 3,
    zweck: 4,
    begunst: 11,
    iban: 12,
    bic: 13,
    value: 14,
    waehrung: 15
};

export class SparkassenFactory {

    static getColumnCount() {
        return 17;
    }

    static getHeader() {
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
        ]
    }

    static isCorrectFactory(csvHeader) {
        if (csvHeader.length !== SparkassenFactory.getColumnCount) return false;
    }


    /**
     * @param {Array} data
     */
    static createTransaction(data) {
        if (data.length !== SparkassenFactory.getColumnCount()) throw new Error.InvalidColumnCount();
        let a = new Transaction();
        a.date = data[KEYS.date];
        a.text = data[KEYS.text];
        a.zweck = data[KEYS.zweck];
        a.begunst = data[KEYS.begunst];
        a.iban = data[KEYS.iban];
        a.bic = data[KEYS.bic];
        a.value = data[KEYS.value].replace(',', '.');
        a.waehrung = data[KEYS.waehrung];

        return a;
    }


}