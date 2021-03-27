const axios = require('axios');
const { expect, assert } = require('chai');
const chai = require('chai');

const url = "https://cicd-books-back.herokuapp.com/books";
const book = {
    "name": "The little prince",
    "author": "Antoine de Saint-Exupéry"
}

describe("Given a created book", () =>{
    before(async ()=>{
        bookCreated = await axios.post(url,book);
        
    });

    describe("When user deletes an existing book", () =>{
        before(async () =>{
            oldBooks = await axios.get(url);
            response = await axios.delete(`${url}/${bookCreated.data.id}`);
            newBooks = await axios.get(url);
        });

        it("Should return OK satus code", () =>{
            expect(response.status).eql(200);
        })

        it("The book deleted should not exist on the books list", () =>{
            expect(newBooks.data).not.contain(bookCreated.data);
        })

        it("The books list length should decrease by 1", () =>{
            expect(newBooks.data.length).eql(oldBooks.data.length-1);
        })

    })
})

describe("When user wants to delete a book with an incorrect id", () =>{

    it('Then should return a 500 status error', (done) => {
        axios.delete(`${url}/noid`).catch(function (error) {
            const status = error.response.status;
            expect(status).eql(500);
        done()
      });
    });
    
    
});