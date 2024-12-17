const express = require("express");
const {users} = require("../data/users.json")
const {books} = require("../data/books.json")

const router = express.Router()

/**
 * Route: /books
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        data: users,
    })
})

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by their id
 * Access: Public
 * Parameters: id
 */
router.get("//:id",(req, res)=>{
    const{id} = req.params;
    const book = books.find((each)=> each.id ===id);
    if(!book)
        return res.status(404).json({
    success: false,
    message: "Book Not Found"
    })
    return res.status(200).json({
        success: true,
        data: book
    })
})

/**
 * Route: /books
 * Method: Post
 * Description: Create a new book
 * Access: Public
 * Parameters: None
 */
router.post("/",(req, res)=>{
    const{id,name, author, genre, price, publisher}=req.body;
 
    const book=books.find((each)=>each.id==id);
 
    if(book){
     return res.sendStatus(404).json({
         success:false,
         message: "Book exists with given ID"
     })
    }
    books.push({id,name,author, genre, price, publisher});
    return res.status(201).json({
     success: true,
     data: books
    })
 })

 /**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a boo by their ID
 * Access: Public
 * Parameters: ID
 */
router.put("//:id", (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each)=> each.id ===id);
    if(!book)
       return res.status(404).json({
     success: false,
     message: "Book Not Found"
       })

       const updateBook = books.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            }
        }
        return each;
       })

     return res.status(200).json({
        success: true,
        data: updateBook
     })
})

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Deleting a book by their ID
 * Access: Public
 * Parameters: ID
 */
router.delete("//:id", (req, res)=>{
    const {id} = req.params;

    const book = books.find((each)=> each.id ===id);
    if(!book)
        return res.status(404).json({
    success: false,
    message: "Book Not Found"
    })

  
    const index = books.indexOf(book);
    //const index = users.map((each, i)=>{
        //if(each.id===id){
           // return i
               
           // }
         
            //console.log(i)
      // })
       //console.log(index)

    books.splice(index,1);

    return res.status(200).json({
        success: true,
        data: books
     })
})
 

module.exports = router;  
