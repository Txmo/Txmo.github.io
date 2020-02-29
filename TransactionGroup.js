export class TransactionGroup {

    /**
     * [
     *  iban1 => [
     *      keyOfTransaction1,
     *      keyOfTransaction2,
     *      keyOfTransactionN
     * ],
     *  iban2 => [
     *      keyOfTransaction...
     * ]
     * ]
     */
    transactionPointers = [];

    constructor() {

    }

    addIban(iban) {
        if (!this.transactionPointers.keys.includes(iban)) this.transactionPointers[iban] = [];
    }

    addTransactionPointer(key, iban) {
        this.transactionPointers[iban].push(key);
    }

    removeIban(iban) {
        if (this.transactionPointers.keys.includes(iban)) this.transactionPointers.splice(iban, 1);
    }

}