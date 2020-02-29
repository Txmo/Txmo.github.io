export class CSVParser {

    delimiter;

    COMMA = 0;
    SEMICOLON = 1;
    COLON = 2;
    PIPE = 3;
    delimiters = [',', ';', ':', '|'];
    counts = [0, 0, 0, 0];


    constructor() {

    }

    parse(dataString) {
        this.detectDelimiter(dataString);
        let result = [];
        let isInField = false;  // true means we're inside a quoted field

        // iterate over each character, keep track of current row and column (of the returned array)
        for (let row = 0, col = 0, c = 0; c < dataString.length; c++) {
            let currentChar = dataString[c], nextChar = dataString[c + 1];        // current character, next character
            result[row] = result[row] || [];             // create a new row if necessary
            result[row][col] = result[row][col] || '';   // create a new column (start with empty string) if necessary

            // If the current character is a quotation mark, and we're inside a
            // quoted field, and the next character is also a quotation mark,
            // add a quotation mark to the current column and skip the next character
            if (currentChar == '"' && isInField && nextChar == '"') {
                result[row][col] += currentChar;
                ++c;
                continue;
            }

            // If it's just one quotation mark, begin/end quoted field
            if (currentChar == '"') {
                isInField = !isInField;
                continue;
            }

            // If it's a comma and we're not in a quoted field, move on to the next column
            if (currentChar == this.delimiter && !isInField) {
                ++col;
                continue;
            }

            // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
            // and move on to the next row and move to column 0 of that new row
            if (currentChar == '\r' && nextChar == '\n' && !isInField) {
                ++row;
                col = 0;
                ++c;
                continue;
            }

            // If it's a newline (LF or CR) and we're not in a quoted field,
            // move on to the next row and move to column 0 of that new row
            if (currentChar == '\n' && !isInField) {
                ++row;
                col = 0;
                continue;
            }
            if (currentChar == '\r' && !isInField) {
                ++row;
                col = 0;
                continue;
            }

            // Otherwise, append the current character to the current column
            result[row][col] += currentChar;
        }
        return result;
    }

    detectDelimiter(dataString) {
        for (let key = 0; key < dataString.length; key++) {
            switch (dataString[key]) {
                case ';':
                    this.counts[this.SEMICOLON]++;
                    break;
                case ',':
                    this.counts[this.COMMA]++;
                    break;
                case ':':
                    this.counts[this.COLON]++;
                    break;
                case '|':
                    this.counts[this.PIPE]++;
                    break;
                default:
                    break;
            }
        }

        let max = Math.max(...this.counts);
        this.delimiter = this.delimiters[this.counts.indexOf(max)];
    }


}