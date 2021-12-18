import React, { Dispatch, SetStateAction } from "react";
import "../../App.css";
import Unity, { UnityContext } from "react-unity-webgl";
import { setTimeout } from "timers";
import { compose, TezosToolkit, MichelsonMap } from "@taquito/taquito";
import { Tzip12Module, tzip12, TokenMetadata } from "@taquito/tzip12";
import { Tzip16Module, tzip16 } from "@taquito/tzip16";
import { BigNumber } from 'bignumber.js';

interface IWalletProps {
    Tezos: TezosToolkit;
    publicToken: string | null;
    userAddress: string;
    userBalance: number;
    setUserBalance: Dispatch<SetStateAction<number>>;
}
const unityContext  = new UnityContext({
    loaderUrl: "build/myunityapp.loader.js",
    dataUrl: "build/myunityapp.data",
    frameworkUrl: "build/myunityapp.framework.js",
    codeUrl: "build/myunityapp.wasm",
});

export class Unity1 extends React.Component<IWalletProps> {
    isCalled = false;
    private items: any[] = [];
    constructor(props: any,) {
        super(props);
    }

    async componentDidUpdate(prevProps: IWalletProps) {
        if (this.props.userAddress?.length > 1 && !this.isCalled) {
            this.isCalled = true;
            setTimeout(() => {
                this.setWalletAddress();
                this.soContact();
            }, 10000);
        }
    }

    // public setupUnityListners() {
    //     unityContext .on("GotCoin", (coinNumber: number) => {
    //         if (coinNumber) {

    //         }
    //     });

    //     unityContext .on("WalletConnected", (randomInt: string) => {
    //         if (randomInt) {

    //         }
    //     });

    //     unityContext .on("GotItem", (cardId: string) => {
    //         if (cardId) {

    //         }
    //     });
    // }

    public onLoaded() {
        if (this.props.userAddress?.length > 1 && !this.isCalled) {
            this.setWalletAddress();
            this.soContact();
        }
    }

    public async soContact() {
        this.props.Tezos.addExtension(new Tzip16Module());
        this.props.Tezos.addExtension(new Tzip12Module());

        const contractAddress = "KT1SGdop74rGobKAETcBPnz9yQkH38hZnpBh";
        const tokenId = 1;
        const contract = await this.props.Tezos.contract.at(contractAddress, compose(tzip16, tzip12));

        console.log(`Fetching the token metadata for the token ID ${tokenId}...`);
        // const metatData = await contract.tzip12().getTokenMetadata(1);
        const storage: any = await contract.storage();
        const ledger = storage.ledger || storage.accounts;
        const val = await ledger.get({ 0: "tz1dmSoZi281eKeU4B3W53LrAoqSa8kpCd6w", 1: 1 });
        if (!val) { return }
        this.items.push({
            name: "entry token",
            imageSrc: "https://cloudflare-ipfs.com/ipfs/QmPTFsFgEYfS3VV9uaTWfWUQGVqbaHa1t2npBUQZ4NiAvP",
            alt: "entry Token"
        })
        this.props.setUserBalance(1);
    }


    public addCard(id: string, e: React.MouseEvent<HTMLElement, MouseEvent>, cardId: string) {
        const element = document.getElementById(id);
        if (element) {
            element.className = "card animate__animated animate__backOutUp"
        }
        cardId === "entry Token" ? unityContext .send("GameController", "InsertCoin") : unityContext .send("GameController", "AddItem", cardId);

        this.findOtherCards();
    }

    private setWalletAddress() {
        unityContext .send("GameController", "ConnectWallet", this.props.userAddress);
    }

    private async findOtherCards() {
        const contractAddress = "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton";
        const contract = await this.props.Tezos.contract.at(contractAddress, compose(tzip16, tzip12));
        const metaDataArray: TokenMetadata[] = await Promise.all([578802, 578806, 578810, 578813].map(async (number) => {
            return await contract.tzip12().getTokenMetadata(number);
        }))

        if (metaDataArray) {
            this.buildCards(metaDataArray);
        }
    }

    private async buildCards(metaDataArray: TokenMetadata[]) {
        this.items = await Promise.all(metaDataArray.map((item) => {
            return {
                name: item.name,
                imageSrc: this.createImageSrc(item.artifactUri),
                alt: item.token_id,
            }
        }))
        this.props.setUserBalance(2);
    }

    private createImageSrc(artifactUri: string | undefined) {
        if (artifactUri) {
            return "https://cloudflare-ipfs.com/ipfs/" + artifactUri.split("//")[1]
        } else {
            return "error"
        }
    }

    render() {
        return (
            <><div className="flex flex-col items-center ml-auto mr-auto unity-container">
                <Unity unityContext={unityContext} />            </div>
                {this.items.length > 0 ?
                    <section className="card-list mt-2 ml-auto mr-auto items-center justify-center">
                        {this.items.map((user) => (
                            <div key={user.alt} id={user.alt} onClick={(e) => this.addCard(user.alt, e, user.alt)} className="card">
                                <img onClick={(e) => this.addCard(user.alt, e, user.alt)} src={user.imageSrc} alt="this slowpoke moves" width="250" />
                            </div>
                        ))}
                    </section>
                    : <div className="flex flex-row ml-auto mr-auto mt-10 w-6/12 h-32 justify-center">
                        <h1 className="text-white "> Oh no! We can't find any tokens,Please make sure your wallet is synced and you have purchased the token <a className="underline" href="https://objkt.com/asset/KT1SGdop74rGobKAETcBPnz9yQkH38hZnpBh/1" target="_blank">here</a></h1>
                    </div>
                }
            </>
        );
    }

}
export default Unity1;