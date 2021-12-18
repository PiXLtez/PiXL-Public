[![Watch the trailer](https://img.youtube.com/vi/QVPEZzORz4w/maxresdefault.jpg)](https://youtu.be/QVPEZzORz4w)

# PiXL-Public
PiXL is an evolving RPG on the Tezos blockchain by Lex & Darren "Skode"

This is the Public PiXL Repo of our progress. 

# Main Concepts
PiXL is an RPG (Role Playing Game) that is designed to evolve and constantly change. There are 5 main ideas that are core to project:
1. **PiXL is Play-to-Earn** - Players are be able to take items they win in the game and sell/trade them on markets such as [OBJKT](https://objkt.com)
2. **PiXL teaches DeFi & Tezos Tech** - The game simulates a Tezos ecosystem using [PiXLtez](#what-can-be-minted) (our own token). PiXLtez is used in-game to sign transactions, create nodes and earn block rewards. All concepts like voting and liquid-proof-of-stake are exemplified by the user being able to earn 8,000 PiXLtez and run their own node - which will make them more powerful in the game. 
3. **PiXL is frictionless** - PiXL is on mainnet and uses an entry token to give players access. The entry token only needs to be in the user's wallet and the wallet synced. This is a read-only call so there are no gas fees.
4. **PiXL is for the environment** - All elements of PiXL are made to have a minimal impact on the environment. The Quests, enemies and concepts in the game emphasize the reality of the environmental impact of Proof-of-Work NFTs. (i.e. monsters in the game are dirty NFTs)
5. **PiXL is about collaboration** - As a love letter to the Tezos community, PiXL will feature collaborations with artists in the community. It also emphasizes the concepts of Self-Sovereign Identity as players are able to share their quests with other players while maintaining ownership of the [Quest NFT](#what-can-be-minted) (that has rarity).

# How it's Made
PiXL is made using [Unity](https://unity.com/) WebGL Export, 

[Taquito](https://github.com/ecadlabs/taquito) on the frontend using Typescript, 

[MongoDB](https://www.mongodb.com/) on the backend. It runs on [node.js](https://nodejs.org/en/)

We run a stripped down [Peppermint](https://github.com/tzConnectBerlin/peppermint) as a server to do the on-chain transactions 

# Innovative Business Model
PiXL is the first use of an innovative business model that focuses on a frictionless experience for the user. To play PiXL, you need to buy an [Entry Coin NFT](https://objkt.com/asset/KT1SGdop74rGobKAETcBPnz9yQkH38hZnpBh/1) proceeds from the sales fund the project. The game checks the player's wallet for an Entry Coin via a read-only request (using taquito, beacon sdk and tzip12) - this does not cost gas. The user is able to play, and all items collected are sent to the user's wallet via batch script (using taquito & peppermint).

This business model creates the smoothest onboarding ever, as a new user only has to get a Tezos compatible wallet. They don't even need to have any tez. The Entry Coin can be sent to their wallet and all play-to-earn rewards do not cost them any gas.

[![Entry Coin](https://cloudflare-ipfs.com/ipfs/QmeZzZidhj8ZsuZKMmdutKDebQKyacHM46HuFhWs7bppx4/image.gif)](https://objkt.com/asset/KT1SGdop74rGobKAETcBPnz9yQkH38hZnpBh/1)

# What Happens On-Chain
To create a frictionless UX for the user (player) - they are never required to sign a transaction or pay any gas. Initially, the user syncs their wallet and their wallet is checked for an entry coin. If they own an entry coin then they can play the game. In the game - players earn Quests, Items and PiXLtez as they play. These are taken to the baker in the game at which point they can be minted to the user's wallet. The minted NFTs are then air-dropped to the user's wallet using [Peppermint](https://github.com/tzConnectBerlin/peppermint).  

This way the user (player) never pays gas for the transaction. The NFTs are available in the user's wallet as NFTs in an [OBJKT](https://objkt.com) collection. The user can then sell the NFTs using objkt.com marketplace or use them in game.

# What Can Be Minted
The following Items can be minted in PiXL:
1. **Quest NFT** - Each quest in the game must be found and has rarity. Once all editions of a quest are found (and minted) that quest no longer appears in the game. Each week there will be a new quest featuring a Tezos artist or community member. Quests are limited and rare, once owned they can be shared with other players using the Self-Sovereign Identity Wizard. By completing a quest, the player receives an Item. 
2. **Item NFT** - Each Item in the game is awarded by completing a quest or purchased from the baker (shop) with PiXLtez. If an item is taken to the baker, it will show up in the player's wallet. Items earned through completing Quests are very rare and are associated with the Quest's featured character. Other Items are less rare but still need to be purchased with PiXLtez - which is earned through playing the game and learning blockchain. Each Item improves your player in unique ways.
3. **PiXLtez** - PiXLtez is a fungible FA2 token that can be traded and swapped on mainnet (IRL). It is the currency that PiXL uses to teach DeFi in the game and functions as a much more affordable version of tez - so players are able to understand larger-scale DeFi concepts like running a node and voting. PiXLtez will hold some value and are live on mainnet. Players can keep them in game to buy items or stake for rewards - or mint them to their IRL Tezos wallet.

# Self-Sovereign Identity Wizard
Any player on a Quest in the game can visit the Self-Sovereign Identity Wizard and share that quest with other players (Wallets) for 24 hours. This all happens off-chain in our internal database so there are no gas fees and it's seamless. All players on the Quest have the ability to complete it and earn the Quest Rewards. 

No matter what, the original player retains the Quest in inventory and can mint it as a Quest NFT. 

# DeFi Concepts
PiXL introduces the player to the concepts of Decentralized Finance and Liquid-Proof-of-Stake. By completing quests and battling monsters (Dirty NFTs) the player earns PiXLtez - which are also a token on the main-net and have some value. The player is able to use the PiXLtez in game to save up to a roll (8,000 PiXLtez) and create a node. A node will give their character upgrades and make them more powerful. 

The game also teaches security best practices with Quests involving seed phrases, cold storage and hardware wallets. 

# Security
Since PiXL is on main-net and is play-to-earn, it's very important to maintain fairness and preserve value in the Item NFTs and PiXLtez tokens. 
Unity will track progress of the game as the user plays, this progress will be written to the server with timestamps. This will elimate bots and malicious actors becasue of the time it takes to progress in-game (i.e. to complete quest).

We apply logic to the database as we query it to confirm normal usage. Abnormal useage will add the suspicious wallet to a blacklist in our internal database.
Before transfering tokens to the user we check their wallet against the blacklist to prevent bots and malicious actors from receiving Item NFTs or PiXLtez.

As PiXLtez is always evolving, we'll update the game and the artchitecture to counter any exploits we have not forseen.

PiXL is also a play-to-earn-to-learn game where concepts in personal security are covered. The players learn about keeping their passphrase safe and concepts such as cold storage. They will also learn about vulnarabilities and exploits as the game will cover happenings in the Tezos ecosystem. If a exploit becomes public we'll incorporate it into the game to let users learn by doing. 

# Tools Used
We used the following tools to make this project come together.

https://github.com/tzConnectBerlin/peppermint

https://github.com/ecadlabs/taquito

# Backlog
We plan to release PiXL to the community in the coming weeks. There are still a few things that need to be done:
- [ ] Mint this week's Items on the Mainnet
- [ ] Mint the $PiXLtez Fungible Token
- [x] Begin First Collaboration with Tezos Artists - Done, First Collab will be with Neonz by Sutu
- [ ] Continue working on the backend to add more feature and security as well as exploring better ways to utilize smart contracts for our needs
- [ ] Continue to add new features and UI improvments to the frontend application (Improve card designs animations and interactions with the backend)
- [ ] Run our own node on main-net as a baker.
- [ ] Integrate the content from our narrative team into Quests and dialog
- [ ] With funding we would expand our team to continue making the best games in the metaverse.

# Contributors
This project would not be what it is without the following contributions from the community:

Rafael - Pixel Art

Andrew - Pixel Art

Mr. B - Rap & Music

Dani J - On-Chain Support

[Tacode](https://tacode.dev/courses/dev-starter/) - For the excellent decentralized learning






