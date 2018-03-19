import Model from "./Model";

export default class Source extends Model {
    constructor(data, parent) {
        super(data, parent);
        this.fill(data);
    }
	/**
	 * @type string
	 */
	fileName = "";

	/**
	 * @type int
	 */
	line = 0;

	/**
	 * @type int
	 */
	character =  0;
}