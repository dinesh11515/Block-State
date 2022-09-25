## Block State

Block State is a NFT marketplace for buying, selling and renting the real estate properties.This project was built by using ERC4907 standard which facilitates the efficient implementation of rentable NFTs and technologies like IPFS, Polygon, Tableland, WorldCoin, Tellor , NFTPort and XMTP.

[Live link](https://block-state-ye3pz4.spheron.app)

[Valist link](https://bafybeihi5etl5u5eld2gecsukylskyzm4vcxtzjhn62qblb3yyjv4frc2q.ipfs.gateway.valist.io/)

[Demo video](https://www.youtube.com/watch?v=WmEpPj2IMQs)

### Description

This project contains separate pages for buying, Selling and Renting of Real Estate Properties. In selling page a seller can able to mint a new ERC721 rentable NFT by uploading the details of property. In buying page all the properties available for buying are listed.Respectively all the rentable properties are listed in Rent page. A simple wallet to wallet chat was also enabled in this project to chat with the owner of the property to get more details about property.

### How It's Made
This project was built by using  ERC4907 standard which facilitates the efficient implementation of rentable NFTs and technologies like  IPFS, Polygon, Tableland, WorldCoin, Tellor , NFTPort and XMTP. This project uploads the details of properties and images , membership details to IPFS using Web3.Storage and NFT.Storage. The whole project was hosted on Filecoin using Spheron. All the details are also uploaded to Tableland So that fast rendering and makes possible rendering without wallet connection  and even editing details in future if user want to. All the smart contracts are deployed on Polygon Blockchain. This project used the world ID protocol to ensure the adopters claimed the Early Adopters NFT's only once. A simple XMTP chat feature was enabled to chat with owner for bargaining and getting more details of property.This project uses Tellor to get spot price of Matic. This project uses NFTPort API's for minting NFT's to 
users who bought the pro membership of BlockState. In this Project, a dashboard was created for owner using powerful Covalent API class A endpoint for getting details of tokens minted and owner,metadata of specific token.This project modifies the Spruce sign in with ethereum and made it like sign in with polygon.Finally this project was published using Valist.

### Technologies Used :

#### IPFS & Filecoin :

-> Details and Images of Property was uploaded to IPFS by using Web3.Storage and NFT.Storage and used them as metadata for NFT. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/sell.js#L29-L63))

-> Details of Membership like user address,bought date and time was uploaded to IPFS by using Web3.Storage. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/membership.js#L24-L37))

-> This project was hosted on Filecoin using Spheron.

#### Polygon :
-> Marketplace and Airdrop smart contracts are deployed on Polygon Testnet.([marketplace code](https://mumbai.polygonscan.com/address/0x72533b89C40E20Fe826Cdcb7cd095D132a1B090D#code))([airdrop code](https://mumbai.polygonscan.com/address/0x6353362dB359978dF63775B8A1e08eB6A634cf86#code))

-> Membership NFT smart contract was deployed to Polygon Mainnet using NFTPort.

#### Worldcoin :
-> Integrated world ID Protocol in claiming Airdrop NFT to ensure that user claimed the NFT only once. ([code link](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/airdrop.js#L75-L81)) ([contract link](https://mumbai.polygonscan.com/address/0x6353362dB359978dF63775B8A1e08eB6A634cf86))

#### Tableland :
-> Uploaded the details and images of Properties to Tableland So that fast rendering and makes possible rendering without wallet connection and even editing details in future if user want to. ([code 1](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/sell.js#L64-L87)) ([code 2](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/buy.js#L19-31)) ([code 3](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/rent.js#L18-L30))

#### XMTP :
-> A simple XMTP chat feature was enabled to chat with owner for bargaining and getting more details of property. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/components/nftDetails.js#L69-L95))

#### Tellor :
-> Used Tellor to get spot price of Matic. ([contract link](https://mumbai.polygonscan.com/address/0x72533b89C40E20Fe826Cdcb7cd095D132a1B090D#code)) ([tx hash](https://mumbai.polygonscan.com/tx/0xf083755765600027fd7fa52e3ae3f3aee457ac226adb872ec88398e1959b4b0d))

#### NFTPort :
-> Used NFTPort API's for minting the nft's using customizable minting and deploying nft contract. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/membership.js#L47-L66))

#### Covalent :
-> Created a dashboard for owner using powerful Covalent API class A endpoint for getting details of tokens minted and owner,metadata of specific token. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/dashboard.js#L7-L42))

#### Valist :
-> Published this project using Valist protocol. ([link](https://app.valist.io/dinesh11515/blockstate))

#### Spruce :
-> Used the sign in with ethereum and modified it and made it like sign in with polygon. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/context/stateContext.js#L34-L68))