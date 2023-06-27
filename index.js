const express = require('express')
const generatePdf = require('./generatePdf')

const app = express()

app.use(express.static('public'))


var user = 
    {
        _id: "648ddbbf3c61f7ed8f7ec955",
        leader: "648ddb173c61f7ed8f7ec93f",
        participantOne: "Person 1",
        participantTwo: "Person 2",
        participantThree: "null",
        participantFour: "null",
        participantFive: "null",
        phoneNo: 8000000000,
        email: "dummy@gmail.com",
        eventName: "Coding Wars",
        amount: 200,
        paymentMode: "PaymentMode.online",
        paymentId: "dgsgafwnakfjwofjosfnsofjs",
        date: "2023-06-17 21:43:50.932494",
}


app.get('/', async (req, res) => {
    const url = generatePdf(user)
    console.log(url)
    res.status(200).json({
        success: true
    })
})

app.listen(4000, console.log('Listening to server on port 4000'))