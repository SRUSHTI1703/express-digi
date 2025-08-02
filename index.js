import express from 'express'

const app = express()
const port = 3000
//this is basic
// app.get("/" , (req, res)=>{
//     res.send("hello from sumeet")
// })
// app.get("/ice-tea" , (req, res)=>{
//     res.send("what ice tea would you prefer")
// })
// app.get("/twitter" , (req, res)=>{
//     res.send("kinetix2017")
// })

//accpeting data from frontend side as well

app.use(express.json()) // It allows your app to understand and use JSON data sent by the client 


// a application that stores data in an array
let teaData = []
let nextId = 1


app.post('/teas',(req, res)=>{
    const {name,price} = req.body //pulls out just the name and price properties and creates two variables: name and price
    //creatring this object to store this data in database
    const newTea = {id: nextId++,name,price}
    teaData.push(newTea)
    //status code 201 means created used when a new resource is added
    res.status(201).send(newTea)
})

app.get('/teas',(req, res)=>{
    res.status(200).send(teaData)
})

// how can i get a single tea - since we are storing the ids then you should provide me an id -- get tea by id
app.get('/teas/:id' , (req, res)=>{
    const tea =teaData.find(t =>t.id === parseInt(req.params.id)) //req.params.id = grabbing dynamic values from url path
    if (!tea) {
        return res.status(404).send("tea not found")
    }
    res.status(200).send(tea)

})

// update tea
// this is what we called bussiness logic
app.put('/teas/:id' , (req, res)=>{
    const tea =teaData.find(t =>t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("tea not found")
    }
    const {name,price} = req.body
    // setting new price and name
    tea.name=name
    tea.price=price
    res.status(200).send(tea)
})

//delete tea
app.delete('/teas/:id' , (req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
       return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1) //.splice(index, 1) means: remove 1 item starting from the index position.


    res.status(204).send('deleted') // 204 means deletion was succesfull

})


app.listen(port,()=>{
    console.log(`server is running at port : ${port} ...`);
    
})