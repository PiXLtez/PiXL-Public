import { ItemType } from "../components/Unity/UnityComponent"

export class MintProvider {

    constructor() {
    }
    async mintItem() {
        // on a successful transfer the api should return use the object details so that we can display it to the user
        const result = await fetch("http://localhost:5000/api/transfer", {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //result will be empty due to cors. Won't be an issue when both are hosted
        return {
            name: "Tezzard",
            imageSrc: "/whitney-with-microphone.png",
            alt: "Placeholder",
        } as ItemType
    }

    async shareQuest(questDetails:any, Id:any) {
        // on a successful transfer the api should return use the object details so that we can display it to the user
        const result = await fetch("http://localhost:5000/api/transfer/shareQuest", {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({questDetails,Id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //result will be empty due to cors. Won't be an issue when both are hosted
        return
    }

    createImageSrc(artifactUri: string | undefined) {
        if (artifactUri) {
            return "https://cloudflare-ipfs.com/ipfs/" + artifactUri
        } else {
            return "error"
        }
    }
}