const express = require('express');
require("../src/db/conn");

const usrmod = require('./models/register')
const model = require('./models/schm')

const jwt = require('jsonwebtoken')
const auth = require('./verify/auth')

const cookieParser = require("cookie-parser")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.post('/api/todos', async (req, res) => {
    try {
        const add = new model(req.body)
        console.log(req.body);
        const result = await add.save();
        res.status(201).send(result)
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
})


app.get('/api/todos',auth, async (req, res) => {
    try {
        const findd = await model.find({});
        res.status(201).send(findd);
    }
    catch (e) {
        res.status(400).send(e);
    }
})


app.get('/api/todos/:id',auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const findid = await model.findById({ _id });//return promise
        res.status(201).send(findid);
    }
    catch (e) {
        res.status(400).send(e);
    }
})


app.put('/api/todos/:id',auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const findid = await model.findByIdAndUpdate(_id, req.body);
        res.status(201).send(findid);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
})

app.delete('/api/todos/:id',auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const findid = await model.findByIdAndDelete(_id, req.body);
        res.status(201).send(findid);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        else {
            const newUsr = new usrmod({ name, email, password })

            const token = await newUsr.generateAuthToken();
            
            res.cookie('token',token,{
                expires:new Date(Date.now()+120000),
                httpOnly:true  //to prevent access from client side
            })
            
            await newUsr.save()
            res.send(newUsr)
        }
    }
    catch (e) {
        res.status(401).send(e)
    }
})


app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const usrdata = await usrmod.findOne({ email: email, password: password })
        const token = await usrdata.generateAuthToken(); 
        
        res.cookie('token',token,{
            expires:new Date(Date.now()+60000),
            httpOnly:true
        })
        
        if (usrdata.email == email && usrdata.password == password) {
            res.status(201).send(usrdata)
        }
        else {
            res.send("invalid data");
        }

    }

    catch (e) {
        res.send(e)
    }
})

// const security = async(password) =>{
//     const passhash = await bcrypt.hash(password,10)
//     console.log(passhash)
// }
// security("abc123")



app.listen(port, () => {
    console.log("started")
})