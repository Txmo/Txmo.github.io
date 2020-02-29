const DATE = 1;
const TEXT = 3;
const ZWECK = 4;
const BEGUNST = 11;
const IBAN = 12;
const BIC = 13;
const VALUE = 14;
const WAEHRUNG = 15;

class Transaction {

    date;
    text;
    zweck;
    begunst;
    iban;
    bic;
    value;
    waehrung;
    domElem;

    constructor(array) {
        this.date = array[DATE];
        this.text = array[TEXT];
        this.zweck = array[ZWECK];
        this.begunst = array[BEGUNST];
        this.iban = array[IBAN];
        this.bic = array[BIC];
        this.value = array[VALUE].replace(',', '.');
        this.waehrung = array[WAEHRUNG];
    }

    setDomElem(dom) {
        this.domElem = dom;
    }
}