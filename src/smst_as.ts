import * as path from "path"

import { Json, Factory, Meta, Elem, addFactory } from './smst'

/**
as:
    bool -> Boolean

    i8, i16, i32 -> int
    i64 -> Number

    u8, u16, u32 -> uint
    u64 -> Number

    f32, f64 -> Number

    string -> String

    array -> Array/Vector.<T>

    tuple -> Array

    map + i8/i16/i32 -> Array
    map + u8/u16/u32 -> Array

    map + string -> Object

    map + i64/u64/f32/f64 -> Dictionary
*/

function toField(elem: Elem): string {
    return `
/** 
 * 注释 
 * <br/>定义类型: ${elem.metas.join(", ")}
*/
public var ${elem.name}:${factory.dryGetMeta(elem.metas[0]).toType!(elem)};`;
}

let bool: Meta = {
    id: 0x01
    , key: "bool"
    , elem: []
    , toType: (elem: Elem) => "Boolean"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "false" : `${elem.name} = false;`
    , toEncode: (elem: Elem) => `raw.writeBoolean(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readBoolean()" : `${elem.name} = raw.readBoolean();`
};

let i8: Meta = {
    id: 0x11
    , key: "i8"
    , elem: []
    , toType: (elem: Elem) => "int"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeByte(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readByte()" : `${elem.name} = raw.readByte();`
};

let i16: Meta = {
    id: 0x12
    , key: "i16"
    , elem: []
    , toType: (elem: Elem) => "int"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeShort(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readShort()" : `${elem.name} = raw.readShort();`
};

let i32: Meta = {
    id: 0x13
    , key: "i32"
    , elem: []
    , toType: (elem: Elem) => "int"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeInt(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readInt()" : `${elem.name} = raw.readInt();`
};

let i64: Meta = {
    id: 0x14
    , key: "i64"
    , elem: []
    , toType: (elem: Elem) => "Number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0.0" : `${elem.name} = 0.0;`
    , toEncode: (elem: Elem) => `raw.writeDouble(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readDouble()" : `${elem.name} = raw.readDouble();`
};

let u8: Meta = {
    id: 0x21
    , key: "u8"
    , elem: []
    , toType: (elem: Elem) => "uint"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeByte(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readUnsignedByte()" : `${elem.name} = raw.readUnsignedByte();`
};

let u16: Meta = {
    id: 0x22
    , key: "u16"
    , elem: []
    , toType: (elem: Elem) => "uint"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeShort(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readUnsignedShort()" : `${elem.name} = raw.readUnsignedShort();`
};

let u32: Meta = {
    id: 0x23
    , key: "u32"
    , elem: []
    , toType: (elem: Elem) => "uint"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0" : `${elem.name} = 0;`
    , toEncode: (elem: Elem) => `raw.writeInt(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readUnsignedInt()" : `${elem.name} = raw.readUnsignedInt();`
};

let u64: Meta = {
    id: 0x24
    , key: "u64"
    , elem: []
    , toType: (elem: Elem) => "Number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0.0" : `${elem.name} = 0.0;`
    , toEncode: (elem: Elem) => `raw.writeDouble(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readDouble()" : `${elem.name} = raw.readDouble();`
};

let f32: Meta = {
    id: 0x31
    , key: "f32"
    , elem: []
    , toType: (elem: Elem) => "Number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0.0" : `${elem.name} = 0.0;`
    , toEncode: (elem: Elem) => `raw.writeFloat(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readFloat()" : `${elem.name} = raw.readFloat();`
};

let f64: Meta = {
    id: 0x32
    , key: "f64"
    , elem: []
    , toType: (elem: Elem) => "Number"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "0.0" : `${elem.name} = 0.0;`
    , toEncode: (elem: Elem) => `raw.writeDouble(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readDouble()" : `${elem.name} = raw.readDouble();`
};

let str: Meta = {
    id: 0x41
    , key: "string"
    , elem: []
    , toType: (elem: Elem) => "String"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? `""` : `${elem.name} = "";`
    , toEncode: (elem: Elem) => `raw.writeUTF(${elem.name});`
    , toDecode: (elem: Elem) => "" === elem.name ? "raw.readUTF()" : `${elem.name} = raw.readUTF();`
};

let arr: Meta = {
    id: 0x51
    , key: "array"
    , elem: []
    , toType: (elem: Elem) => "Array"
    , toField: toField
    , toInit: (elem: Elem) => "" === elem.name ? "[]" : `${elem.name} = [];`
    , toEncode: (elem: Elem) => {
        return `
{
    raw.writeUnsignedInt(${elem.name}.length);

    for each(var e:${factory.dryGetMeta(elem.metas[1]).toType!(elem)} in ${elem.name}) {
        ${factory.dryGetMeta(elem.metas[1]).toEncode!({ name: "e", metas: [elem.metas[1]] })}
    }
}`;
    }
    , toDecode: (elem: Elem) => {
        return `
{
    var count:uint = raw.readUnsignedInt();

    for(var i:uint = 0; i < count; ++i) {
        ${elem.name}.push(${factory.dryGetMeta(elem.metas[1]).toDecode!({ name: "", metas: [elem.metas[1]] })});
    }
}`;
    }
};

let tup: Meta = {
    id: 0x61
    , key: "tuple"
    , elem: []
    , toType: (elem: Elem) => "Array"
    , toField: toField
    , toInit: (elem: Elem) => {
        let tuple_array: string[] = [];

        for (let i: number = 1; i < elem.metas.length; ++i) {
            tuple_array.push(factory.dryGetMeta(elem.metas[i]).toInit!({ name: "", metas: [elem.metas[i]] }));
        }

        return `${elem.name} = [${tuple_array.join(", ")}];`;
    }
    , toEncode: (elem: Elem) => {
        let tuple_array: string[] = [];
        for (let i: number = 1; i < elem.metas.length; ++i) {
            tuple_array.push(factory.dryGetMeta(elem.metas[i]).toEncode!({ name: `${elem.name}[${i - 1}]`, metas: [elem.metas[i]] }));
        }
        return `
{
    ${tuple_array.join("\n")}
}`;
    }
    , toDecode: (elem: Elem) => {
        let tuple_array: string[] = [];

        for (let i: number = 1; i < elem.metas.length; ++i) {
            tuple_array.push(factory.dryGetMeta(elem.metas[i]).toDecode!({ name: `${elem.name}[${i - 1}]`, metas: [elem.metas[i]] }));
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
        switch (elem.metas[1]) {
            case "i8":
            case "i16":
            case "i32":
            case "u8":
            case "u16":
            case "u32":
                return "Array";
            case "string":
                return "Object";
            case "f32":
            case "i64":
            case "u64":
            case "f64":
                return "Dictionary";
        }
        return "";
    }
    , toField: toField
    , toInit: (elem: Elem) => {
        let type1: string = elem.metas[1];

        switch (type1) {
            case "i8":
            case "i16":
            case "i32":
            case "u8":
            case "u16":
            case "u32":
                return "" === elem.name ? "[]" : `${elem.name} = [];`;
            case "string":
                return "" === elem.name ? "{}" : `${elem.name} = {};`;
            case "f32":
            case "i64":
            case "u64":
            case "f64":
                return "" === elem.name ? "new Dictionary()" : `${elem.name} = new Dictionary();`;
        }
        return "";
    }
    , toEncode: (elem: Elem) => {
        let type1: string = elem.metas[1];
        let type1_array: string[] = [type1];
        let type1_real: string = factory.dryGetMeta(type1).toType!({ name: "", metas: type1_array });

        let type2: string = elem.metas[2];
        let type2_array: string[] = [type2];

        switch (type1) {
            case "i8":
            case "i16":
            case "i32":
            case "u8":
            case "u16":
            case "u32":
                return `
{
    var begin:uint = raw.position;
    raw.writeUnsignedInt(0); // 占位: map键值对数量

    var count:uint = 0;

    for(var key_String:String in ${elem.name}) {
        var key_${type1_real}:${type1_real} = ${type1_real}(parseInt(key_String));
        
        ${factory.dryGetMeta(type1).toEncode!({ name: `key_${type1_real}`, metas: type1_array })}
        ${factory.dryGetMeta(type2).toEncode!({ name: `${elem.name}[key_${type1_real}]`, metas: type2_array })}

        ++count;
    }

    var end:uint = raw.position;
    raw.position = begin;
    raw.writeUnsignedInt(count);
    raw.position = end;
}`;
            case "string":
                return `
{
    var begin:uint = raw.position;
    raw.writeUnsignedInt(0); // 占位: map键值对数量

    var count:uint = 0;

    for(var key_String:String in ${elem.name}) {
        ${factory.dryGetMeta(type1).toEncode!({ name: `key_String`, metas: type1_array })}
        ${factory.dryGetMeta(type2).toEncode!({ name: `${elem.name}[key_${type1_real}]`, metas: type2_array })}

        ++count;
    }

    var end:uint = raw.position;
    raw.position = begin;
    raw.writeUnsignedInt(count);
    raw.position = end;
}`;
            case "f32":
            case "i64":
            case "u64":
            case "f64":
                return `
{
    var begin:uint = raw.position;
    raw.writeUnsignedInt(0); // 占位: map键值对数量

    var count:uint = 0;

    for(var key_String:String in ${elem.name}) {
        var key_${type1_real}:${type1_real} = ${type1_real}(parseFloat(key_String));
        
        ${factory.dryGetMeta(type1).toEncode!({ name: `key_${type1_real}`, metas: type1_array })}
        ${factory.dryGetMeta(type2).toEncode!({ name: `${elem.name}[key_${type1_real}]`, metas: type2_array })}

        ++count;
    }

    var end:uint = raw.position;
    raw.position = begin;
    raw.writeUnsignedInt(count);
    raw.position = end;
}`;
        }

        return "";
    }
    , toDecode: (elem: Elem) => {
        let type1: string = elem.metas[1];
        let type1_array: string[] = [type1];

        let type2: string = elem.metas[2];
        let type2_array: string[] = [type2];

        switch (type1) {
            case "i8":
            case "i16":
            case "i32":
            case "u8":
            case "u16":
            case "u32":
                return `
{
    var count:uint = raw.readUnsignedInt();

    for(var i:uint = 0; i < count; ++i) {
        ${elem.name}[${factory.dryGetMeta(type1).toDecode!({ "name": "", "metas": type1_array })}] = ${factory.dryGetMeta(type2).toDecode!({ "name": "", "metas": type2_array })};
    }
}`;
            case "string":
                return `
{
    var count:uint = raw.readUnsignedInt();

    for(var i:uint = 0; i < count; ++i) {
        ${elem.name}[${factory.dryGetMeta(type1).toDecode!({ "name": "", "metas": type1_array })}] = ${factory.dryGetMeta(type2).toDecode!({ "name": "", "metas": type2_array })};
    }
}`;
            case "f32":
            case "i64":
            case "u64":
            case "f64":
                return `
{
    var count:uint = raw.readUnsignedInt();

    for(var i:uint = 0; i < count; ++i) {
        ${elem.name}[${factory.dryGetMeta(type1).toDecode!({ "name": "", "metas": type1_array })}] = ${factory.dryGetMeta(type2).toDecode!({ "name": "", "metas": type2_array })};
    }
}`;
        }

        return "";
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
        return "" === elem.name ? `new ${keys[1]}()` : `${elem.name} = new ${keys[1]}();`;
    }
    , toEncode: (elem: Elem) => {
        return `
${elem.name}.encode(raw);`;
    }
    , toDecode: (elem: Elem) => {
        return `
${elem.name}.decode(raw);`;
    }
};

let factory = new Factory("as", ctm);

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
    let class_name: string = keys[1];
    let class_depends: string[] = ["import flash.utils.ByteArray;", "import flash.utils.Dictionary;"];
    let class_inits: string[] = [];
    let class_fields: string[] = [];
    let class_encodes: string[] = [];
    let class_decodes: string[] = [];

    meta.elem.forEach(element => {
        class_fields.push(factory.toField(element));

        class_inits.push(factory.toInit(element));

        class_encodes.push(factory.toEncode(element));

        class_decodes.push(factory.toDecode(element));
    });

    return `
package ${class_package} {
    ${class_depends.join("\n")}

    public class ${class_name} {
        public function ${class_name}() {
            ${class_inits.join("\n")}
        }

        ${class_fields.join("\n")}

        public function encode(raw:ByteArray):void {
            ${class_encodes.join("\n")}
        }

        public function decode(raw:ByteArray):void {
            ${class_decodes.join("\n")}
        }
    }
}`;
};

factory.makePath = (root: string, meta: Meta): string => {
    let packs_and_name: string[] = meta.key.split(/::/g);
    let packs: string[] = packs_and_name[0].split(/\./g);
    let name: string = `${packs_and_name[1]}.as`;

    packs.push(name);

    return path.join(root, ...packs);
}
