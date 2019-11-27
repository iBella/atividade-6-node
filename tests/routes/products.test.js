const expect = require('chai').expect;

const { get, getById, post } = require('../../routes/productsController');

let req = {
    body: {            
        id: 2,
        name: 'Product 2',
        description: 'Product2 description',
        price: 19.00
    },
    params: {},
};

let reqErrorCharacter = {
    body: { 
        id: 1,
        name: 'Product 1',
        description: 'Product1',
        price: 19.00
    }
};

let reqErrorPrice1 = {
    body: {
        id: 1,
        name: 'Product 1',
        description: 'Product1 description',
        price: 0.00
    }
};
let reqErrorPrice2 = {
    body: {
        id: 1,
        name: 'Product 1',
        description: 'Product1 description',
        price: -10.00
    }
};

const res = {
    jsonCalledWith: {},
    json(arg) {
        this.jsonCalledWith = arg
    }
}

describe('Products Route', function() {
    describe('get() function', function() {
        it('should return object with title ', function() {
            get(req, res);
            expect(res.jsonCalledWith).to.be.eql({ title: 'Products page'});
        });

        it('should receive return by id ', function() {
            const getReq = req;
            getReq.params = {
                id: 1
            };

            getById(getReq, res);
            expect(res.jsonCalledWith).to.be.have.key('success')
        });
    }),
    describe('post() function', function() {
        it('should create object', function() {
            post(req, res);
            expect(res.jsonCalledWith).to.be.eql({ success: 'Product created!'});
        });

        it('should not create object - character less than 10', function() {
            post(reqErrorCharacter, res);
            expect(res.jsonCalledWith).to.be.eql({ error: 'Product not created - character!'});
        });

        it('should not create object - price equal 0', function() {
            post(reqErrorPrice1, res);
            expect(res.jsonCalledWith).to.be.eql({ error: 'Product not created - price!'});
        });

        it('should not create object - price less than 0', function() {
            post(reqErrorPrice2, res);
            expect(res.jsonCalledWith).to.be.eql({ error: 'Product not created - price!'});
        });
    })
});