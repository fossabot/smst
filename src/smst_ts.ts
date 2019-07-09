import * as path from "path"

import { Json, Factory, Meta, Elem, addFactory } from './smst'

/**
as:
    bool -> boolean

    i8, i16, i32, i64 -> number

    u8, u16, u32, u64 -> number

    f32, f64 -> number

    string -> string

    array -> T[]

    tuple -> [T, ...]

    map -> Map<K, V>
*/

function toField(elem: Elem): string {
    return `
/** 
 * 注释 
 * <br/>定义类型: ${elem.metas.join(", ")}
*/
public ${elem.name}: ${factory.dryGetMeta(elem.metas[0]).toType!(elem)};`;
}

let bool: Meta = {
    id: 0x01
    , key: "bool"
    , elem: []
    , toType: (elem: Elem) => "boolean"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "false" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = false;`
    , toEncode: (elem: Elem) => `raw.writeBoolean(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readBoolean()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readBoolean();`
};

let i8: Meta = {
    id: 0x11
    , key: "i8"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeByte(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readByte()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readByte();`
};

let i16: Meta = {
    id: 0x12
    , key: "i16"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeShort(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readShort()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readShort();`
};

let i32: Meta = {
    id: 0x13
    , key: "i32"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeInt(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readInt()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readInt();`
};

let i64: Meta = {
    id: 0x14
    , key: "i64"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0.0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0.0;`
    , toEncode: (elem: Elem) => `raw.writeDouble(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readDouble()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readDouble();`
};

let u8: Meta = {
    id: 0x21
    , key: "u8"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeByte(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readUnsignedByte()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readUnsignedByte();`
};

let u16: Meta = {
    id: 0x22
    , key: "u16"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeShort(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readUnsignedShort()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readUnsignedShort();`
};

let u32: Meta = {
    id: 0x23
    , key: "u32"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeInt(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readUnsignedInt()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readUnsignedInt();`
};

let u64: Meta = {
    id: 0x24
    , key: "u64"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0.0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0.0;`
    , toEncode: (elem: Elem) => `raw.writeDouble(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readDouble()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readDouble();`
};

let f32: Meta = {
    id: 0x31
    , key: "f32"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0.0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0.0;`
    , toEncode: (elem: Elem) => `raw.writeFloat(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readFloat()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readFloat();`
};

let f64: Meta = {
    id: 0x32
    , key: "f64"
    , elem: []
    , toType: (elem: Elem) => "number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0.0" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = 0.0;`
    , toEncode: (elem: Elem) => `raw.writeDouble(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readDouble()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readDouble();`
};

let str: Meta = {
    id: 0x41
    , key: "string"
    , elem: []
    , toType: (elem: Elem) => "string"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? `""` : `${void 0 === elem.parent ? "" : "this."}${elem.name} = "";`
    , toEncode: (elem: Elem) => `raw.writeUTF(${void 0 === elem.parent ? "" : "this."}${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readUTF()" : `${void 0 === elem.parent ? "" : "this."}${elem.name} = raw.readUTF();`
};

let arr: Meta = {
    id: 0x51
    , key: "array"
    , elem: []
    , toType: (elem: Elem) => `${factory.dryGetMeta(elem.metas[1]).toType!(elem)}[]`
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? `[]` : `${void 0 === elem.parent ? "" : "this."}${elem.name} = [];`
    , toEncode: (elem: Elem) => {
        return `
{
    raw.writeUnsignedInt(${void 0 === elem.parent ? "" : "this."}${elem.name}.length);

    for (let e of ${void 0 === elem.parent ? "" : "this."}${elem.name}) {
        ${factory.dryGetMeta(elem.metas[1]).toEncode!({ name: "e", metas: [elem.metas[1]] })}
    }
}`;
    }
    , toDecode: (elem: Elem) => {
        return `
{
    let count: number = raw.readUnsignedInt();

    for(let i: number = 0; i < count; ++i) {
        ${void 0 === elem.parent ? "" : "this."}${elem.name}.push(${factory.dryGetMeta(elem.metas[1]).toDecode!({ name: "", metas: [elem.metas[1]] })});
    }
}`;
    }
};

let tup: Meta = {
    id: 0x61
    , key: "tuple"
    , elem: []
    , toType: (elem: Elem) => {
        let tuple_array: string[] = [];

        for (let i: number = 1; i < elem.metas.length; ++i) {
            tuple_array.push(factory.dryGetMeta(elem.metas[i]).toType!({ name: "", metas: [elem.metas[i]] }));
        }

        return `[${tuple_array.join(", ")}]`;
    }
    , toField: toField
    , toInit: (elem: Elem) => {
        let tuple_array: string[] = [];

        for (let i: number = 1; i < elem.metas.length; ++i) {
            tuple_array.push(factory.dryGetMeta(elem.metas[i]).toInit!({ name: "", metas: [elem.metas[i]] }));
        }

        return `${void 0 === elem.parent ? "" : "this."}${elem.name} = [${tuple_array.join(", ")}];`;
    }
    , toEncode: (elem: Elem) => {
        let tuple_array: string[] = [];
        for (let i: number = 1; i < elem.metas.length; ++i) {
            tuple_array.push(factory.dryGetMeta(elem.metas[i]).toEncode!({ name: `this.${elem.name}[${i - 1}]`, metas: [elem.metas[i]] }));
        }
        return `
{
    ${tuple_array.join("\n")}
}`;
    }
    , toDecode: (elem: Elem) => {
        let tuple_array: string[] = [];

        for (let i: number = 1; i < elem.metas.length; ++i) {
            tuple_array.push(factory.dryGetMeta(elem.metas[i]).toDecode!({ name: `this.${elem.name}[${i - 1}]`, metas: [elem.metas[i]] }));
        }

        return `
{
        ${tuple_array.join("\n")}
}`;
    }
};

let map: Meta = {
    id: 0x71
    , key: "map"
    , elem: []
    , toType: (elem: Elem) => {
        return `Map<${factory.dryGetMeta(elem.metas[1]).toType!({ name: "", metas: [elem.metas[1]] })}, ${factory.dryGetMeta(elem.metas[2]).toType!({ name: "", metas: [elem.metas[2]] })}>`;
    }
    , toField: toField
    , toInit: (elem: Elem) => {
        return "" === elem.name ? `new Map<${factory.dryGetMeta(elem.metas[1]).toType!({ name: "", metas: [elem.metas[1]] })}, ${factory.dryGetMeta(elem.metas[2]).toType!({ name: "", metas: [elem.metas[2]] })}>()` : `${void 0 === elem.parent ? "" : "this."}${elem.name} = new Map<${factory.dryGetMeta(elem.metas[1]).toType!({ name: "", metas: [elem.metas[1]] })}, ${factory.dryGetMeta(elem.metas[2]).toType!({ name: "", metas: [elem.metas[2]] })}>();`;
    }
    , toEncode: (elem: Elem) => {
        let type1: string = elem.metas[1];
        let type1_array: string[] = [type1];
        let type1_real: string = factory.dryGetMeta(type1).toType!({ name: "", metas: type1_array });

        let type2: string = elem.metas[2];
        let type2_array: string[] = [type2];
        let type2_real: string = factory.dryGetMeta(type2).toType!({ name: "", metas: type2_array });

        return `
{
    let begin: number = raw.position;
    raw.writeUnsignedInt(0); // 占位: map键值对数量

    let count: number = 0;

    ${void 0 === elem.parent ? "" : "this."}${elem.name}.forEach((value: ${type2_real}, key: ${type1_real}) => {
        ${factory.dryGetMeta(type1).toEncode!({ name: "key", metas: type1_array })}
        ${factory.dryGetMeta(type2).toEncode!({ name: "value", metas: type2_array })}

        ++count;
    });

    let end: number = raw.position;
    raw.position = begin;
    raw.writeUnsignedInt(count);
    raw.position = end;
}`;
    }
    , toDecode: (elem: Elem) => {
        let type1: string = elem.metas[1];
        let type1_array: string[] = [type1];

        let type2: string = elem.metas[2];
        let type2_array: string[] = [type2];

        return `
{
    let count: number = raw.readUnsignedInt();

    for(let i: number = 0; i < count; ++i) {
        ${void 0 === elem.parent ? "" : "this."}${elem.name}.set(${factory.dryGetMeta(type1).toDecode!({ "name": "", "metas": type1_array })}, ${factory.dryGetMeta(type2).toDecode!({ "name": "", "metas": type2_array })});
    }
}`;
    }
};

let ctm: Meta = {
    id: 0x1000
    , key: "custom"
    , elem: []
    , toType: (elem: Elem) => {
        let keys: string[] = elem.metas[0].split(/::/g);
        return keys[1];
    }
    , toField: toField
    , toInit: (elem: Elem) => {
        let keys: string[] = elem.metas[0].split(/::/g);
        return "" === elem.name ? `new ${keys[1]}()` : `${void 0 === elem.parent ? "" : "this."}${elem.name} = new ${keys[1]}();`;
    }
    , toEncode: (elem: Elem) => {
        return `
${void 0 === elem.parent ? "" : "this."}${elem.name}.encode(raw);`;
    }
    , toDecode: (elem: Elem) => {
        return `
${void 0 === elem.parent ? "" : "this."}${elem.name}.decode(raw);`;
    }
};

let factory = new Factory("ts", ctm);

addFactory(factory);

factory.addMeta("bool", bool);
factory.addMeta("i8", i8);
factory.addMeta("i16", i16);
factory.addMeta("i32", i32);
factory.addMeta("i64", i64);
factory.addMeta("u8", u8);
factory.addMeta("u16", u16);
factory.addMeta("u32", u32);
factory.addMeta("u64", u64);
factory.addMeta("f32", f32);
factory.addMeta("f64", f64);
factory.addMeta("string", str);
factory.addMeta("array", arr);
factory.addMeta("tuple", tup);
factory.addMeta("map", map);
factory.addMeta("custom", ctm);

factory.toCustom = (json: Json, meta: Meta): string => {
    let keys: string[] = meta.key.split(/::/g);
    let class_package: string = keys[0];
    let class_packages: string[] = class_package.split(/\./g);
    let class_name: string = keys[1];
    let class_depends: string[] = [`import { ByteArray } from "as2ts/lib/flash/utils/ByteArray"`];
    let class_inits: string[] = [];
    let class_fields: string[] = [];
    let class_encodes: string[] = [];
    let class_decodes: string[] = [];

    meta.elem.forEach(element => {
        element.metas.forEach(mkey => {
            if(meta.key === mkey){
                return;
            }

            let kmeta = factory.dryGetMeta(mkey);

            try {
                if (kmeta.id < ctm.id) {
                    return;
                }
            } catch (error) {
                console.log(kmeta);
                
            }

            let member_keys: string[] = mkey.split(/::/g);
            let member_class_package: string = member_keys[0];
            let member_class_packages: string[] = member_class_package.split(/\./g);
            let member_class_name: string = member_keys[1];

            let packs: string[] = [];

            for (let i = 0; i < class_packages.length; ++i) {
                packs.push("..");
            }

            let len = Math.min(class_packages.length, member_class_packages.length);
            let end = false;
            let count = 0;

            while (true) {
                for (let i = 0; i < len; ++i) {
                    if (class_packages[i] !== member_class_packages[i]) {
                        end = true;
                        break;
                    }
                    ++count;
                }

                if (end || len === count) {
                    break;
                }
            }

            packs.splice(0, count);

            if (0 === packs.length) {
                packs.push(".");
            }

            member_class_packages.splice(0, count);
            packs.push(...member_class_packages);
            packs.push(member_class_name);

            let full_pack = `import { ${member_class_name} } from "${packs.join("/")}"`;

            if (-1 === class_depends.indexOf(full_pack)) {
                class_depends.push(full_pack);
            }
        });

        class_fields.push(factory.toField(element));

        class_inits.push(factory.toInit(element));

        class_encodes.push(factory.toEncode(element));

        class_decodes.push(factory.toDecode(element));
    });

    return `
${class_depends.join("\n")}

export class ${class_name} {
    public constructor() {
        ${class_inits.join("\n")}
    }

    ${class_fields.join("\n")}

    public encode(raw:ByteArray):void {
        ${class_encodes.join("\n")}
    }

    public decode(raw:ByteArray):void {
        ${class_decodes.join("\n")}
    }
}`;
};

factory.makePath = (root: string, meta: Meta): string => {
    let packs_and_name: string[] = meta.key.split(/::/g);
    let packs: string[] = packs_and_name[0].split(/\./g);
    let name: string = `${packs_and_name[1]}.ts`;

    packs.push(name);

    return path.join(root, ...packs);
}