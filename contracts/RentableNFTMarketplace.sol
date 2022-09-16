// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC4907.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "usingtellor/contracts/UsingTellor.sol";



contract RentableNFTMarketplace is ERC4907, UsingTellor{

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    Counters.Counter public _itemsSold;
    mapping(uint256 => string) public tokenURIs;


    uint256 listingPrice = 1 ether;
    address payable public owner;
    address payable _tellorAddress = payable(0x840c23e39F9D029fFa888F47069aA6864f0401D7);

    mapping(uint256 => MarketItem) public idToMarketItem;

    struct MarketItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      uint256 rentPrice;
      bool forRent;
      bool forSale;
      bool sold;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      uint256 rentPrice,
      bool forRent,
      bool forSale,
      bool sold
    );

    modifier onlyOwner(uint256 _tokenId) {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "caller is not owner nor approved"
        );
        _;
    }

    constructor() ERC4907("Rentable", "RT") UsingTellor(_tellorAddress){
        owner = payable(msg.sender);
    }

    function getMaticSpotPrice() external view returns(uint256) {
    
      bytes memory _queryData = abi.encode("SpotPrice", abi.encode("matic", "usd"));
      bytes32 _queryId = keccak256(_queryData);
      
      (bool ifRetrieve, bytes memory _value, ) =
          getDataBefore(_queryId, block.timestamp - 1 hours);
      if (!ifRetrieve) return 0;
      return abi.decode(_value, (uint256));
    }

    function updateListingPrice(uint _listingPrice) public payable {
      require(owner == msg.sender, "owner");
      listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
      return listingPrice;
    }

    function createToken(string memory _tokenURI, uint256 price,uint256 rent_price,bool forRent,bool forSale,bool member) public payable {
      require(member || msg.value == listingPrice, "Price must be equal to listing price");
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();
      _mint(msg.sender, newTokenId);
      tokenURIs[newTokenId] = _tokenURI;
      createMarketItem(newTokenId, price, rent_price , forRent,forSale);
    }

    function createMarketItem(
      uint256 tokenId,
      uint256 price,
      uint256 rent_price,
      bool forRent,
      bool forSale
    ) private {
      require(price > 0, "price required");
      require(!forRent || rent_price > 0, "rent price required");

      idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        rent_price,
        forRent,
        forSale,
        false
      );

      _transfer(msg.sender, address(this), tokenId);

      emit MarketItemCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        rent_price,
        forRent,
        forSale,
        false
      );
    }

    function resellToken(uint256 tokenId, uint256 price,uint256 rent_price,bool forRent,bool forSale,bool member) public payable {
      require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(member || msg.value == listingPrice, "Price must be equal to listing price");
      idToMarketItem[tokenId].sold = false;
      idToMarketItem[tokenId].price = price;
      idToMarketItem[tokenId].seller = payable(msg.sender);
      idToMarketItem[tokenId].owner = payable(address(this));
      idToMarketItem[tokenId].rentPrice = rent_price;
      idToMarketItem[tokenId].forRent = forRent;
      idToMarketItem[tokenId].forSale = forSale;
      _itemsSold.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(
      uint256 tokenId
      ) public payable {
      uint price = idToMarketItem[tokenId].price;
      address seller = idToMarketItem[tokenId].seller;
      require(msg.value >= price, "Please pay the asking price in order to complete the purchase");
      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
      payable(owner).transfer(listingPrice);
      payable(seller).transfer(msg.value);
    }

    function rentOutToken(
        uint256 _tokenId,
        uint64 _expires
    ) public payable{
        require(idToMarketItem[_tokenId].forRent, "Token was not for renting");
        require(userOf(_tokenId) == address(0), "Token is already rented");
        uint rentPrice = idToMarketItem[_tokenId].rentPrice;
        require(msg.value >= rentPrice,"pay the rent price");
        _setUser(_tokenId, msg.sender, _expires);
    }

    function updateRentPrice(uint256 _tokenId,uint256 rent_price) public{
        require(idToMarketItem[_tokenId].seller == msg.sender, "Only item owner can perform this operation");
        idToMarketItem[_tokenId].rentPrice = rent_price;
    }

    function updatePrice(uint256 _tokenId,uint256 price) public{
        require(idToMarketItem[_tokenId].seller == msg.sender, "Only item owner can perform this operation");
        idToMarketItem[_tokenId].price = price;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked(tokenURIs[_tokenId],"/metadata.json"));
    }

}
