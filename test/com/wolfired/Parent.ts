
import { ByteArray } from "as2ts/lib/flash/utils/ByteArray"

export class Parent {
    public constructor() {
        this.name = "";
this.age = 0;
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

    public encode(raw:ByteArray):void {
        raw.writeUTF(this.name);
raw.writeByte(this.age);
    }

    public decode(raw:ByteArray):void {
        this.name = raw.readUTF();
this.age = raw.readByte();
    }
}