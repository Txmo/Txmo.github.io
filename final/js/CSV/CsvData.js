export class CsvData {

    /**
     * @property dataString {String}
     */
    dataString;

    /**
     * @property delimiter {String}
     */
    delimiter;

    COMMA = 0;
    SEMICOLON = 1;
    COLON = 2;
    PIPE = 3;
    delimiters = [',', ';', ':', '|'];
    counts = [0, 0, 0, 0];

    /**
     * @property columnNames {Array}
     */
    columnNames;

    /**
     * @property mainData {Array}
     */
    mainData = [];

    /**
     * @param dataString {String}
     */
    constructor(dataString) {
        this.dataString = dataString;
    }

}