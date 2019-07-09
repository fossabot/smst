
import { ByteArray } from "as2ts/lib/flash/utils/ByteArray"
import { Parent } from "./Parent"
import { MySon } from "../neway/MySon"

export class Son {
    public constructor() {
        this.name = "";
this.age = 0;
this.emails = [];
this.id_map = new Map<number, string>();
this.str_map = new Map<string, number>();
this.f32_map = new Map<number, string>();
this.parent = new Parent();
this.what = [0, 0.0, "", new MySon()];
    }

    
/** 
 * 注释 
 * <br/>定义类型: string
*/
public name: string;

/** 
 * 注释 
 * <br/>定义类型: i8
*/
public age: number;

/** 
 * 注释 
 * <br/>定义类型: array, string
*/
public emails: string[];

/** 
 * 注释 
 * <br/>定义类型: map, u32, string
*/
public id_map: Map<number, string>;

/** 
 * 注释 
 * <br/>定义类型: map, string, u32
*/
public str_map: Map<string, number>;

/** 
 * 注释 
 * <br/>定义类型: map, f64, string
*/
public f32_map: Map<number, string>;

/** 
 * 注释 
 * <br/>定义类型: com.wolfired::Parent
*/
public parent: Parent;

/** 
 * 注释 
 * <br/>定义类型: tuple, i8, f64, string, com.neway::MySon
*/
public what: [number, number, string, MySon];

    public encode(raw:ByteArray):void {
        raw.writeUTF(this.name);
raw.writeByte(this.age);

{
    raw.writeUnsignedInt(this.emails.length);

    for (let e of this.emails) {
        raw.writeUTF(e);
    }
}

{
    let begin: number = raw.position;
    raw.writeUnsignedInt(0); // 占位: map键值对数量

    let count: number = 0;

    this.id_map.forEach((value: string, key: number) => {
        raw.writeInt(key);
        raw.writeUTF(value);

        ++count;
    });

    let end: number = raw.position;
    raw.position = begin;
    raw.writeUnsignedInt(count);
    raw.position = end;
}

{
    let begin: number = raw.position;
    raw.writeUnsignedInt(0); // 占位: map键值对数量

    let count: number = 0;

    this.str_map.forEach((value: number, key: string) => {
        raw.writeUTF(key);
        raw.writeInt(value);

        ++count;
    });

    let end: number = raw.position;
    raw.position = begin;
    raw.writeUnsignedInt(count);
    raw.position = end;
}

{
    let begin: number = raw.position;
    raw.writeUnsignedInt(0); // 占位: map键值对数量

    let count: number = 0;

    this.f32_map.forEach((value: string, key: number) => {
        raw.writeDouble(key);
        raw.writeUTF(value);

        ++count;
    });

    let end: number = raw.position;
    raw.position = begin;
    raw.writeUnsignedInt(count);
    raw.position = end;
}

this.parent.encode(raw);

{
    raw.writeByte(this.what[0]);
raw.writeDouble(this.what[1]);
raw.writeUTF(this.what[2]);

this.what[3].encode(raw);
}
    }

    public decode(raw:ByteArray):void {
        this.name = raw.readUTF();
this.age = raw.readByte();

{
    let count: number = raw.readUnsignedInt();

    for(let i: number = 0; i < count; ++i) {
        this.emails.push(raw.readUTF());
    }
}

{
    let count: number = raw.readUnsignedInt();

    for(let i: number = 0; i < count; ++i) {
        this.id_map.set(raw.readUnsignedInt(), raw.readUTF());
    }
}

{
    let count: number = raw.readUnsignedInt();

    for(let i: number = 0; i < count; ++i) {
        this.str_map.set(raw.readUTF(), raw.readUnsignedInt());
    }
}

{
    let count: number = raw.readUnsignedInt();

    for(let i: number = 0; i < count; ++i) {
        this.f32_map.set(raw.readDouble(), raw.readUTF());
    }
}

this.parent.decode(raw);

{
        this.what[0] = raw.readByte();
this.what[1] = raw.readDouble();
this.what[2] = raw.readUTF();

this.what[3].decode(raw);
}
    }
}