## Block State

Block State is a NFT marketplace for buying, selling and renting the real estate properties.This project was built by using ERC4907 standard which facilitates the efficient implementation of rentable NFTs.

[Live link](https://block-state-ye3pz4.spheron.app)

[Demo video]("")

### Technologies Used :

#### IPFS & Filecoin :

-> Details and Images of Property was uploaded to IPFS by using Web3.Storage and NFT.Storage and used them as metadata for NFT. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/sell.js))

-> Details of Membership like user address,bought date and time was uploaded to IPFS by using Web3.Storage. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/membership.js))

-> This project was hosted on Filecoin using Spheron.

#### Polygon :
-> Marketplace and Airdrop smart contracts are deployed on Polygon Testnet.([marketplace code](https://mumbai.polygonscan.com/address/0x72533b89C40E20Fe826Cdcb7cd095D132a1B090D#code))([airdrop code](https://mumbai.polygonscan.com/address/0x6353362dB359978dF63775B8A1e08eB6A634cf86#code))

-> Membership NFT smart contract was deployed to Polygon Mainnet using NFTPort.

#### Worldcoin :
-> Integrated world ID Protocol in claiming Airdrop NFT to ensure that user claimed the NFT only once. ([code link](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/airdrop.js)) ([contract link](https://mumbai.polygonscan.com/address/0x6353362dB359978dF63775B8A1e08eB6A634cf86))

#### Tableland :
-> Uploaded the details and images of Properties to Tableland So that fast rendering and rendering without wallet connection make possible and even editing details in future if user want to. ([code 1](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/sell.js))
([code 2](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/buy.js))
([code 3](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/sell.js))

#### XMTP :
-> A simple XMTP chat feature was enabled to chat with owner for bargaining and getting more details of property. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/components/nftDetails.js))

#### Tellor :
-> Used Tellor to get spot price of Matic. ([contract link](https://mumbai.polygonscan.com/address/0x72533b89C40E20Fe826Cdcb7cd095D132a1B090D#code)) ([tx hash](https://mumbai.polygonscan.com/tx/0xf083755765600027fd7fa52e3ae3f3aee457ac226adb872ec88398e1959b4b0d))

#### NFTPort :
-> Used NFTPort API's for minting the nft's using customizable minting and deploying nft contract. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/membership.js))

#### Covalent :
-> Created a dashboard for owner using powerful Covalent API class A endpoint for getting details of tokens minted and owner,metadata of specific token. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/pages/dashboard.js))

#### Valist :
-> Published this project using Valist protocol.

#### Spruce :
-> Used the sign in with ethereum and modified it and made it like sign in with polygon. ([code](https://github.com/dinesh11515/Block-State/blob/main/frontend/context/stateContext.js))