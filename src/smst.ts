import * as fs from "fs"
import * as path from "path"

export class Meta {
    public constructor(id: number, key: string, elem: Elem[]) {
        this.id = id;
        this.key = key;
        this.elem = elem;
    }

    public id: number;
    public key: string;
    public elem: Elem[];

    public toType?: (elem: Elem) => string;
    public toField?: (elem: Elem) => string;
    public toInit?: (elem: Elem) => string;
    public toEncode?: (elem: Elem) => string;
    public toDecode?: (elem: Elem) => string;
}

export class Elem {
    public constructor(name: string, metas: string[]) {
        this.name = name;
        this.metas = metas;
    }

    public name: string;
    public metas: string[];
}

export class Factory {
    public constructor(ctm: Meta) {
        this.ctm = ctm
        this.metas = new Map<string, Meta>();
    }

    public toCustom?: (meta: Meta) => string;
    public makePath?: (root: string, meta: Meta) => string;

    private ctm: Meta;
    private metas: Map<string, Meta>;

    public addMeta(key: string, value: Meta): void {
        if (this.ctm.id < value.id) {
            value.toType = this.ctm.toType;
            value.toField = this.ctm.toField;
            value.toInit = this.ctm.toInit;
            value.toEncode = this.ctm.toEncode;
            value.toDecode = this.ctm.toDecode;
        }

        this.metas.set(key, value);
    }

    public tryGetMeta(key: string): Meta | undefined {
        return this.metas.get(key);
    }

    public dryGetMeta(key: string): Meta {
        return this.metas.get(key)!;
    }

    public toType(elem: Elem): string {
        return this.dryGetMeta(elem.metas[0]).toType!(elem);
    }

    public toField(elem: Elem): string {
        return this.dryGetMeta(elem.metas[0]).toField!(elem);
    }

    public toInit(elem: Elem): string {
        return this.dryGetMeta(elem.metas[0]).toInit!(elem);
    }

    public toEncode(elem: Elem): string {
        return this.dryGetMeta(elem.metas[0]).toEncode!(elem);
    }

    public toDecode(elem: Elem): string {
        return this.dryGetMeta(elem.metas[0]).toDecode!(elem);
    }

    public toSource(root: string, meta: Meta): void {
        let source_file: string = this.makePath!(root, meta);

        fs.mkdirSync(path.dirname(source_file), { recursive: true });
        fs.writeFileSync(source_file, this.toCustom!(meta));
    }
}

let factories: Map<string, Factory> = new Map<string, Factory>();

export function addFactory(lang: string, factory: Factory): void {
    factories.set(lang, factory);
}

export function getFactory(lang: string): Factory {
    void 0 === factories.get(lang) && require("./smst_" + lang);
    return factories.get(lang)!;
}
