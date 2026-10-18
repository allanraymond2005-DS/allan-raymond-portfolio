// Copies official Devicon SVGs (MIT) into public/logos. Missing logos are skipped; the UI falls back to a line icon.
import fs from "node:fs"; import path from "node:path";
const src = path.join("node_modules", "devicon", "icons"), out = path.join("public", "logos");
const slugs = ["python","pandas","numpy","matplotlib","scikitlearn","django","mysql","git","github","vscode","jupyter","react","flask","postgresql","opencv","fastapi","docker"];
fs.mkdirSync(out, { recursive: true }); let ok = 0;
for (const s of slugs) {
  const f = ["-original.svg", "-plain.svg"].map((x) => path.join(src, s, s + x)).find((p) => fs.existsSync(p));
  if (f) { fs.copyFileSync(f, path.join(out, s + ".svg")); ok++; } else console.log("no devicon logo for:", s);
}
const lic = path.join("node_modules", "devicon", "LICENSE"); if (fs.existsSync(lic)) fs.copyFileSync(lic, path.join(out, "DEVICON-LICENSE"));
console.log(`logos copied: ${ok}`);
