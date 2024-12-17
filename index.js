const express = require("express");

const PORT = 8081;



app.get("/",(req, res)=>{
    res.status(200).json({
        message: "Server is up n running!"
    })
})

app.listen(PORT, ()=>{
    console.log("Server is up n running on port ${PORT}")
})