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
        // const map = PropertyMap.from(t);
        // const names = map.names.sort( (a, b) => a.localeCompare(b));
        for (const iterator of t) {
            if (/^__/i.test(iterator)) {
                continue;
            }
            let element: any = null;
            try {
                element = t[iterator];
            } catch (e) {
                element = e.message;
            }
            list.push(new PropertyModel(
                t,
                iterator,
                typeof element === "object",
                PropertyModel.isArray(element)));
        }
        return list;
    }

    public expanded: boolean = false;

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
