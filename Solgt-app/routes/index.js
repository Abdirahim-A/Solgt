var express = require('express');
var router = express.Router();
var csv = require("csvtojson");


/* GET home page. */
router.get('/progress', function(req, res) {
  res.json({ address: 'Borettslagbrakkeveien 34A', 
            boligverdi: 4950000, 
            kostnader: [{kostnad: -40000, navn: 'Markedsføring'}, {kostnad: -30000, navn: 'Oppusning'}, {kostnad: -100000, navn: 'Forsikring'}], 
            godtattTilbud: {status: true, month: 'NOV', day: '15', text: 'Fullført'}, 
            avtalBefaring: {status: false, month: 'NOV', day: '18', text: 'Avtal før 20 NOV'}, 
            befaringrapport: {status: false, month: 'NOV', day: '23', text: 'Tilgjengelig etter befaring'},
            closing: {status: false, month: 'NOV', day: '30', text: 'Closing innen 15 dager'}});
});

router.get('/boliger', function(req, res) {
  csv()
  .fromFile(__dirname + "/Datasett-boliger.csv")
  .then(function(jsonArrayObj){
    res.json(jsonArrayObj); 
   })
});

module.exports = router;
