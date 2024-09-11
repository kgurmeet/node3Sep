const express=require('express');
const app=express(); 
const Users=require("./Users.json")
app.use(express.json());
const fs=require('fs');
app.get('/',(req,res)=>{
    res.end("<h1>welcome page</h1>")
})

app.get('/Users',(req,res)=>{
    // in real project we will fetch the data from db
    res.json(Users);
})
app.post('/add/Users',(req,res)=>{
    console.log(req.body);
    //req.body.id=parseInt(31);
    Users.push(req.body);
    fs.writeFile('Users.json',JSON.stringify(Users),(err)=>{
        if(err){
            console.log("error");
            
        }else{
            console.log("data added successfully");
            
        }

    });
    res.end("add successfully");
    
})
app.get('/Users/:id',(req,res)=>{
    let id=req.params.id;
    let user=Users.find((user)=>user.id===parseInt(id));
    res.json(user);
})
//localhost:3000/Users/Update/30
app.put('/Users/Update/:id',(req,res)=>{
    let id=req.params.id;
    console.log(id);
    let index=Users.findIndex((User)=>User.id==parseInt(id))
    console.log(index + "index");
    Users[index].first_name="Mohan";
        fs.writeFile('Users.json',JSON.stringify(Users),(err)=>{
        if(err){
            console.log("error");
            
        }else{
            console.log("data added successfully");
            
        }

    });
    res.end("updated successfully");
    

})
app.delete('/Users/delete/:id',(req,res)=>{
    let id=req.params.id;
    let index=Users.findIndex((User)=>User.id==parseInt(id))
    if(index>-1){
    console.log(index + "index");
    Users.splice(index,1);
    fs.writeFile('Users.json',JSON.stringify(Users),(err)=>{
        if(err){
            console.log("error");
            
        }else{
            console.log("data added successfully");
            res.end("deleted successfully")
            
        }

    });
}else{
    res.end("data not found");
}

})

app.listen(3000,(err)=>{
    if(err){
        console.log(err);
        
    }else{
        console.log("server is listening on 3000......");
        
    }
})