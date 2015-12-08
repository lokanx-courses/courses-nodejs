/*jslint node:true */
/*global it,expect,describe,request */
var main = require('../main.js');

describe('my test suite', function () {
    it("should respond with Hello World", function (done) {
        main.request("http://127.0.0.1:3000/", function (body) {
            console.log(body);
            expect(body).toEqual("Hello World");
            done();
        });
    }, 250);
});
