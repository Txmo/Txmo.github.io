import {TransactionGroup} from "./TransactionGroup.js";
import {Transaction} from "./Transaction.js";
import {UiHelper} from "./UiHelper.js";

export class Analysis {


    /**
     * @property {UiHelper} uiHelper
     */
    uiHelper;


    transactionGroups = [];

    constructor() {
        this.uiHelper = new UiHelper();
    }

    addGroup() {
        let name = document.getElementById('groupName');
        if (!this.uiHelper.isValidGroupName()) {
            name.placeholder = 'Please enter a name';
            name.focus();
        } else {
            let group = new TransactionGroup();
            let key = this.transactionGroups.length;
            this.transactionGroups[key] = group;
            document.getElementById('groupContainer').appendChild(this.uiHelper.buildNewGroup(name.value, key));
            this.uiHelper.cancelGroupCreation();
        }
    }
}