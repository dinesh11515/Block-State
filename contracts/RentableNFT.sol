// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC4907.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract RentableNFTMarketplace is ERC4907 {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    mapping(uint256 => string) public tokenURIs;


    uint256 listingPrice = 1 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      uint256 rentPrice,
      bool forRent,
      bool sold;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      uint256 rentPrice,
      bool forRent,
      bool sold
    );

    modifier onlyOwner(uint256 _tokenId) {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "caller is not owner nor approved"
        );
        _;
    }

    constructor() ERC4907("RentableNFT", "RNT"){
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint _listingPrice) public payable {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
      return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price,uint256 rent_price,bool forRent) public payable {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();
      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createMarketItem(newTokenId, price, rent_price , forRent);
    }

    function createMarketItem(
      uint256 tokenId,
      uint256 price,
      uint256 rent_price,
      bool forRent
    ) private {
      require(price > 0, "Price must be at least 1 wei");
      require(!forRent || rent_price > 0, "Rent price must be at least 1 wei");
      require(msg.value == listingPrice, "Price must be equal to listing price");

      idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        rent_price
        false,
        forRent
      );

      _transfer(msg.sender, address(this), tokenId);

      emit MarketItemCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        rent_price,
        false,
        forRent
      );
    }

    function resellToken(uint256 tokenId, uint256 price,uint256 rent_price,bool forRent) public payable {
      require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(msg.value == listingPrice, "Price must be equal to listing price");
      idToMarketItem[tokenId].sold = false;
      idToMarketItem[tokenId].price = price;
      idToMarketItem[tokenId].seller = payable(msg.sender);
      idToMarketItem[tokenId].owner = payable(address(this));
      idToMarketItem[tokenId].rentPrice = rent_price;
      idToMarketItem[tokenId].forRent = forRent;
      _itemsSold.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(
      uint256 tokenId
      ) public payable {
      uint price = idToMarketItem[tokenId].price;
      address seller = idToMarketItem[tokenId].seller;
      require(msg.value == price, "Please pay the asking price in order to complete the purchase");
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
    ) public{
        uint rentPrice = idToMarketItem[tokenId].rentPrice;
        require(msg.value > rentPrice,"pay the rent price showing in the order");
        _setUser(_tokenId, msg.sender, _expires);
    }

    function updateRentPrice(uint256 _tokenId,uint256 rent_price) public{
        require(idToMarketItem[tokenId].seller == msg.sender, "Only item owner can perform this operation");
        idToMarketItem[tokenId].rentPrice = rent_price;
    }

    function updatePrice(uint256 _tokenId,uint256 price) public{
        require(idToMarketItem[tokenId].seller == msg.sender, "Only item owner can perform this operation");
        idToMarketItem[tokenId].price = price;
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToMarketItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function fetchItemsListed() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return tokenURIs[_tokenId];
    }

}
