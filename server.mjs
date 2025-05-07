import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import Fruit from './models/fruit.mjs'
import Fruits from './routes/fruits.mjs'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

// Middleware 
app.use(express.urlencoded())
app.use(express.json())

// CORS
app.use(cors())

// Mongoose Connection
mongoose.connect(process.env.ATLAS_URI)
mongoose.connection.once('open', ()=> {
    console.log('connected to mongoDB')
})

// Mock data
// const fruits = ["apple", "banana", "pear"]

// Routes
app.get('/',(req, res)=>{
    res.send('Welcome to the Fruits API!')
})

// seed route
app.get('/fruits/seed', async (req, res)=>{
    try {
        await Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ])
        res.redirect('/fruits')
    } catch (error) {
        console.error(error)
      }
})
// From our Fruit Routes
app.use('/fruits', Fruits )

// INDUCES

// // GET all fruits- Index
// app.get('/fruits', async (req, res)=>{
//     try{
//         const fruits = await Fruit.find()
//         res.json(fruits)
//     }catch (err) {
//         console.log(err)
//     }
//     // res.send(fruits)
// })

// // New - to be handled by our front end 

// // Delete - Delete one fruit by Id
// app.delete('/fruits/:id', async (req, res)=>{
//     try {
//         await Fruit.findByIdAndDelete(req.params.id)
//         res.redirect('/fruits')//redirect back to fruits index
//     } catch(error) {
//         console.error(error);
//       }
//     })

// // Update - Update an existing fruit by id
// app.put("/fruits/:id", async (req, res) => {
//     try {
//       if (req.body.readyToEat === "on") {
//         //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true; //do some data correction
//       } else {
//         //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false; //do some data correction
//       }
//       // fruits.push(req.body);
//       await Fruit.findByIdAndUpdate(req.params.id, req.body);
  
//       res.redirect("/fruits");
//     } catch (error) {
//       console.log(error);
//     }
//   });

// // Create - POST Create a new fruit 
// app.post('/fruits/', async (req, res) => {
//     try {
//         if (req.body.readyToEat === "on") {
//           //if checked, req.body.readyToEat is set to 'on'
//           req.body.readyToEat = true //do some data correction
//         } else {
//           //if not checked, req.body.readyToEat is undefined
//           req.body.readyToEat = false //do some data correction
//         }
//          await Fruit.create(req.body)
    
//         res.redirect("/fruits")
    
//       } catch(error) {
//         console.log(error)
//       }
// })

// // Edit - to be handled by Frunt end


// //Show - GET one fruit by its ID
// app.get('/fruits/:id', async (req, res) =>{
//     try{
//         const fruit = await Fruit.findById(req.params.id)
//         res.json(fruit)
//     } catch(err) {
//         console.log(err)
//     }
// })

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });

// App.listen
app.listen(port, () =>{
console.log(`Server is running on port ${port}`)
})