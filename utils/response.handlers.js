export class ResponseHandler {
    constructor(data, error = null) {
        this.data = data;
        this.error = error;
    }
}

export class MessageHandler {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class RouteHandler {
    constructor(path, router) {
        this.path = path;
        this.router = router;
    }
}
