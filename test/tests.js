#!/usr/bin/env node

'use strict';


const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const mlog = require('mocha-logger');
const util = require('util');

const AsyncFunction = require('../AsyncFunction').AsyncFunction;
const Reply = require('../Reply').Reply;


describe('AsyncFunction', () => {

	it('is async function class', () => {
		expect(async function () {}).to.be.instanceof(AsyncFunction);
	});

});

describe('Reply', () => {

	describe('static', () => {

		it('Reply is a function', (done) => {
			expect(Reply).to.be.an.instanceof(Function);
			done();
		});

		it('Reply.init is a function', (done) => {
			expect(Reply.init).to.be.an.instanceof(Function);
			done();
		});

		it('Reply.init creates instanceof Reply', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = [];
			let dependencies_1 = 'some Reply';
			let dependencies_2 = ['some Reply 1', 'some Reply 2'];
			let match = async function (request) { return 1; };
			let match_1 = function (request) { return 1; };
			let match_2 = [];
			let match_3 = /.*/ig;
			let match_4 = '';
			let match_5 = {};
			let action = async function (x) { return 'abc' + x; };

			expect(Reply.init(name, service, dependencies, match, action)).to.be.an.instanceof(Reply);
			expect(Reply.init(name, service, dependencies_1, match, action)).to.be.an.instanceof(Reply);
			expect(Reply.init(name, service, dependencies_2, match, action)).to.be.an.instanceof(Reply);
			expect(Reply.init(name, service, dependencies, match_1, action)).to.be.an.instanceof(Reply);
			expect(Reply.init(name, service, dependencies, match_2, action)).to.be.an.instanceof(Reply);
			expect(Reply.init(name, service, dependencies, match_3, action)).to.be.an.instanceof(Reply);
			expect(Reply.init(name, service, dependencies, match_4, action)).to.be.an.instanceof(Reply);
			expect(Reply.init(name, service, dependencies, match_5, action)).to.be.an.instanceof(Reply);
			done();
		});

		it('Reply.init don`t creates instanceof Reply with wrong name', (done) => {
			let name = 1;
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };

			expect(() => Reply.init(name, service, dependencies, match, action)).to.throw();
			done();
		});

		it('Reply.init don`t creates instanceof Reply with wrong service', (done) => {
			let name = 'name';
			let service = [];
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };

			expect(() => Reply.init(name, service, dependencies, match, action)).to.throw();
			done();
		});

		it('Reply.init don`t creates instanceof Reply with wrong dependencies', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = 123;
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };

			expect(() => Reply.init(name, service, dependencies, match, action)).to.throw();
			done();
		});

		it('Reply.init don`t creates instanceof Reply with wrong match', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = 1;
			let action = async function (x) { return 'abc' + x; };

			expect(() => Reply.init(name, service, dependencies, match, action)).to.throw();
			done();
		});

		it('Reply.init don`t creates instanceof Reply with wrong action', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = {};

			expect(() => Reply.init(name, service, dependencies, match, action)).to.throw();
			done();
		});

	});
	
	describe('instance', () => {

		it('Reply creates instanceof Reply', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };

			expect(new Reply(name, service, dependencies, match, action)).to.be.an.instanceof(Reply);
			done();
		});

		it('Reply.name get', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };

			expect(Reply.init(name, service, dependencies, match, action).name).to.be.equal(name);
			done();
		});

		it('Reply.service get', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };

			expect(Reply.init(name, service, dependencies, match, action).service).to.be.equal(service);
			done();
		});

		it('Reply.dependencies get', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };

			expect(Reply.init(name, service, dependencies, match, action).dependencies).to.have.members(dependencies);
			done();
		});

		it('Reply.match get', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };

			expect(Reply.init(name, service, dependencies, match, action).match).to.be.equal(match);
			done();
		});

		it('Reply.action get', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };

			expect(Reply.init(name, service, dependencies, match, action).action).to.be.equal(action);
			done();
		});

		it('Reply.name don`t set', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let name_new = 'name_new';

			expect(() => a.name = name_new).to.throw();
			done();
		});

		it('Reply.service don`t set', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let service_new = 'service_new';

			expect(() => a.service = service_new).to.throw();
			done();
		});

		it('Reply.dependencies don`t set', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let dependencies_new = ['dependency new 4', 'dependency new 5'];

			expect(() => a.dependencies = dependencies_new).to.throw();
			done();
		});

		it('Reply.match don`t set', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let match_new = async function (request) { return 0.5; };

			expect(() => a.match = match_new).to.throw();
			done();
		});

		it('Reply.action don`t set', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let action_new = async function () {};

			expect(() => a.action = action_new).to.throw();
			done();
		});

		it('Reply.apply exec', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x, y) { return x + y; };
			let a = Reply.init(name, service, dependencies, match, action);

			expect(a.apply).to.be.an.instanceof(Function);
			expect(a.apply([13, 31])).to.eventually.equal(13 + 31).notify(done);
			//a.apply([13, 31]).should.eventually.equal(44).notify(done);
		});

		it('Reply.apply exec with throw', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x, y) { throw new Error('Reply.apply'); };
			let a = Reply.init(name, service, dependencies, match, action);

			expect(a.apply([13, 31])).to.be.rejectedWith('Reply.apply').notify(done);
		});

		it('Reply.call exec', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x, y) { return x + y; };
			let a = Reply.init(name, service, dependencies, match, action);

			expect(a.call).to.be.an.instanceof(Function);
			expect(a.call(13, 31)).to.eventually.equal(13 + 31).notify(done);
			//a.call(13, 31).should.eventually.equal(44).notify(done);
		});

		it('Reply.call exec with throw', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x, y) { throw new Error('Reply.call'); };
			let a = Reply.init(name, service, dependencies, match, action);

			expect(a.apply(13, 31)).to.be.rejectedWith('Reply.call').notify(done);
		});

		it('Reply.clone creates copy of instanceof Reply', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);

			expect(a.clone).to.be.an.instanceof(Function);
			let a_copy = a.clone();
			expect(a_copy._name).to.be.equal(a._name);
			expect(a_copy._service).to.be.equal(a._service);
			expect(a_copy._dependencies).to.have.members(a._dependencies);
			expect(a_copy._match).to.be.equal(a._match);
			expect(a_copy._action).to.be.equal(a._action);
			done();
		});

		it('Reply.clone creates copy of instanceof Reply with overwriting name', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let name_copy = 'name_copy';
			let a_copy = a.clone({ name: name_copy });

			expect(a_copy._name).to.be.equal(name_copy);
			expect(a_copy._service).to.be.equal(a._service);
			expect(a_copy._dependencies).to.have.members(a._dependencies);
			expect(a_copy._match).to.be.equal(a._match);
			expect(a_copy._action).to.be.equal(a._action);
			done();
		});

		it('Reply.clone creates copy of instanceof Reply with overwriting service', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let service_copy = 'service_copy';
			let a_copy = a.clone({ service: service_copy });

			expect(a_copy._name).to.be.equal(a._name);
			expect(a_copy._service).to.be.equal(service_copy);
			expect(a_copy._dependencies).to.have.members(a._dependencies);
			expect(a_copy._match).to.be.equal(a._match);
			expect(a_copy._action).to.be.equal(a._action);
			done();
		});

		it('Reply.clone creates copy of instanceof Reply with overwriting dependencies', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let dependencies_copy = ['dependency new 4', 'dependency new 5'];
			let a_copy = a.clone({ dependencies: dependencies_copy });

			expect(a_copy._name).to.be.equal(a._name);
			expect(a_copy._service).to.be.equal(a._service);
			expect(a_copy._dependencies).to.have.members(dependencies_copy);
			expect(a_copy._match).to.be.equal(a._match);
			expect(a_copy._action).to.be.equal(a._action);
			done();
		});

		it('Reply.clone creates copy of instanceof Reply with overwriting match', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let match_copy = async function (request) { return 0.5; };
			let a_copy = a.clone({ match: match_copy });

			expect(a_copy._name).to.be.equal(a._name);
			expect(a_copy._service).to.be.equal(a._service);
			expect(a_copy._dependencies).to.have.members(a._dependencies);
			expect(a_copy._match).to.be.equal(match_copy);
			expect(a_copy._action).to.be.equal(a._action);
			done();
		});

		it('Reply.clone creates copy of instanceof Reply with overwriting action', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (request) { return 1; };
			let action = async function (x) { return 'abc' + x; };
			let a = Reply.init(name, service, dependencies, match, action);
			let action_copy = async function (x, y) { return 'abc' + x + y; };
			let a_copy = a.clone({ action: action_copy });

			expect(a_copy._name).to.be.equal(a._name);
			expect(a_copy._service).to.be.equal(a._service);
			expect(a_copy._dependencies).to.have.members(a._dependencies);
			expect(a_copy._match).to.be.equal(a._match);
			expect(a_copy._action).to.be.equal(action_copy);
			done();
		});

		it('Reply.match_apply exec', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (x, y) { return x + y; };
			let action = async function (x, y, z) { return x + y + z; };
			let a = Reply.init(name, service, dependencies, match, action);

			expect(a.match_apply).to.be.an.instanceof(Function);
			expect(a.match_apply([13, 31])).to.eventually.equal(13 + 31).notify(done);
			//a.match_apply([13, 31]).should.eventually.equal(44).notify(done);
		});

		it('Reply.match_apply exec with throw', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (x, y) { throw new Error('Reply.match_apply'); };
			let action = async function (x, y, z) { return x + y + z; };
			let a = Reply.init(name, service, dependencies, match, action);

			expect(a.match_apply([13, 31])).to.be.rejectedWith('Reply.match_apply').notify(done);
		});

		it('Reply.match_call exec', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (x, y) { return x + y; };
			let action = async function (x, y, z) { return x + y + z; };
			let a = Reply.init(name, service, dependencies, match, action);

			expect(a.match_call).to.be.an.instanceof(Function);
			expect(a.match_call(13, 31)).to.eventually.equal(13 + 31).notify(done);
			//a.match_call(13, 31).should.eventually.equal(44).notify(done);
		});

		it('Reply.match_call exec with throw', (done) => {
			let name = 'name';
			let service = 'service';
			let dependencies = ['dependency 1', 'dependency 2', 'dependency 3'];
			let match = async function (x, y) { throw new Error('Reply.match_call'); };
			let action = async function (x, y, z) { return x + y + z; };
			let a = Reply.init(name, service, dependencies, match, action);

			expect(a.match_call(13, 31)).to.be.rejectedWith('Reply.match_call').notify(done);
		});

	});

});
