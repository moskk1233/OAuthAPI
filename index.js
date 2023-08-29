const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;



app.get("/", (req, res) => {

    res.send('<a href="/auth/google">Authentication With Google </a>')
});

app.get('')

app.listen(PORT, () => {
    console.log(`Listen to port ${PORT}`)
});