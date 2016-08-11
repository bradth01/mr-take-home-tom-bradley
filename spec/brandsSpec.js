'use strict';

var request = require('supertest');

describe('Brands', function() {
    var app;
    beforeEach(function() {
        app = require('../app.js');
    });
    afterEach(function() {
        app.close();
    });
    it('gets all brands', function(done) {
        request(app)
            .get('/brands')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.length).toBeGreaterThan(0);
                done(res);
            });
    });
    it('gets a single factory', function (done) {
        request(app)
            .get('/brands/b94cb828-ea74-4ccc-ac04-14a432c9fcac')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body).not.toBeNull();
                done(res);
            });
    });
    it('creates a new brand with the correct fields', function (done) {
        request(app)
            .post('/brands')
            .send({ 
                // id is only for testing delete method
                id: '1234',
                company_type: 'brand',
                name: 'Test Brand',
                email: 'test@brand.com',
                phone_number: '(222) 222-2222',
                city: 'New York',
                state: 'NY'
            })
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.company_type).toEqual('brand');
                expect(res.body.name).toEqual('Test Brand');
                expect(res.body.email).toEqual('test@brand.com');
                expect(res.body.phone_number).toEqual('(222) 222-2222');
                expect(res.body.city).toEqual('New York');
                expect(res.body.state).toEqual('NY');
                done(res);
            });
    });
    it('deletes a brand by id', function(done) {
        request(app)
            .delete('/brands/1234')
            .expect(204)
            .end(function(err, res) {
                if (err) return done.fail(res);
                done(res);
            });
    });
});