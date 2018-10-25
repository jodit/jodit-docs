import Model from "./Model";

export default class Flag extends Model {
	constructor(data, parent) {
		super(data, parent);
        this.fill(data);
	}
    /**
     * @type bool
     */
    isPrivate = false;

	/**
	 * @type bool
	 */
	isExported = false;

	/*
	 * @type bool
	 */
	isStatic = false;

    /**
     * @type bool
     */
	isOptional = false;

	/**
	 * @type bool
	 */
	isRest = false;

	/**
	 * @type bool
	 */
	isPublic = false;
}