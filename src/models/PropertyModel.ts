export default class PropertyModel {

    public static isArray(t: any): boolean {
        return t && typeof t === "object" && t.length !== undefined && typeof t.length === "number";
    }

    public static create(t: any): PropertyModel[] {

        if (!t) {
            return null;
        }

        if (PropertyModel.isArray(t)) {
            const a = t as any[];
            return a.map((ai, i) => new PropertyModel(t, i, true, true));
        }

        const list: PropertyModel[] = [];
        for (const key in t) {
            if (t.hasOwnProperty(key)) {
                const element = t[key];
                list.push(new PropertyModel(
                    t,
                    key,
                    typeof element === "object",
                    PropertyModel.isArray(element)));
            }
        }
        return list;
    }

    constructor(
        public target: any,
        public index: string | number,
        public isObject: boolean,
        public isArray: boolean) {

    }

    public get value(): string | number | PropertyModel[] {
        const v = this.target[this.index];
        if (this.isObject || this.isArray) {
            return PropertyModel.create(v);
        }
        return v;
    }

}
