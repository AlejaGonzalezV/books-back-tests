const axios = require('axios');
const { expect } = require('chai');

const url = "https://cicd-books-back.herokuapp.com/books";
const book = {
    "name": "The little prince",
    "author": "Antoine de Saint-Exupéry"
}

const badBook = {
    "name": "The little prince"
}

describe("Given a created", () =>{
    before(async()=>{
        oldBook = await axios.post(url, book);
        bookID = oldBook.data.id;
    });

    after(async ()=>{
        deleteResponse = await axios.delete(`${url}/${bookID}`);
        if(deleteResponse.status === 200){
            console.log("Data deleted successfully");
        }else{
            console.log("Error removing data");
        }
    })

    describe("When the user wants to edit a book without a field", () =>{

        it('Then should return a 500 status error', (done) => {
            axios.put(url+"/"+oldBook.data.id, badBook).catch(function (error) {
                const status = error.response.status;
                expect(status).eql(500);
            done()
          });
        });
        
        
    });

    describe("When the user wants to update the book", () =>{
        before(async()=>{
            book['name'] = `${book.name}-MOD`;
            book['author'] = `${book.author}-MOD`;
            oldList = await axios.get(url);
            response = await axios.put(url+"/"+oldBook.data.id, book);
            newList = await axios.get(url);
        });
        
        it("Should return OK status", ()=>{
            expect(response.status).eql(200);
        });

        it("Should return the book modifyed", () =>{
            modBook = response.data;
            delete modBook['id'];
            expect(modBook).eql(book);
        });

        it("Should return a different book than the initial one", () =>{
            modBook = response.data;
            delete modBook['id'];
            expect(modBook).not.eql(oldBook.data);
        })

        it("Should return a list with the same size", () =>{
            expect(newList.data.length).eql(oldList.data.length);
        });

    });

});