import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../../App.css";
import Unity, { UnityContext } from "react-unity-webgl";
import { setTimeout } from "timers";
import { compose, TezosToolkit, MichelsonMap } from "@taquito/taquito";
import { Tzip12Module, tzip12, TokenMetadata } from "@taquito/tzip12";
import { Tzip16Module, tzip16 } from "@taquito/tzip16";
import { BigNumber } from 'bignumber.js';
import { MintProvider } from "../../services/mintProvider";

type ButtonProps = {
    Tezos: TezosToolkit;
    publicToken: string | null;
    userAddress: string;
    userBalance: number;
    setUserBalance: Dispatch<SetStateAction<number>>;
};

export type ItemType = {
    name: string,
    imageSrc: string,
    alt: string
}

const unityContext = new UnityContext({
    loaderUrl: "Build/1.loader.js",
    dataUrl: "Build/1.data",
    frameworkUrl: "Build/1.framework.js",
    codeUrl: "Build/1.wasm",
});

const UnityComponent = ({
    Tezos,
    publicToken,
    userAddress,
    userBalance,
    setUserBalance,
}: ButtonProps): JSX.Element => {
    const mintProvider = new MintProvider()
    document.onfullscreenchange = function (event) {
        unityContext.setFullscreen(false);
    };
    unityContext.on("WhereWallet", function (userName, score) {
    });
    unityContext.on("GameOver", function (userName, score) {
    });
    unityContext.on("MintThis", function (itemName, score) {
        if (itemName) {
            mintContract(itemName, score);
        }
    });
    unityContext.on("ShareQuest", function (questDetails, Id) {
        shareQuest(questDetails, Id);
    });
    let isCalled = false;
    const [items, setItem] = useState<Array<ItemType>>([]);

    const mintContract = async (itemName: any, score: any) => {
        const result = await mintProvider.mintItem()
        const tempItems = items;
        tempItems.push(result);
        setItem(tempItems);
        setUserBalance(Math.random()); // used to rerender Todo replace with better method
    }

    const shareQuest = async (questDetails: any, Id: any) => {
        await mintProvider.shareQuest(questDetails, Id);
        alert("Quest has been shared")
    }

    const createImageSrc = (artifactUri: string | undefined) => {
        if (artifactUri) {
            return "https://cloudflare-ipfs.com/ipfs/" + artifactUri.split("//")[1]
        } else {
            return "error"
        }
    }

    const buildCards = async (metaDataArray: TokenMetadata[]) => {
        setItem(await Promise.all(metaDataArray.map((item) => {
            return {
                name: item.name as string,
                imageSrc: createImageSrc(item.artifactUri) as string,
                alt: item.token_id.toString(),
            }
        })))
    }

    const findOtherCards = async () => {
        const contractAddress = "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton";
        const contract = await Tezos.contract.at(contractAddress, compose(tzip16, tzip12));
        const storage: any = await contract.storage();
        const ledger = storage.ledger || storage.accounts;
        const metaDataArray: TokenMetadata[] = await Promise.all([578802, 578806, 578810, 578813].map(async (number) => {
            const val = await ledger.get({ 0: "tz1dmSoZi281eKeU4B3W53LrAoqSa8kpCd6w", 1: number });
            if (val) {
                return await contract.tzip12().getTokenMetadata(number);
            } else {
                let x: TokenMetadata = {
                    token_id: 0,
                    decimals: 0
                }
                return x as TokenMetadata
            }
        }))

        metaDataArray.filter((item) => item.token_id !== 0)

        if (metaDataArray) {
            buildCards(metaDataArray);
        }
    }

    const setWalletAddress = () => {
        unityContext.send("GameController", "ConnectWallet", userAddress);
    }

    const addCard = (id: string, e: React.MouseEvent<HTMLElement, MouseEvent>, cardId: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.className = "card animate__animated animate__backOutUp"
        }
        cardId === "entry Token" ? unityContext.send("GameController", "InsertCoin") : unityContext.send("GameController", "AddItem", cardId);

        findOtherCards();
    }

    const findInitialCoin = async () => {
        Tezos.addExtension(new Tzip16Module());
        Tezos.addExtension(new Tzip12Module());

        const contractAddress = "KT1SGdop74rGobKAETcBPnz9yQkH38hZnpBh";
        const tokenId = 1;
        const contract = await Tezos.contract.at(contractAddress, compose(tzip16, tzip12));

        console.log(`Fetching the token metadata for the token ID ${tokenId}...`);
        // const metatData = await contract.tzip12().getTokenMetadata(1);
        const storage: any = await contract.storage();
        const ledger = storage.ledger || storage.accounts;
        const val = await ledger.get({ 0: "tz1dmSoZi281eKeU4B3W53LrAoqSa8kpCd6w", 1: 1 });
        if (!val) { return }
        let x = []
        x.push({
            name: "entry token",
            imageSrc: "https://cloudflare-ipfs.com/ipfs/QmPTFsFgEYfS3VV9uaTWfWUQGVqbaHa1t2npBUQZ4NiAvP",
            alt: "entry Token"
        })
        setItem(x)
        setUserBalance(1);
    }

    useEffect(() => {
        if (userAddress?.length > 1 && !isCalled) {
            isCalled = true;
            findInitialCoin();
            setTimeout(() => {
                setWalletAddress();
            }, 10000);
        }
    }, [userAddress]);

    return (
        <>
            <div className="flex flex-col items-center ml-auto mr-auto unity-container">
                <Unity unityContext={unityContext} style={{
                    height: "100%",
                    width: 950,
                    border: "2px solid black",
                    background: "grey",
                }} />
            </div>
            {items.length > 0 ?
                <section className="card-list mt-2 ml-auto mr-auto items-center justify-center">
                    {items.map((user) => (
                        <div key={user.alt} id={user.alt} onClick={(e) => addCard(user.alt, e, user.alt)} className="card">
                            <img onClick={(e) => addCard(user.alt, e, user.alt)} src={user.imageSrc} alt="this slowpoke moves" style={{
                                height: "202",
                                width: "202",
                            }} />
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

export default UnityComponent