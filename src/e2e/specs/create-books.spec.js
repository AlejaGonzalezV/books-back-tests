const axios = require('axios');
const { expect } = require('chai');

const url = "https://cicd-books-back.herokuapp.com/books";
const book = {
    "name": "The little prince",
    "author": "Antoine de Saint-Exupéry"
}

describe ("When the user wants to create a book", () =>{
    before(async()=>{
        oldList = await axios.get(url);
        response = await axios.post(url, book);
        newList = await axios.get(url);
        bookID = response.data.id;
        
    });

    after(async ()=>{
        deleteResponse = await axios.delete(`${url}/${bookID}`);
        if(deleteResponse.status === 200){
            console.log("Data deleted successfully");
        }else{
            console.log("Error removing data");
        }
    });

    it('Then should return OK status code',()=>{
        expect(response.status).eql(200);
    });

    it("Then it should return the created book",()=>{
        createdBook = response.data;
        delete createdBook['id'];
        expect(createdBook).eql(book);
    });

    it("Then it should return a JSON as content type",()=>{
       expect(response.headers['content-type']).to.contain('application/json');
    });

    it("Then it should return a list with the length increased by 1 element", ()=>{
        expect(newList.data.length).eql(oldList.data.length + 1);
    })
})