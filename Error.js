export class Error {

    message;

    static InvalidColumnCount() {
        let a = new Error();
        a.message = "Invalid Column Count";
        return a;
    }

    static NoTransactionFactoryFound() {
        let a = new Error();
        a.message = "No AbstractTransaction Factory Found";
        return a;
    }
}