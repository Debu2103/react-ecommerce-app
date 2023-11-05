const express = require("express")

const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const { default: Stripe } = require("stripe")
require("dotenv").config()


const port = process.env.PORT
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.get("/", (req, res) => {
    res.send("Hello")
})

app.post("/pay", async (req, res) => {
    console.log(req.body.token)

    await Stripe.ChargesResource.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "inr",
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})