export class Transaction {

    date;
    text;
    zweck;
    begunst;
    iban;
    bic;
    value;
    waehrung;
    domElem;

    constructor() {

    }

    setDomElem(dom) {
        this.domElem = dom;
    }

}