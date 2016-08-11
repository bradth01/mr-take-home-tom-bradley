'use strict';

var request = require('supertest');

describe('Factories', function () {
    var app;
    beforeEach(function () {
        app = require('../app.js');
    });
    afterEach(function () {
        app.close();
    });
    it('gets all factories', function (done) {
        request(app)
            .get('/factories')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.length).toBeGreaterThan(0);
                done(res);
            });
    });
    it('gets a single factory', function (done) {
        request(app)
            .get('/factories/0a75d3f4-c8ff-47bb-84c3-a874007d1b4f')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body).not.toBeNull();
                done(res);
            });
    });
    it('creates a new factory with the correct fields', function (done) {
        request(app)
            .post('/factories')
            .send({ 
                // id is only for testing delete method
                id: '1234',
                company_type: 'factory',
                name: 'Test Factory',
                email: 'test@factory.com',
                phone_number: '(111) 111-1111',
                city: 'New York',
                state: 'NY'
            })
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.company_type).toEqual('factory');
                expect(res.body.name).toEqual('Test Factory');
                expect(res.body.email).toEqual('test@factory.com');
                expect(res.body.phone_number).toEqual('(111) 111-1111');
                expect(res.body.city).toEqual('New York');
                expect(res.body.state).toEqual('NY');
                done(res);
            });
    });
    it('deletes a factory by id', function(done) {
        request(app)
            .delete('/factories/1234')
            .expect(204)
            .end(function(err, res) {
                if (err) return done.fail(res);
                done(res);
            });
    });
});