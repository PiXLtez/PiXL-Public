import express, { Response } from 'express';
import { ExpressRequest } from '../models/ExpressRequest';
import { OperationStatus } from '@taquito/taquito';
import { TaquitoService } from './TaquitoService';

interface TransactionResults {
	source: string;
	fee: string;
	counter: string;
	gas_limit: string;
	storage_limit: string;
	amount: string;
	destination: string;
}

interface TransferResponse {
	status: OperationStatus;
	results?: TransactionResults;
}

interface ErrorResponse {
	message: string;
}

interface TransferRequestBody {
	receiverAddress: string;
	amount: number;
}

class Transfer {
	async defaultMethod(req: ExpressRequest<TransferRequestBody>,
		res: Response<TransferResponse | ErrorResponse>) {
		const { receiverAddress, amount } = req.query;

		if (!receiverAddress || !amount) {
			return {status: 400, message:'Bad Request - please include receiverAddress and amount'}
		}

		const taquitoService = new TaquitoService(
			'https://mainnet.api.tez.ie',
		);

		//make our transfer here
		return {status: 200, message:'Successful'}; //return for demo
		const transfer = await taquitoService.makeTransfer(receiverAddress as string, parseInt(amount as string));

		const status = await transfer.status();
		const results = await transfer.transactionOperation();

		return { status, results }
	}
	async shareQuest(req: ExpressRequest<TransferRequestBody>,
		res: Response<TransferResponse | ErrorResponse>) {
		//update the database to set the quest to public for wallet address
		return {status: 200, message:'Successful'}; //return for demo

	}

}

export = new Transfer();