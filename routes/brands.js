var express = require('express');
var factoryStore = require('json-fs-store')('store/companies');
var router = express.Router();

router.get('/', function(req, res, next) {
    factoryStore.list(function(err, brands) {
        if (err) throw err;

        brands = brands.filter(function(object) {
            return object.company_type === 'brand';
        });

        res.json(brands);
    });
});
router.get('/:id', function(req, res, next) {
    factoryStore.load(req.params.id, function(err, brand) {
        if (err) throw err;

        res.json(brand);
    });
});
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    var newBrand = {
        id: req.body.id,
        //id is optional for testing
        company_type: 'brand',
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        city: req.body.city,
        state: req.body.state
    };

    factoryStore.add(newBrand, function(err) {
        if (err) throw err;

        res.json(newBrand);
    });
});
router.delete('/:id', function(req, res, next) {
    factoryStore.remove(req.params.id, function(err) {
        if (err) throw err;

        res.sendStatus(204);
    });
});

module.exports = router;
