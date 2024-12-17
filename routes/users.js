const express = require("express");
const {users} = require("../data/users.json")

const router = express.Router()

/**
 * Route: /usrers
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
 * Route: /usrers/:id
 * Method: GET
 * Description: Get user by their id
 * Access: Public
 * Parameters: id
 */
router.get("//:id",(req, res)=>{
    const{id} = req.params;
    const user = users.find((each)=> each.id ===id);
    if(!user)
        return res.status(404).json({
    success: false,
    message: "User Not Found"
    })
    return res.status(200).json({
        success: true,
        data: user
    })
})



/**
 * Route: /usrers
 * Method: Post
 * Description: Create a new user
 * Access: Public
 * Parameters: None
 */
router.post("/",(req, res)=>{
   const{id,name,surname, email, subscriptionType, subscriptionDate}=req.body;

   const user=users.find((each)=>each.id==id);

   if(user){
    return res.sendStatus(404).json({
        success:false,
        message: "User exists with given ID"
    })
   }
   users.push({id,name,surname, email, subscriptionType, subscriptionDate});
   return res.status(201).json({
    success: true,
    data: users
   })
})


/**
 * Route: /usrers/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.put("//:id", (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id ===id);
    if(!user)
       return res.status(404).json({
     success: false,
     message: "User Not Found"
       })

       const updateUser = users.map((each)=>{
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
        data: updateUser
     })
})

 
/**
 * Route: /usrers/:id
 * Method: DELETE
 * Description: Deleting a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.delete("//:id", (req, res)=>{
    const {id} = req.params;

    const user = users.find((each)=> each.id ===id);
    if(!user)
        return res.status(404).json({
    success: false,
    message: "User Not Found"
    })

  
    //const index = users.indexOf(user);
    const index = users.map((each, i)=>{
        if(each.id===id){
            return i
               
            }
         
            console.log(i)
       })
       console.log(index)
       console.splice(index,1)

    users.splice(index,1);

    return res.status(200).json({
        success: true,
        data: users
     })
})
// var arr = ["abc","ravi", "teja"];
            //  0,     1,      2

       module.exports = router;     