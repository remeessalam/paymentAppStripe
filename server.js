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

app.post('/purchase', function (req, res) {
    console.log(req.body, 'req body ');
    fs.readFile('items.json', function (err, data) {
        if (err) {
            res.status(500).end();
        } else {
            const jsonItems = JSON.parse(data);
            const itemsArray = jsonItems.music.concat(jsonItems.merch)
            let total = 0;
            req.body.items.forEach(function (item) {
                const jsonItems = itemsArray.find(function (i) {
                    return i.id == item.id
                })
                total = total + jsonItems.price + item.quantity
            })

            stripe.charges.create({
                amount: total,
                source: req.body.stripeTokenId,
                currency: 'usd'
              }).then(function() {
                console.log('Charge Successful')
                res.json({ message: 'Successfully purchased items' })
              }).catch(function() {
                console.log('Charge Fail')
                res.status(500).end()
              })
        }
    })
})



const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`port is running in  ${port}`)
})




