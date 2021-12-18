import { TezosToolkit, TransactionWalletOperation } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

export interface ITaqutioService {
    makeTransfer(
        receiverAddress: string,
        amount: number,
    ): Promise<TransactionWalletOperation>;
}

export class TaquitoService implements ITaqutioService {
    private tezosInstance: TezosToolkit;

    constructor(netAddress: string) {
        this.tezosInstance = new TezosToolkit(netAddress);

        const signingKey: string | undefined = process.env.SIGNING_KEY;

        if (!signingKey) {
            throw new Error('Error! Please add signing key to your env variables');
        }

        const signer = new InMemorySigner(signingKey);
        this.tezosInstance.setProvider({ rpc: netAddress, signer });
    }

    makeTransfer(
        receiverAddress: string,
        amount: number,
    ): Promise<TransactionWalletOperation> {
        return this.tezosInstance.wallet
            .transfer({
                to: receiverAddress,
                amount,
            })
            .send();
    }
}