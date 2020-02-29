class EmptyDataException extends Error{

    /**
     * @property dataObject {CsvData}
     */
    dataObject;

    /**
     * @param csvData {CsvData}
     */
    constructor(csvData) {
        super();
        this.dataObject = csvData;
    }
}