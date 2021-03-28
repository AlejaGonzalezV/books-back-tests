# books-back-tests

This repository contains e2e tests for the app deployed on: https://cicd-books-back.herokuapp.com

to run tests you have to run:
```
npm install
npm tests
```

All the test cases are located at e2e/specs/**

Following test cases are covered:

- Tests on list-books.specs.js

  - Tests when user wants to list all the books 
  - Asserts fields expected are retrieved
  
- Tests on create-books.specs.js
  
  - Creates a new book and asserts book is created with the right fields
  - Lists books before create new one and after it, compares the lists length
  - Test what happen when user tries to register a book without a field
  - After run the tests, deletes the data created 

- Tests on edit-books.specs.js

  - Creates a new book
  - Updates the created book and asserts new values have been changed in the existing book
  - Tests what happen when user tries to edit a book without a field
  - After run the tests, deletes the data created 
 
- Tests on delete-books.specs.js

  - Creates a new book
  - Deletes the new book and asserts the book is not listed
  - Tests what happen when user tries to delete a book with the incorrect id

