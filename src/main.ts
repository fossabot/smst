import * as fs from "fs"
import * as yargs from "yargs"

import * as smst from "./smst"

let argv = yargs.usage("Usage: $0 --lang [target lang] --file [json file] --path [out path]").demandOption(["lang", "file", "path"]).string(["lang", "file", "path"]).argv;

let json: smst.Json = JSON.parse(fs.readFileSync(argv.file, "utf8"));

json.metas.forEach(meta => {
    smst.getFactory(argv.lang).addMeta(meta.key, meta);
});

json.metas.forEach(meta => {
    smst.getFactory(argv.lang).toSource(argv.path, json, meta);
});
