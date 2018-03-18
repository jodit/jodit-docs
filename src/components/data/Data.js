
export class Data {
    static data = null;
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

        const info = callback(needle, haystack);

        if (info) {
            return info;
        }

        if (typeof haystack === 'object') {
            let result;

            Object.keys(haystack).some((key) => {
                result = Data.findInfo(needle, haystack[key], callback);

                if (result) {
                    return true;
                }

                return false;
            });

            return result;
        }
    }

    static load(callback) {
        Data.data || fetch(process.env.PUBLIC_URL + '/data.json')
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                Data.data = data;
                callback();
            })
    }
}