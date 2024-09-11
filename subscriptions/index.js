const express = require('express')
const app = express();
const axios = require('axios');

app.use(express.json());

const PORT = 8000 
let seerbitPublicKey = "SBTESTPUBK_y9xF4issbbpKaMEnP5Fv4y0u75523ko2";
const Encrypted_Token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXlAbWFpbGluYXRvci5jb20iLCJjcmVhdGVkIjoxNzI2MDQ1NDY2ODI4LCJleHAiOjE3MjYwNjcwNjZ9.GH2YzetCDctg9Pw659_3noAxQQDVGsU_d2Wy2lvpQKQ"

const CreateSubscription =async (req, res)=>{
try {
    const {productId, productDescription, amount, billingCycle, country, currency, limit} = req.body;
const response = await axios.post('https://merchants.seerbitapi.com/api/v1/recurrent/plan/create',{
    
        productId,
        productDescription,
        amount,
        billingCycle,
        limit,
        allowPartialDebit: false,
      publicKey: seerbitPublicKey, 
    country,
    currency, 
},
{
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Encrypted_Token}`
        }
}
)
res.status(response.status).json(response.data);
} catch (error) {
    console.error(`Internal Server Error: ${error.message}`);
    res.status(500).json(`Internal Server Error: ${error}`)
}
}


app.post('/subscribe', CreateSubscription);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})