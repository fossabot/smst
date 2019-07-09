import * as fs from "fs"
import * as path from "path"

export type Json = { package_prefix: { as?: string, ts?: string, go?: string }, metas: Meta[] }

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

    public parent?: string;
    public name: string;
    public metas: string[];
}

export class Factory {
    public constructor(lang: string, ctm: Meta) {
        this._lang = lang;
        this._ctm = ctm
        this._metas = new Map<string, Meta>();
    }

    public toCustom?: (json: Json, meta: Meta) => string;
    public makePath?: (root: string, meta: Meta) => string;

    private _lang: string;
    private _ctm: Meta;
    private _metas: Map<string, Meta>;

    public get lang(): string {
        return this._lang;
    }

    public addMeta(key: string, value: Meta): void {
        if (this._ctm.id < value.id) {
            value.toType = this._ctm.toType;
            value.toField = this._ctm.toField;
            value.toInit = this._ctm.toInit;
            value.toEncode = this._ctm.toEncode;
            value.toDecode = this._ctm.toDecode;
        }

        value.elem.forEach(element => {
            element.parent = key;
        });

        this._metas.set(key, value);
    }

    public tryGetMeta(key: string): Meta | undefined {
        return this._metas.get(key);
    }

    public dryGetMeta(key: string): Meta {
        return this._metas.get(key)!;
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

    public toSource(root: string, json: Json, meta: Meta): void {
        let source_file: string = this.makePath!(root, meta);

        fs.mkdirSync(path.dirname(source_file), { recursive: true });
        fs.writeFileSync(source_file, this.toCustom!(json, meta));
    }
}

let factories: Map<string, Factory> = new Map<string, Factory>();

export function addFactory(factory: Factory): void {
    factories.set(factory.lang, factory);
}

export function getFactory(lang: string): Factory {
    void 0 === factories.get(lang) && require("./smst_" + lang);
    return factories.get(lang)!;
}
