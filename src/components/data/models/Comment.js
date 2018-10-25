/**
 * Class Comment
 * @package models
 * @property Node $parent
 */
import Model from "./Model";
import Tag from "./Tag";

export default class Comment extends Model{
	constructor(data, parent) {
		super(data, parent);

		this.fill(data);

		if (data.tags) {
            data.tags.forEach((tag) => {
				this.tags.push(new Tag(tag, this));
			});
		}
	}

	/**
	 * @type Tag[]
	 */
	tags = [];
	/**
	 * @type string
	 */
	shortText = '';

	/**
	 * @type string
	 */
	text = '';

	/**
	 * @type string
	 */
	returns = '';

	toString() {
		return this.text + this.shortText || (this.parent.signatures[0] ? this.parent.signatures[0].comment.toString() : '');
	}

}