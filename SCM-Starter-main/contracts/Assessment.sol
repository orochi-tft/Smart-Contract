// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address public librarian;
    mapping(string => uint256) public books; // Maps book titles to their availability count

    event BookBorrowed(string book, uint256 remainingCopies);
    event BookReturned(string book, uint256 availableCopies);

    constructor() {
        librarian = msg.sender;
    }

    modifier onlyLibrarian() {
        require(msg.sender == librarian, "Only the librarian can manage the library");
        _;
    }

    function addBook(string memory book, uint256 copies) public onlyLibrarian {
        books[book] += copies;
    }

    function borrowBook(string memory book) public {
        require(books[book] > 0, "Book is not available");
        books[book]--;
        emit BookBorrowed(book, books[book]);
    }

    function returnBook(string memory book) public {
        books[book]++;
        emit BookReturned(book, books[book]);
    }

    function getAvailableCopies(string memory book) public view returns (uint256) {
        return books[book];
    }
}
