const axios = require('axios');
const { expect } = require('chai');

let response;

const url = 'https://cicd-books-back.herokuapp.com/books';

describe("When the user wants to list books", () => {
    before(async() => {
        response = await axios.get(url);
    });

    it("Then it should return an OK status code",()=>{
        expect(response.status).eql(200);
    });

    // it("Then it should return a list with at least one element", ()=>{
    //     const book = response.data
    //     expect(book.length).to.be.greaterThan(0);
    // })

    it("Then it should return a list with at least one element and that book must have id, name and author", ()=>{
        
        book = response.data
        expect(book.length).to.be.greaterThan(0);
        book = response.data[0];
        expect(book).to.have.property("id");
        expect(book).to.have.property("name");
        expect(book).to.have.property("author");

    })
});