import Model from "./Model";

export default class Tag extends Model {
    constructor(data, parent) {
        super(data, parent);
        this.fill(data);
    }
	/**
	 * @type string
	 */
	tag = '';

	/**
	 * @type string
	 */
	text = '';

	/**
	 * @type string
	 */
	param = '';
}