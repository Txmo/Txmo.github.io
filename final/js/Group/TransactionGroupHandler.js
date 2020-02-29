import {InvalidGroupName} from "../Exception/InvalidGroupName.js";
import {TransactionGroup} from "./TransactionGroup.js";
import {IbanGroup} from "./IbanGroup.js";

export class TransactionGroupHandler {

    transactionGroups = [];

    constructor() {
    }

    /**
     * @throws {InvalidGroupName}
     */
    addGroup(name) {
        if (typeof name !== "string" || name === "") throw new InvalidGroupName();
        let group = new TransactionGroup(name);
        group.id = this.transactionGroups.length;
        this.transactionGroups.push(group);
        return group;
    }

    addIban(groupId, iban) {
        let ibanGroup = new IbanGroup(iban);
        this.transactionGroups[groupId].ibanGroups.push(ibanGroup);
        return ibanGroup;
    }

    deleteGroup(id) {
        this.transactionGroups[id] = null;
    }
}