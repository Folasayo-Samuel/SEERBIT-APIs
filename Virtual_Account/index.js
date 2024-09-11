const express = require('express')
const app = express();
const axios = require('axios');

app.use(express.json());

const PORT = 8000 
let seerbitPublicKey = "SBTESTPUBK_y9xF4issbbpKaMEnP5Fv4y0u75523ko2";
const Encrypted_Token = "e+V1OSqhPrFxCeDNJgwRV/UiokHKrG8Ug84barqw0+zf8IryKpc54AJuQFoA7sLj9tdFqIFB3uTlAFNMeSIF8iKlv3mtrR459WjkE87lyTweJnGpSfpeyYGMm1gwOJam"

const CreateSubscription =async (req, res)=>{
try {
    const {bankVerificationNumber, country, currency, email, fullName, reference} = req.body;
const response = await axios.post('https://seerbitapi.com/api/v2/virtual-accounts',{
    publicKey: seerbitPublicKey, 
    fullName,
    bankVerificationNumber,
    currency,
    country,
    reference,
    email
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
    console.error(`Internal Server Error: ${error}`);
    res.status(500).json(`Internal Server Error: ${error}`)
}
}


app.post('/create-virtual-account', CreateSubscription);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

