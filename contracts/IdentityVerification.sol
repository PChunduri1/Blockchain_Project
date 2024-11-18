// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract IdentityVerification is Ownable {
    struct Identity {
        string name;
        string email;
        bool isVerified;
    }

    // Mapping from an address to its corresponding Identity
    mapping(address => Identity) public identities;

    // Events to notify when identities are registered or verified
    event IdentityRegistered(address indexed identityAddress, string name, string email);
    event IdentityVerified(address indexed identityAddress);

    // Constructor that takes the initial owner address
    constructor(address initialOwner) Ownable(initialOwner) {}

    // Function to register an identity
    function registerIdentity(string memory _name, string memory _email) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        
        identities[msg.sender] = Identity(_name, _email, false);
        emit IdentityRegistered(msg.sender, _name, _email);
    }

    // Function to verify an identity (only callable by the contract owner)
    function verifyIdentity(address _identityAddress) public onlyOwner {
        require(bytes(identities[_identityAddress].name).length != 0, "Identity does not exist");
        identities[_identityAddress].isVerified = true;
        emit IdentityVerified(_identityAddress);
    }

    // Function to retrieve identity details
    function getIdentity(address _identityAddress) public view returns (string memory, string memory, bool) {
        Identity storage identity = identities[_identityAddress];
        return (identity.name, identity.email, identity.isVerified);
    }
}