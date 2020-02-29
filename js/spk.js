class Spk {

    /**
     * @var {AbstractTransaction[]}
     */
    csvArray;

    /**
     * @var {String[]}
     */
    keys;

    /**
     * @var {array}
     */
    groups;

    constructor() {

    }

    parse(array) {
        this.keys = array.shift();
        this.csvArray = array;
    }

    minimize(array) {
        let a = new AbstractTransaction(array);
        return a;
    }

    minimizeAll() {
        let main = document.getElementById('main');
        for (let i = 0; i < this.csvArray.length; i++) {
            this.csvArray[i] = this.minimize(this.csvArray[i]);
            let dom = html.buildTransactionBlock(i, this.csvArray[i]);
            this.csvArray[i].setDomElem(dom);
            main.appendChild(dom);
        }
    }

    /**
     * @param {Group} group 
     * @returns {int} key
     */
    addGroup(group) {
        if(this.groups === undefined) this.groups = [];
        let key = this.groups.length;
        this.groups[key] = group;
        return key
    }

}