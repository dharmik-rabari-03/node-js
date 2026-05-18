class httpError extends Error {

    constructor(Message, statusCode) {

        super(message)

        this.statusCode = statusCode

    }

}

export default httpError