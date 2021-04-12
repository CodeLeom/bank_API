const express = require('express');
const router = express.Router();
const Bank = require('../models/banks')

//get list of banks from the database
router.get('/banks', function(req, res, next){
    // res.send({type: 'GET'});
    Bank.find({}).then(function(bank){
        res.send(bank)
    })
});

//add a new bank to the DB
router.post('/banks', function(req, res, next){
    // var banks = new Bank(req.body);
    // banks.save();
    Bank.create(req.body).then(function(bank){
        res.send(bank);
    }).catch(next);
});


//update the banks in the DB
router.put('/banks/:id', function(req, res, next){
    Bank.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(bank){
        Bank.findOne({_id: req.params.id}).then(function(bank){
            res.send(bank);
        })
    });
});

//delete a bank from the DB
router.delete('/banks/:id', function(req, res, next){
    Bank.findByIdAndRemove({_id: req.params.id}).then(function(bank){
        res.send(bank);
    })
});


module.exports = router;