const express = require('express');
const fs = require('fs');
const app = express();

//if(process.env.NODE_ENV=='production') {
    app.use(express.static(__dirname+ '/build'));

    app.get('*', (req, resp)=>{
        resp.sendFile(__dirname + '/build/index.html');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});