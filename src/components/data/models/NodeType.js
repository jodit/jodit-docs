/**
 * Class Type
 * @property Node $parent
 * @package models
 */
import Node from "./Node";
import Model from "./Model";

export const empty = (value) => {
	return value === '' || value === null || value === undefined;
};
/**
 *
 * @param {string} value
 * @return {string}
 */
export const ucfirst = (value) => {
	return value
		.substr(0, 1)
		.toUpperCase() + value.substr(1);
};

export default class NodeType extends Node{
    /**
	 *
     * @param {object} data
     * @param {Node} parent
     */
	constructor(data, parent) {
		super(data, parent);
        this.fill(data);

		Object.keys(data).forEach((property) => {
			let value = data[property];
            switch (property) {
                case 'declaration':
                    this[property] = new (require('./Declaration').default)(value, this);
                    break;
                case 'elementType':
                    this[property] = new NodeType(value, this);
                    break;
                case 'types':
                case 'typeArguments':
                    Object.keys(value).forEach((key) => {
                    	this[property].push(new NodeType(value[key], this));
                	});
                    break;
				default:
					return;
            }
		})
	}

	/**
	 * @type string
	 */
	type = '';
	/**
	 * @type NodeType[]
	 */
	typeArguments = [];
	/**
	 * @type NodeType[]
	 */
	types = [];


	/**
	 * @type string|int
	 */
	value = '';

	/**
	 * @type Declaration
	 */
	declaration;

	/**
	 * @type NodeType
	 */
	elementType;

    /**
	 *
     * @param {string[]|Model[]} types
     * @param {boolean} [plaintext=false]
     * @return {string}
     */
	printTypes(types, plaintext = false) {
		let union = [];
        types.forEach((type) => {
            union.push(type instanceof Model  ? type.toString(plaintext) : type);
            union.push('|');
		});
        union.length = union.length - 1;

		return union;
	}

	toString(plaintext = false) {
		if (this.name || this.type) {
			let name = this.name || this.type;
			switch (name.toLowerCase()) {
				case '__type':
					if (this.parent.inheritedFrom) {
						return this.parent.inheritedFrom.toString(plaintext);
					}
					break;
				case 'reflection':
					if (this.declaration) {
						return  this.declaration.toString(plaintext);
					}
					break;
				case 'stringliteral':
					return this.printValue(this.value, plaintext);
				case 'union':
					return this.printTypes(this.types, plaintext);
				case 'array':
					if (this.typeArguments[0] && this.typeArguments[0].types) {
						return [ucfirst(name), '<', this.printTypes(this.typeArguments[0].types, plaintext), '>'];
					}
					if (this.elementType) {
						return [ucfirst(name), '<',  this.elementType.toString(plaintext), '>'];
					}
					break;
                default:
                    break;
			}
            return (!this.id || empty(Node.links[this.id])) ? name : Node.links[this.id].getAnchor(plaintext);
		}
		if (this.types) {
			return this.printTypes(this.types, plaintext);
		}
		if (this.value) {
			return this.printValue(this.value, plaintext) ;
		}
	}
}