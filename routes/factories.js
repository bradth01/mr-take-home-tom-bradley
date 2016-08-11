var express = require('express');
var factoryStore = require('json-fs-store')('store/companies');
var router = express.Router();

/* GET a list of factories */
router.get('/', function(req, res, next) {
    factoryStore.list(function(err, factories) {
        if (err) throw err;

        factories = factories.filter(function(object) {
            return object.company_type === 'factory';
        });

        res.json(factories);
    });
});
router.get('/:id', function(req, res, next) {
    factoryStore.load(req.params.id, function(err, factory) {
        if (err) throw err;

        res.json(factory);
    });
});
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    var newFactory = {
        id: req.body.id,
        //id is optional for testing
        company_type: 'factory',
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        city: req.body.city,
        state: req.body.state
    };
    factoryStore.add(newFactory, function(err) {
        if (err) throw err;

        res.json(newFactory);
    });
});
router.delete('/:id', function(req, res, next) {
    factoryStore.remove(req.params.id, function(err) {
        if (err) throw err;

        res.sendStatus(204);
    });
});


module.exports = router;
