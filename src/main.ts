import * as fs from "fs"
import * as yargs from "yargs"

import * as sms from "./sms"

let argv = yargs.usage("Usage: $0 -lang -file [json file] -path [out path]").demandOption(["lang", "file", "path"]).string(["lang", "file", "path"]).argv;

let json: { defs: sms.Meta[] } = JSON.parse(fs.readFileSync(argv.file, "utf8"));

json.defs.forEach(def => {
    sms.getFactory(argv.lang).addMeta(def.key, def);
    sms.getFactory(argv.lang).toSource(argv.path, def);
});
