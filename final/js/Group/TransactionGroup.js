import {IbanGroup} from "./IbanGroup.js";

export class TransactionGroup {

    name;

    id;

    transactionCount = 0;

    value = 0;

    ibanGroups = [];

    constructor(name) {
        this.name = name;
    }
}