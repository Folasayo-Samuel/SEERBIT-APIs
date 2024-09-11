const express = require("express")
const app = express();
const axios = require('axios');

require('dotenv').config();

app.use(express.json());

const PORT = 4000 || process.env.PORT
// console.log(`Sehy port too no dey work ni: ${process.env.PORT}`)

// console.log(`ENCRYPTED_KEY: ${process.env.ENCRYPTED_KEY}`);
let seerbitPublicKey = process.env.publicKey
// console.log(`PUBLIC KEY: ${seerbitPublicKey}`);

const InvoiceItems = async (req, res) => {
 try {
    const { orderNo, dueDate, currency, receiversName, customerEmail, invoiceItems} = req.body

    const response = await axios.post('https://seerbitapi.com/invoice/create',{
        publicKey: seerbitPublicKey,
        orderNo,
        dueDate,
        currency,
        receiversName,
        customerEmail,
        invoiceItems
    },
    {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.ENCRYPTED_KEY}`
        }
    }
);

res.status(response.status).json(response.data);
    
 } catch (error) {
    console.error(`Internal Server Error: ${error.message}`)
    res.status(500).json(`Internal Server Error!!! ${error}`)
 }
};

app.post('/invoice', InvoiceItems);

app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
})






