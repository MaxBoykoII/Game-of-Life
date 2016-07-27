var express = require('express');
var app = express();

app.use(express.static('./public'));

app.listen(process.env.port || 8080, process.env.IP || '0.0.0.0', function() {
    console.log('Server on...');
});