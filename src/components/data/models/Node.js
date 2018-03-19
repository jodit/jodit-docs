import React from 'react';
import {Link} from "react-router-dom";
import Comment from "./Comment";
import Source from "./Source";
import Model, {is_scalar} from "./Model";
import Flag from "./Flag";


export default class Node extends Model{
	/**
	 * @type Node[]
	 */
	static links = [];
	static excludeList = ['appVersion', 'class2type', 'toString', 'hasOwn', 'require', 'requireAll'];

    constructor(data, parent){
        super(data, parent);

        this.fill(data);

        if (data.type !== 'reference') {
            Node.links[this.id] = this;
        }

        Object.keys(data).forEach((property) => {
            let value =  data[property];
            switch (property) {
                case 'comment':
                    this.comment = new Comment(value, this);
                    break;
                case 'type':
                    if (!is_scalar(value)) {
                        this.type = new (require('./NodeType').default)(value, this);
                    }
                    break;
                case 'flags':
                    this.flags = new Flag(value, this);
                    break;
                case 'sources':
                    Object.keys(value).forEach((key) => {
                        this.sources.push(new Source(value[key], this));
                    });
                    break;
                case 'children':
                    Object.keys(value).forEach((key) => {
                        if (Node.excludeList.indexOf(value[key].name) !== -1) {
                            return;
                        }
                        if (value[key].kindString) {
                        	this.children.push(new Node(value[key], this));
                        }
                    });
                    break;
                case 'signatures':
                    Object.keys(value).forEach((key) => {
                        this.signatures.push(new (require('./Signature').default)(value[key], this));
                    });
                    break;
                case 'extendedTypes':
                    Object.keys(value).forEach((key) => {
                        this.extendedTypes.push(new (require('./NodeType').default)(value[key], this));
                    });
                    break;
                case 'inheritedFrom':
                case 'overwrites':
                    this[property] = new (require('./NodeType').default)(value, this);
                    break;
                case 'indexSignature':
                	this[property].push(new (require('./Signature').default)(value, this));
                    break;
                default:
                    break;
            }
        });
    }

	getID() {
        // let parts = [];
        //
        // let node = this;
        // let last = '';
        //
        // do {
			// if (last !== node.name) {
			// 	last = node.name;
        //         parts.unshift(node.name.replace(/[^\w]/g, '-').toLowerCase());
			// }
			// node = node.parent;
        // } while(node);
        //
        // parts.shift();

		return '/types/' + this.name.replace(/[^\w]/g, '-') + '/';
	}

	getAnchor(plaintext = false) {
		return !plaintext ? <Link to={this.getID()}>{this.name}</Link> : this.name;//'<a href="' + this.getID() + '">' + this.name + '</a>';
	}

	/**
	 * @type string
	 */
	kindString = '';
	/**
	 * @type string
	 */
	name = '';

	/**
     * @type int
     */
	id = 0;

    /**
     * @type Node[]
     */
	children = [];

	/**
	 *@type Flag
	 */
	flags;

	/**
	 * @type Signature[]
	 */
	signatures = [];

	/**
	 * @type Comment
	 */
	comment;

	/**
	 * @type Source[]
	 */
	sources = [];

	/**
	 * @type NodeType[]
	 */
	extendedTypes = [];
	/**
	 * @type NodeType
	 */
	type;

	/**
	 * @type string|number
	 */
	defaultValue;

	/**
	 * @type object
	 */
	groups = [];

	/**
	 * @type int
	 */
	kind = 0;

	/**
	 * @type string
	 */
	originalName = '';

	/**
	 * @type NodeType
	 */
	overwrites;

	/**
	 * @type NodeType
	 */
	inheritedFrom;

	extendedBy;

	/**
	 * @type Signature[]
	 */
	indexSignature = [];
}