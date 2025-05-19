class HttpError extends Error {
    constructor(code, name, message){
        super(code, name, message);

        this.code = code;
        this.name = name;
        this.message = message;
    }

    toJSON(){
        return{
            name: this.name,
            message: this.message
        };
    }
}


class UnauthorizedError extends HttpError {
    constructor(message){
        super(401, 'Unauthorized', message);
    }
}
export default UnauthorizedError