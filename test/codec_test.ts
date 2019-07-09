import { expect } from "chai";
import "mocha";
import { ByteArray } from "as2ts/lib/flash/utils/ByteArray";
import { Son } from "./com/wolfired/Son";
import { Parent } from "./com/wolfired/Parent";

/**
 * 生成测试类
 * node .\lib\main.js --lang ts --file E:\workspace_git\smst\test\sample.json --path E:\workspace_git\smst\test
 */
describe("codec", () => {
    it("codec", () => {
        let son_src = new Son();
        son_src.name = "LinkWu";
        son_src.age = 32;
        son_src.emails.push("wjianl@qq.com");
        son_src.id_map.set(1, "1");
        son_src.f32_map.set(3.14, "3.14");
        son_src.str_map.set("key", 32);
        son_src.what[0] = 8;
        son_src.what[1] = 3.14;
        son_src.what[2] = "what.2";
        son_src.what[3] = new Parent();
        son_src.what[3].name = "Hugo";
        son_src.what[3].age = 63;
        son_src.parent.name = "Neway";
        son_src.parent.age = 64;

        let raw = new ByteArray();
        son_src.encode(raw);
        raw.position = 0;

        let son_dst = new Son();
        son_dst.decode(raw);

        expect(son_src.name).to.equal(son_dst.name);
        expect(son_src.age).to.equal(son_dst.age);
        expect(son_src.emails.length).to.equal(son_dst.emails.length);
        expect(son_src.emails[0]).to.equal(son_dst.emails[0]);
        expect(son_src.id_map.get(1)).to.equal(son_dst.id_map.get(1));
        expect(son_src.f32_map.get(3.14)).to.equal(son_dst.f32_map.get(3.14));
        expect(son_src.str_map.get("key")).to.equal(son_dst.str_map.get("key"));
        expect(son_src.what[0]).to.equal(son_dst.what[0]);
        expect(son_src.what[1]).to.equal(son_dst.what[1]);
        expect(son_src.what[2]).to.equal(son_dst.what[2]);
        expect(son_src.what[3].name).to.equal(son_dst.what[3].name);
        expect(son_src.what[3].age).to.equal(son_dst.what[3].age);
        expect(son_src.parent.name).to.equal(son_dst.parent.name);
        expect(son_src.parent.age).to.equal(son_dst.parent.age);
    });
});
