export class UiHelper {


    buildTransactionBlock(id, transaction) {
        if (transaction === undefined) {
            transaction = {
                date: '',
                text: '',
                zweck: '',
                begunst: '',
                iban: '',
                bic: '',
                value: 0,
                waehrung: ''
            };
        }

        let outer = html.buildTransactionOuter(id);
        outer.appendChild(html.buildTransactionHeader(transaction.iban));
        outer.appendChild(html.buildTransactionBody(transaction));
        return outer;
    }

    buildTransactionOuter(id) {
        let div = document.createElement('div');
        div.id = 'transaction' + id;
        div.classList.add('transaction-outer', 'grid');
        div.setAttribute('bp', '3');
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-key', id);
        div.addEventListener('dragstart', (e) => {
            html.drag(e);
        });
        return div;
    }

    buildTransactionHeader(iban) {
        let div = document.createElement('div');
        div.classList.add('transaction-header');

        let span = document.createElement('span');
        span.setAttribute('data-tag', 'iban');
        span.innerText = iban;

        div.appendChild(span);
        return div;
    }

    buildTransactionBody(transaction) {
        let div = document.createElement('div');
        div.classList.add('transaction-body');

        let ul = document.createElement('ul');
        ul.appendChild(html.buildListItem('begunst', '', transaction.begunst));
        ul.appendChild(html.buildListItem('date', 'Datum: ', transaction.date));
        ul.appendChild(html.buildListItem('value', 'Betrag: ', transaction.value));
        ul.appendChild(html.buildListItem('text', 'Text: ', transaction.text));

        div.appendChild(ul);
        return div;
    }

    buildListItem(name, textValue, transactionValue) {
        let li = document.createElement('li');
        li.innerText = textValue;
        let span = document.createElement('span');
        span.setAttribute('data-tag', name);
        span.innerText = transactionValue;
        li.appendChild(span);
        return li;
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.dataset.key);
    }

    drop(ev) {
        ev.preventDefault();
        let id = ev.dataTransfer.getData("text");
        let iban = spk.csvArray[id].iban;
        spk.csvArray.forEach(transaction => {
            if (transaction.iban == iban) transaction.domElem.style.display = 'none';
        });
    }

    showGroupCreation() {
        document.getElementById('addGroupContainer').classList.remove('hidden');
        document.getElementById('buttonOpenCreation').classList.add('hidden');
    }

    isValidGroupName() {
        let name = document.getElementById('groupName');
        return !(name.value === '' || name.value === null);
    }

    cancelGroupCreation() {
        document.getElementById('addGroupContainer').classList.add('hidden');
        document.getElementById('buttonOpenCreation').classList.remove('hidden');
    }

    buildNewGroup(name, key) {
        let outer = document.createElement('div');
        outer.classList.add('outerGroup');
        outer.setAttribute('data-group', key);
        outer.innerText = name;
        return outer;
    }
}