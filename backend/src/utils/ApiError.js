class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors=[],
        stack ="",
    ){
        super(message);

        this.statusCode =  statusCode;
        this.message = message;
        this.name = this.constructor.name;
        this.success = false;
        this.isOperational = true;
        this.data= null;
        this.errors = errors;

        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}


export default ApiError;