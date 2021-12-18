import { NextFunction, Request, Response, Router } from 'express';
import Transfer from '../../controllers/Transfer'

class TransferRouter {
    private _router = Router();
    private _controller = Transfer;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    private _configure() {
        this._router.get('/', async (req: Request, res: Response, next: NextFunction) => {
            const result = await this._controller.defaultMethod(req, res);
            if (typeof result.status === 'number') {
                res.status(200).json(result.message);
            } else {
                res.status(204).json("unexpected Error");
            }
        });
        this._router.post('/shareQuest', async (req: Request, res: Response, next: NextFunction) => {
            const result = await this._controller.shareQuest(req, res);
            if (typeof result.status === 'number') {
                res.status(200).json(result.message);
            } else {
                res.status(204).json("unexpected Error");
            }
        });
    }
}

export = new TransferRouter().router;