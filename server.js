const env = require('dotenv').config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const express = require('express');
const app = express();
const fs = require('fs');
var path = require('path');
const stripe = require('stripe')(stripeSecretKey);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));


app.get('/store', function (req, res) {
    fs.readFile('items.json', function (err, data) {
        if (err) {
            res.status(500).end();
        } else {
            res.render('store.ejs', {
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data)
            })
        }
    })
})



const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`port is running in  ${port}`)
})




STRIPE_SECRET_KEY=sk_test_51MqqBISEozpIfwKXRIcH6x4NKbmkzIl4hY7DHOmS9pqM8ZAfqDb85yU0LAOAsbbnYZvHcksvso8iCTpmfINqAJB300ZLi8OVQI
STRIPE_PUBLIC_KEY=pk_test_51MqqBISEozpIfwKXXagbBuYQLD0NWZETF3D2M4w13LJ5PPs4UVeDPO9BpUQghIaWWObVAcdEWhM8QbAeHZ5ovE7k00ciGmFkL8
PORT=3000