# PiXL-Public
This is the Public PiXL Repo of our progress

# TLDR;
PiXL is an evoloving RPG on the Tezos blockchain. 

# Main Concepts
PiXL is an RPG (Role Playing Game) that is designed to evolve and constantly change. There are 5 main ideas that are core to project:
1. **PiXL is Play-to-Earn** - Players are be able to take items they win in the game on markets such as objkt.com
2. **PiXL teaches DeFi & Tezos Tech** - The game simulates a Tezos ecosystem usingPiXL tez (our own token). PiXLtez is used in-game to sign transactions, create nodes and earn block rewards.
3. **PiXL is frictionless** - PiXL is on mainnet and uses an entry token to give players access. The entry token only needs to be in the user's wallet and the wallet synced. This is a read-olny call so there are no gas fees.
4. **PiXL is for the evnironment** - All elements of PiXL are made to have a minimal impact on the evironment. The Quests, enemies and conecpts in the game emphasize the reality of the environmental impact of Proof-of-Work NFTs. (i.e. monsters in the game are dirty NFTs)
5. **PiXL is about collaboration** - As a love letter to the Tezos community, PiXL will feature colaborations with atrists in the community. It also emphasizes the concepts of Self-Sovereign Identity as players are able to quests with other players while maintaining ownership of the Quest NFT (that has rarity).

# How it's Made
PiXL is made using Unity WebGL Export, Taquito on the frontend using Typescript, MongoDB on the backend. It runs on node.js

# What Happens On-Chain
To create a frictionless UX for the user (player) - they are never required to sign a transaction or pay any gas. Initially, the user signs in and their wallet is checked for an entry coin. If they own an entry coin then they can play the game. In the game - players earn Quests, Items and PiXLtez as they play. These are taken to the baker in the game at which point they can be minted to the user's wallet. The minted NFTs are then air-dropped to the user's wallet using https://github.com/tzConnectBerlin/peppermint. This way the user never pays gas for the transaction. The NFTs are available in the user's wallet as NFTs in an objkt.com collection. The user can then sell the NFTs using objkt.com marketplace or use them in game.

# What Can Be Minted
The Following Items can be minted in PiXL:
1. **Quest NFT** - Each quest in the game must be found and has rarity. Once all editions of a quest are found (and minted) that quest no longer appears in the game. Each week there will be a new quest featuing a Tezos artist or community member. Quests are limited and rare, once owned they can be shared with other players using the Self-Sovereign Identity Wizard. By completing a quest, the player receives an Item. 
2. **Item NFT** - Each Item in the game is awarded by completing a quest or purchased from the baker (shop) with PiXLtez. If an item is taken to the baker, it will show up in the player's wallet. Items earned through completeing Quests are very rare and are associated with the Quest's featured character. Other Items are less rare but still need to be purchased with PiXLtez - which is earned through playing the game and learning blockchain. Each Item improves your player in unique ways.
3. **PiXLtez** - PiXLtez is a fungible FA2 token that can be traded and swapped on mainnet (IRL). It is the currency that PiXL uses to teach DeFi in the game and functions as a much more affordable version of tez - so players are able to understand larger-scale DeFi concepts like hosting node and voting. PiXLtez will hold some value and are live on mainnet. Players can keep them in game to buy items or stake for rewards, or mint them to their IRL Tezos wallet.

# Tools Used
We Used the following tools to make this project come together.

https://github.com/tzConnectBerlin/peppermint

https://github.com/ecadlabs/taquito





