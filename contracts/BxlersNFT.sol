//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BxlersNFT is ERC721, Ownable {
  uint256 public mintPrice;
  uint256 public totalSupply;
  uint256 public maxSupply;
  uint256 public maxPerWallet;

  bool public isPublicMintEnabled;

  string internal baseTokenUri;

  address payable public withdrawalAddress;

  mapping(address => uint256) public walletMints;

  constructor() payable ERC721("Bxlers", "BXL") {
    mintPrice = 0.1 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 4;
    isPublicMintEnabled = true;
    // set withdrawal address to the owner
    // withdrawalAddress = msg.sender;
  }

  function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
    isPublicMintEnabled = _isPublicMintEnabled;
  }

  function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
    baseTokenUri = _baseTokenUri;
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    require(_exists(_tokenId), "Token does not exist");
    return string(abi.encode(baseTokenUri, Strings.toString(_tokenId), ".json")); 
  }

  function withdraw () external onlyOwner {
    (bool success, ) = withdrawalAddress.call{ value: address(this).balance }("");
    require(success, "Withdrawal failed");
  }

  function mint (uint _quantity) public payable {
    require(isPublicMintEnabled, "Public minting is disabled");
    require(msg.value >= mintPrice, "Wrong mint value"); 
    require(totalSupply + _quantity <= maxSupply, "Max supply reached");
    require(walletMints[msg.sender] + _quantity <= maxPerWallet, "Max per wallet reached");

    for (uint i = 0; i < _quantity; i++) {
      uint256 newtokenId = totalSupply + i;
      totalSupply++;
      _safeMint(msg.sender, newtokenId);
    }
  }
}