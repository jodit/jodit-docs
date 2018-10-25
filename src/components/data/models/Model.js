export const is_scalar = (value) => {
	return ['number', 'string', 'boolean'].indexOf(typeof value) !== -1
};
export default class Model {
    printValue(value) {
        return value;
    }
	fill(data) {
        Object.keys(data).forEach((property) => {
            const value =  data[property];

            if (is_scalar(value)) {
                this[property] = value.toString().replace(/^[\s]+/, '');
            }
        });
	}
	toString() {
		let values = {};

		Object.keys(this).forEach((property) => {
            let value =  this[property];
            if (property !== 'parent' && (is_scalar(value))) {
                values[property] = value;
            } else {
                values[property] = Array.isArray(value) ? '[]' : value.constructor.toString();
            }
		});

		return JSON.stringify(values);
	}

	parent;

	constructor(data, parent){
		this.parent = parent;

        this.fill(data);
	}
}