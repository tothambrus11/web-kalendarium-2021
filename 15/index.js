const express = require('express')
const app = express()
const port = 3000

const BANKNOTES = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];

const items = [
    {
        id: 0,
        name: "Narancsos cukorka",
        price: 10000
    },
    {
        id: 1,
        name: 'Epres cukorka',
        price: 12000,
    },
    {
        id: 2,
        name: 'Sárga fogbarom',
        price: 4000,
    },
    {
        id: 3,
        name: 'Csillámpóni cukorka',
        price: 16900,
    },
    {
        id: 4,
        name: "Ilyen izéé...",
        price: 20000,
    },
    {
        id: 5,
        name: "Görögdinnyés cukorka",
        price: 17000
    }
];

app.get('/items', (req, res) => {
    res.json(items);
})

app.get('/items/order/:itemId/:quantity/:money', (req, res) => {
    const {itemId, quantity, money} = req.params;
    if (isNaN(itemId) ||
        isNaN(quantity) ||
        isNaN(money) ||
        quantity <= 0 ||
        Math.round(quantity) !== +quantity ||
        money <= 0 ||
        itemId < 0 ||
        itemId >= items.length) {
        res.sendStatus(400); // Bad request
        return;
    }

    const total = items[itemId].price * quantity;
    if (total > money) { // not enough money given
        res.statusCode=400;
        res.contentType("text/plain");
        res.send('Not enough money')
        return;
    }

    let change = money - total;

    let changeBanknotes = {};
    for (let i = BANKNOTES.length - 1; i >= 0; i--) {
        let numberOfCurrentBanknote = Math.floor(change / BANKNOTES[i]);
        if (numberOfCurrentBanknote > 0) {
            change -= numberOfCurrentBanknote * BANKNOTES[i];
            changeBanknotes[BANKNOTES[i]] = numberOfCurrentBanknote;
        }
    }

    res.json({
        total,
        changeBanknotes
    });
})
app.set('json spaces', 2)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
