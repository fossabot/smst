import * as fs from "fs"
import * as yargs from "yargs"

import * as smst from "./smst"

let argv = yargs.usage("Usage: $0 --lang [target lang] --file [json file] --path [out path]").demandOption(["lang", "file", "path"]).string(["lang", "file", "path"]).argv;

let json: { defs: smst.Meta[] } = JSON.parse(fs.readFileSync(argv.file, "utf8"));

json.defs.forEach(async def => {
    (await smst.getFactory(argv.lang)).addMeta(def.key, def);
    (await smst.getFactory(argv.lang)).toSource(argv.path, def);
});
