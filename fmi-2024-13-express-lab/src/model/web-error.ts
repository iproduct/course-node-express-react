export class WebError extends Error {
    constructor(public status: number, public message: string, public error?: string) {
        super();
    }
}