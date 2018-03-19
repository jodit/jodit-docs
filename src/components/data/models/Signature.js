import Node from "./Node";
/**
 * Class Signature
 *
 * @package models
 */

/**
 *
 */
export default class Signature extends Node {

	constructor(data, parent){
		super(data, parent);

		this.fill(data);

        Object.keys(data).forEach((property) => {
        	let value = data[property];

            property === 'parameters' &&
                    Object.keys(value).forEach((key) => {
                        let node = value[key];
                    	this.parameters.push(new Node(node, this));
					});

        });
	}
	/**
	 * @type Node[]
	 */
	parameters = [];

	__toString(playntext = false) {
		return [(this.parent.flags.isStatic ? 'static ' : ''),
			this.name, '(',
				this.parameters.map((param, index) => {
					return [index ? ', ' : '', param.name, ': ', param.type.toString(playntext)];
				}),
			'): ', this.type.toString(playntext)];
	}

    toString() {
        return this.__toString();
    }


    toCode() {
        const code = this.__toString(true);

        const map = (code) => {
        	return Array.isArray(code) ? code.map(map).join('') : code;
		};

		return map(code);
	}
}