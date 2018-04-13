#!/usr/bin/env node

'use strict';


const AsyncFunction = require('zanner-cms-asyncfunction').AsyncFunction;
const GeneratorFunction = require('zanner-cms-generatorfunction').GeneratorFunction;


class Reply {

	static init (...args) {
		return Object.freeze(new Reply(...args));
	}


	get action () {
		return this._action;
	}

	get dependencies () {
		return [].concat(this._dependencies);
	}

	get match () {
		return this._match;
	}

	get name () {
		return this._name;
	}

	get service () {
		return this._service;
	}


	set action (action) {
		if (action instanceof AsyncFunction) {
			this._action = action;
			return this;
		}
		if (action instanceof GeneratorFunction) {
			this._action = async function (...args) { return [...action(...args)]; };
			return this;
		}
		if (action instanceof Function) {
			this._action = async function (...args) { return action(...args); };
			return this;
		}
		throw new Error('Reply.action set with wrong type');
	}

	set dependencies (dependencies) {
		this._dependencies = [].concat(dependencies).map(dependency => {
			if (String(dependency)!==dependency) throw new Error('Reply.dependencies set with wrong type');
			if (dependency.trim().length<1) throw new Error('Reply.dependencies set with wrong length');
			return dependency;
		});
		return this;
	}

	set match (match) {
		if (match instanceof AsyncFunction) {
			this._match = match;
			return this;
		}
		if (match instanceof Function) {
			this._match = async function (...args) { return match(...args); };
			return this;
		}
		if (match instanceof Array) {
			this._match = async function (...args) {
				//TODO
			};
			throw new Error('TODO: Reply.match set with Array');
			return this;
		}
		if (match instanceof RegExp) {
			this._match = async function (...args) {
				//TODO
			};
			throw new Error('TODO: Reply.match set with RegExp');
			return this;
		}
		if ((match instanceof String) || (typeof match==='string')) {
			this._match = async function (...args) {
				//TODO
			};
			throw new Error('TODO: Reply.match set with String');
			return this;
		}
		if ((match instanceof Object) || (typeof match==='object')) {
			this._match = async function (...args) {
				//TODO
			};
			throw new Error('TODO: Reply.match set with Object');
			return this;
		}
		throw new Error('Reply.match set with wrong type');
	}

	set name (name) {
		if (String(name)!==name) throw new Error('Reply.name set with wrong type');
		if (name.trim().length<1) throw new Error('Reply.name set with wrong length');
		this._name = name;
		return this;
	}

	set service (service) {
		if (String(service)!==service) throw new Error('Reply.service set with wrong type');
		if (service.trim().length<1) throw new Error('Reply.service set with wrong length');
		this._service = service;
		return this;
	}
	

	apply (args) {
		let A = [].concat(args);
		return this._action(...A);
	}

	call (...args) {
		return this._action(...args);
	}

	clone (cloneOverwrite) {
		let p = cloneOverwrite || {};
		let name = p.name || this.name;
		let service = p.service || this.service;
		let dependencies = p.dependencies || this.dependencies;
		let match = p.match || this.match;
		let action = p.action || this.action;
		return Reply.init(name, service, dependencies, match, action);
	}

	constructor (name, service, dependencies, match, action) {
		if (arguments.length!=5) {
			throw new Error('Reply creating with wrong arguments count');
		}

		this.name = name;
		this.service = service;
		this.dependencies = dependencies;
		this.match = match;
		this.action = action;
	}

	match_apply (args) {
		let A = [].concat(args);
		return this._match(...A);
	}

	match_call (...args) {
		return this._match(...args);
	}

}

exports.Reply = Reply;
