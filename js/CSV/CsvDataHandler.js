import {CsvData} from "./CsvData.js";
import {InvalidCsvException} from "../Exception/InvalidCsvException.js";

export class CsvDataHandler {

    /**
     * @property csvData {CsvData}
     */
    csvData;

    /**
     * @param csvData {CsvData}
     */
    constructor(csvData) {
        if (csvData.dataString === '') throw new EmptyDataException(CsvData);
        if (!(csvData instanceof CsvData)) throw new TypeError("passed parameter is not instance of CsvData");
        this.csvData = csvData;
    }

    detectDelimiter() {
        for (let key = 0; key < this.csvData.dataString.length; key++) {
            switch (this.csvData.dataString[key]) {
                case ';':
                    this.csvData.counts[this.csvData.SEMICOLON]++;
                    break;
                case ',':
                    this.csvData.counts[this.csvData.COMMA]++;
                    break;
                case ':':
                    this.csvData.counts[this.csvData.COLON]++;
                    break;
                case '|':
                    this.csvData.counts[this.csvData.PIPE]++;
                    break;
                default:
                    break;
            }
        }

        let max = Math.max(...this.csvData.counts);
        this.csvData.delimiter = this.csvData.delimiters[this.csvData.counts.indexOf(max)];
    }

    parse() {
        this.detectDelimiter();
        let insideQuotedField = false;  // true means we're inside a quoted field

        // iterate over each character, keep track of current row and column (of the returned array)
        for (let row = 0, col = 0, c = 0; c < this.csvData.dataString.length; c++) {
            let currentChar = this.csvData.dataString[c];
            let nextChar = this.csvData.dataString[c + 1];
            this.csvData.mainData[row] = this.csvData.mainData[row] || [];             // create a new row if necessary
            this.csvData.mainData[row][col] = this.csvData.mainData[row][col] || '';   // create a new column (start with empty string) if necessary

            // If the current character is a quotation mark, and we're inside a
            // quoted field, and the next character is also a quotation mark,
            // add a quotation mark to the current column and skip the next character
            if (currentChar === '"' && insideQuotedField && nextChar === '"') {
                this.csvData.mainData[row][col] += currentChar;
                ++c;
                continue;
            }

            // If it's just one quotation mark, begin/end quoted field
            if (currentChar === '"') {
                insideQuotedField = !insideQuotedField;
                continue;
            }

            // If it's a comma and we're not in a quoted field, move on to the next column
            if (currentChar === this.csvData.delimiter && !insideQuotedField) {
                ++col;
                continue;
            }

            // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
            // and move on to the next row and move to column 0 of that new row
            if (currentChar === '\r' && nextChar === '\n' && !insideQuotedField) {
                ++row;
                col = 0;
                ++c;
                continue;
            }

            // If it's a newline (LF or CR) and we're not in a quoted field,
            // move on to the next row and move to column 0 of that new row
            if (currentChar === '\n' && !insideQuotedField) {
                ++row;
                col = 0;
                continue;
            }
            if (currentChar === '\r' && !insideQuotedField) {
                ++row;
                col = 0;
                continue;
            }

            // Otherwise, append the current character to the current column
            this.csvData.mainData[row][col] += currentChar;
        }

        //separate column names from main data
        this.csvData.columnNames = this.csvData.mainData.shift();
    }

    /**
     * @throws InvalidCsvException
     */
    validate() {
        if (this.csvData.mainData.length === 0 || this.csvData.columnNames.length === 0) throw new InvalidCsvException();
        for (let i = 0; i < this.csvData.mainData.length; i++) {
            if (this.csvData.mainData[i].length !== this.csvData.columnNames.length) throw new InvalidCsvException();
        }
    }

}