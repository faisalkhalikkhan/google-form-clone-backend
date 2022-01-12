const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')

const port = process.env.PORT || 5000;
const app = express();
const DATABASE_URL = "mongodb+srv://user123:user123@cluster0.nvohh.mongodb.net/netlink-form?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(session({
    secret: 'keyborad cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.get('/', (req, res) => {
    res.send(`I'm On`);
})

const userRoute = require('./routes/user.route')
app.use('/user', userRoute);

const formRoute = require('./routes/form.route')
app.use('/form', formRoute)

const responsesRoute = require('./routes/responses.route')
app.use('/response', responsesRoute)


mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => console.log(`server activated on port ${port}`))
    }).catch((e) => {
        console.log(e);
    })