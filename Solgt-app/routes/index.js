var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/progress', function(req, res, next) {
  res.json({ address: 'Borettslagbrakkeveien 34A', 
            boligverdi: 4950000, 
            kostnader: [{kostnad: -40000, navn: 'markedsføring'}, {kostnad: -30000, navn: 'oppusning'}, {kostnad: -100000, navn: 'forsikring'}], 
            godtattTilbud: {status: true, month: 'NOV', day: '15', text: 'Fullført'}, 
            avtalBefaring: {status: false, month: 'NOV', day: '18', text: 'Avtal før 20 NOV'}, 
            befaringrapport: {status: false, month: 'NOV', day: '23', text: 'Tilgjengelig etter befaring'},
            closing: {status: false, month: 'NOV', day: '30', text: 'Closing innen 15 dager'}});
});

module.exports = router;
