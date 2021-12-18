import { Console } from "console";
import React, { useState, Dispatch, SetStateAction } from "react";

type CardList = {
    id: string
};

type CardObject = {
    cardList: CardList[]
}

const CardTest = ({
    cardList,//pass NFT cards here we should process them beforehand to build our own structure
}: CardObject): JSX.Element => {

    const anim = (id: number, e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        const elementId = (e.target as HTMLElement).id;
        const x = document.getElementById(elementId);
        if(x){
        x.className = "card animate__animated animate__backOutUp"
        }
    };
    const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9] //try to map through so that we only use one article 
    return (
        <section className="card-list mt-2">
            {testData.map((user) => (
                <div key={user} id={user.toString()} onClick={(e) => anim(1, e)} className="card">
                </div>
            ))}
        </section>
    );
};

export default CardTest;
