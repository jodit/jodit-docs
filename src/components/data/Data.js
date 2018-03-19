import Node from "./models/Node";
import Model from "./models/Model";
import ExtraModel from "./models/ExtraModel";

export class Data {
    static data = null;
    static xData = null;
    static checkInfo(needle, haystack) {
        if (haystack.name !== undefined && haystack.name.replace(/"/g, '') === needle) {
            return Data.findInfo(needle, haystack, (needle, haystack) => {
                if (haystack.shortText && haystack.shortText.replace(/\s/g, '').length) {
                    return haystack.shortText;
                }
            });
        }
    }
    static findInfo(needle, haystack = Data.data, callback = Data.checkInfo) {
        if (!haystack) {
            return;
        }

        const info = callback(needle, haystack);

        if (info) {
            return info;
        }

        if (Array.isArray(haystack) || haystack instanceof Model) {
            let result;

            Object.keys(haystack).filter(key => key !== 'parent').some((key) => {
                result = Data.findInfo(needle, haystack[key], callback);

                if (result) {
                    return true;
                }

                return false;
            });

            return result;
        }
    }

    static loading = false;
    static callbacks = [];
    static load(callback) {

        Data.callbacks.push(callback);

        Data.data || Data.loading || Promise.all([
            fetch(process.env.PUBLIC_URL + '/data.json'),
            fetch(process.env.PUBLIC_URL + '/data-event.json'),
        ])
            .then((data) => {
                return Promise.all(data.map(res => res.json()));
            })
            .then((data)=> {
                Data.data = new Node(data[0], null);
                Data.xData = new ExtraModel(data[1], null);
                Data.callbacks.forEach(call => call());
            })
    }
}