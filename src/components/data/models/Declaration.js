/**
 * Class Declaration
 * @package models
 * @property Type[] $children
 */
import NodeType from "./NodeType";

export default class Declaration extends NodeType{
	getPrefix() {
		let prefix = '';
        let node = this;

		do {
			node = node.parent;
			if (node instanceof Declaration) {
				prefix += '  ';
			}
		} while(node);

		return prefix;
	}
	toString(plaintext = false) {
		let prefix = this.getPrefix();

		if (this.signatures[0] !== undefined) {
			return this.signatures[0].toString(plaintext);
		}

		if (this.children[0] !== undefined) {
			let result = [];

			result.push('{\n');

			this.children.forEach((type) => {
				result.push([prefix, '  ', type.name, (type.flags.isOptional ? '?' : ''), ': ', type.type.toString(plaintext), '\n']);
			});

			result.push(prefix + '}');

			return result;
		}

		if (this.indexSignature[0] !== undefined) {
			return this.indexSignature[0].toString(plaintext);
		}

		return 'unknown';
	}
}