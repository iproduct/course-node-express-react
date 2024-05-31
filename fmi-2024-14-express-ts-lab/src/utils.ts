import { Request, Response } from 'express';


export  interface AppError {
    status: number,
    message: string
}

export const sendErrorResponse = (req: Request, res: Response, status = 500, message, err = null) => {
    if (req.app.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    });
}