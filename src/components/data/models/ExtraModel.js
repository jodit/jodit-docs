import Model from "./Model";

export default class ExtraModel extends Model{
    fill(data) {
        Object.keys(data).forEach((property) => {
            let value =  data[property];

            this[property] = value;
        });
    }

    parent;
}