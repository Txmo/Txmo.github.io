class Group {

    /**
     * @var string[]
     */
    ibans;

    /**
     * @var string
     */
    name;

    constructor(name) {
        this.name = name;
    }

    addNewIban(iban) {
        if (this.ibans.includes(iban)) return;
        this.ibans.push(iban);
    }
}