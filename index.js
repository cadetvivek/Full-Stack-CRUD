const express = require("express");
const app = express();
//data send http request
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const cors = require("cors");

const db = mysql.createPool({
   host:"localhost",
   user:"root",
   password:"Vivek@#123",
   database:"crud_contact"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));




///api/get: Handles GET requests to fetch all records from the contact_db table.

app.get("/api/get",(req,res)=>{
  const sqlGet = "SELECT * FROM contact_db";
  db.query(sqlGet,(error,result)=>{
     res.send(result);
  })
})

  
app.post("/api/post",(req,res)=>{
  const {name,email,contact}=req.body;
  const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)";
  db.query(sqlInsert,[name,email,contact],(error,result)=>{
     if(error){
        console.log(error)
     }
  })
})



app.delete("/api/remove/:id",(req,res)=>{
  const {id} = req.params;
  const sqlRomove = "DELETE FROM contact_db WHERE id = ?"
  db.query(sqlRomove,id,(error,result)=>{
     if(error){
        console.log(error)
     }
  })
})



app.get("/api/get/:id",(req,res)=>{
  const {id} = req.params;
  const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
  db.query(sqlGet,id,(error,result)=>{
     if(error){
        console.log(error)
     }
     res.send(result)
  })
})

// i put put replace get
app.put("/api/update/:id",(req,res)=>{
  const {id} = req.params;
  const {name,email,contact}=req.body;
  const sqlUpdate = "UPDATE contact_db SET name = ?, email=?,contact=? WHERE id =?";
  db.query(sqlUpdate,[name,email,contact,id],(error,result)=>{
     if(error){
        console.log(error)
     }
     res.send(result)
  })
})


app.get("/",(req,res)=>{
//  const sqlInsert= "INSERT INTO contact_db (name,email,contact) VALUES ('vivek','vivek@gmail.com',987654321)";
//      db.query(sqlInsert,(error,result)=>{
//         console.log("error",error);
//         console.log("result",result);
//         res.send("Hello Express");
//      })

   
})
app.listen(5000,()=>{
    console.log("Server is running on port 5000")
});



