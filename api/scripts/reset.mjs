// Gera api/db.json a partir de ../dados/*.json.
// O json-server grava as alterações (POST, PATCH, DELETE) no db.json; rodar este script
// volta tudo pros dados originais. Com --se-nao-existir, só gera quando o db.json não existe.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const apiDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const dadosDir = join(apiDir, "..", "dados");
const dbPath = join(apiDir, "db.json");

if (process.argv.includes("--se-nao-existir") && existsSync(dbPath)) {
  process.exit(0);
}

const ler = nome => JSON.parse(readFileSync(join(dadosDir, `${nome}.json`), "utf8"));

const db = {
  pacientes: ler("pacientes"),
  profissionais: ler("profissionais"),
};

writeFileSync(dbPath, JSON.stringify(db, null, 2) + "\n");
console.log(
  `db.json gerado com ${db.pacientes.length} pacientes e ${db.profissionais.length} profissionais.`
);
