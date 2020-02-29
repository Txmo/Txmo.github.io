import {TransactionGroup} from "../Group/TransactionGroup.js";
import {TransactionData} from "../Transaction/TransactionData.js";

export class UiHandler {

    uploadContainer;
    transactionContainer;
    groupContainer;
    analysisContainer;
    analysis;
    groupName;

    constructor() {
        this.transactionContainer = document.getElementById('transactionContainer');
        this.groupContainer = document.getElementById('groupContainer');
        this.groupName = document.getElementById('groupName');
        this.uploadContainer = document.getElementById('uploadContainer');
        this.analysisContainer = document.getElementById('analysisContainer');
        this.analysis = document.getElementById('analysis');
    }

    clearTransactionContainer() {
        while (this.transactionContainer.lastChild) {
            this.transactionContainer.removeChild(this.transactionContainer.lastChild);
        }
    }

    /**
     * @param group {TransactionGroup}
     * @param groupHandler
     * @param listHandler
     */
    addGroup(group, groupHandler, listHandler) {
        let outer = document.createElement('div');
        outer.innerText = group.name;
        outer.id = 'group' + group.id;
        outer.setAttribute('data-id', group.id);
        outer.setAttribute('bp', '3');
        outer.ondrop = (event) => {
            event.preventDefault();
            event.target.classList.remove('group-dragged-over');
            let id = event.dataTransfer.getData('text');
            let transaction = listHandler.transactionList.transactions[id];
            let ibanGroup = groupHandler.addIban(group.id, transaction.iban);
            ibanGroup.transactions = listHandler.getTransactionIdsByIban(transaction.iban);
            ibanGroup.transactions.forEach((id) => {
                document.getElementById('transaction' + id).classList.add('invisible');
            });
        };
        outer.ondragover = (event) => {
            event.preventDefault();
            event.target.classList.add('group-dragged-over');
        };
        outer.ondragexit = (event) => {
            event.preventDefault();
            event.target.classList.remove('group-dragged-over');
        };
        outer.classList.add('group');
        this.groupContainer.appendChild(outer);
    }

    addGroupError() {
        this.groupName.value = '';
        this.groupName.placeholder = 'Please enter a name';
        this.groupName.focus();
    }

    /**
     * @param transaction {TransactionData}
     */
    addTransaction(transaction) {
        let outer = document.createElement('div');
        outer.id = 'transaction' + transaction.id;
        outer.setAttribute('data-id', transaction.id);
        outer.setAttribute('bp', '3');
        outer.setAttribute('draggable', 'true');
        outer.ondragstart = (event) => {
            event.dataTransfer.setData('text', transaction.id);
        };
        outer.classList.add('transaction');
        outer.appendChild(this.createList(transaction));
        this.transactionContainer.appendChild(outer);
    }

    createList(transaction) {
        let list = document.createElement('ul');
        list.classList.add('transaction-list');
        list.appendChild(this.createListItem(transaction, 'IBAN', transaction.iban));
        list.appendChild(this.createListItem(transaction, 'BIC', transaction.bic));
        list.appendChild(this.createListItem(transaction, 'DATE', transaction.date));
        list.appendChild(this.createListItem(transaction, 'SEC. PARTY', transaction.secondParty));
        list.appendChild(this.createListItem(transaction, 'USAGE', transaction.usage));
        list.appendChild(this.createListItem(transaction, 'TEXT', transaction.text));
        list.appendChild(this.createListItem(transaction, 'VALUE', transaction.value + ' ' + transaction.currency));
        return list;
    }

    createListItem(transaction, name, value) {
        let item = document.createElement('li');
        item.classList.add('transaction-list-item');
        let nameSpan = document.createElement('span');
        nameSpan.classList.add('list-item-name');
        nameSpan.innerText = name + ': ';
        item.appendChild(nameSpan);

        let valueSpan = document.createElement('span');
        valueSpan.classList.add('list-item-value');
        valueSpan.innerText = value;
        item.appendChild(valueSpan);
        return item;
    }

    showAnalysisButton() {
        document.getElementById('analysisButton').classList.remove('invisible');
    }

    /**
     * @param groups
     */
    showAnalysis(groups) {
        this.clearAnalysis();
        for (let i = 0; i < groups.length; i++) {
            if (groups[i] === null) continue;
            this.analysis.appendChild(this.createGroupAnalysis(groups[i]));
        }
        this.analysisContainer.classList.remove('visibility-hidden');
    }

    /**
     * @param group {TransactionGroup}
     */
    createGroupAnalysis(group) {
        let outer = document.createElement('div');
        outer.id = 'analysisGroup' + group.id;
        outer.classList.add('analysis-group');
        outer.setAttribute('bp', '12 text-center');

        let name = document.createElement('div');
        name.classList.add('analysis-name');
        name.innerText = group.name;
        outer.appendChild(name);

        let transactionCount = document.createElement('div');
        transactionCount.classList.add('analysis-count-name');
        transactionCount.innerText = "Transaction count";
        outer.appendChild(transactionCount);

        let countValue = document.createElement('div');
        countValue.classList.add('analysis-count-value');
        countValue.innerText = group.transactionCount.toString();
        outer.appendChild(countValue);

        let total = document.createElement('div');
        total.classList.add('analysis-total-name');
        total.innerText = 'Value';
        outer.appendChild(total);

        let totalValue = document.createElement('div');
        totalValue.classList.add('analysis-total-value');
        totalValue.innerText = group.value.toLocaleString(window.navigator.language === 'de' ? 'de-DE' : 'en-EN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        outer.appendChild(totalValue);

        return outer;
    }

    clearAnalysis() {
        while (this.analysis.lastChild) {
            this.analysis.removeChild(this.analysis.lastChild);
        }
    }

    closeAnalysis() {
        this.analysisContainer.classList.add('visibility-hidden');
    }
}