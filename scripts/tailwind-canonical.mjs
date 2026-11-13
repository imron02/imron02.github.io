#!/usr/bin/env node
// Rewrites Tailwind classes to their canonical form, mirroring Tailwind CSS
// IntelliSense's `suggestCanonicalClasses` diagnostic (same design-system API).
//
//   node scripts/tailwind-canonical.mjs          # check only, exit 1 on findings
//   node scripts/tailwind-canonical.mjs --write  # apply replacements
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { __unstable__loadDesignSystem } from "tailwindcss";

const ROOT = path.resolve(import.meta.dirname, "..");
const STYLESHEET = path.join(ROOT, "src/styles/global.css");
const SCANNED = /\.(tsx|ts|astro)$/;
const WRITE = process.argv.includes("--write");

const require = createRequire(path.join(ROOT, "package.json"));
const tailwindDir = path.dirname(require.resolve("tailwindcss/package.json"));

const loadStylesheet = async (id, base) => {
  const file =
    id === "tailwindcss"
      ? path.join(tailwindDir, "index.css")
      : id.startsWith("tailwindcss/")
        ? path.join(tailwindDir, id.slice("tailwindcss/".length))
        : path.resolve(base, id);
  return { path: file, base: path.dirname(file), content: fs.readFileSync(file, "utf8") };
};

const designSystem = await __unstable__loadDesignSystem(fs.readFileSync(STYLESHEET, "utf8"), {
  base: ROOT,
  loadStylesheet,
});

if (typeof designSystem.canonicalizeCandidates !== "function") {
  console.error(
    "tailwindcss no longer exposes canonicalizeCandidates; update this script or apply the rewrites by hand.",
  );
  process.exit(2);
}

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, out);
    else if (SCANNED.test(entry.name)) out.push(file);
  }
  return out;
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let replaced = 0;
const touched = new Set();

for (const file of walk(path.join(ROOT, "src"))) {
  const source = fs.readFileSync(file, "utf8");
  const tokens = [
    ...new Set(
      source
        .split(/[\s`"']+/)
        .map((token) => token.replace(/^[,;{}]+|[,;{}]+$/g, ""))
        .filter((token) => token.length > 0 && token.length < 200),
    ),
  ];
  const canonical = designSystem.canonicalizeCandidates(tokens, { rem: 16 });

  let next = source;
  tokens.forEach((token, index) => {
    const target = canonical[index];
    if (target === token) return;
    const pattern = new RegExp(`(?<![\\w-])${escapeRegExp(token)}(?![\\w-])`, "g");
    const before = next;
    next = next.replace(pattern, target);
    if (next !== before) {
      replaced += (before.match(pattern) ?? []).length;
      touched.add(path.relative(ROOT, file));
      console.log(`${path.relative(ROOT, file)}: ${token} -> ${target}`);
    }
  });

  if (WRITE && next !== source) fs.writeFileSync(file, next);
}

console.log(
  replaced === 0
    ? "All Tailwind classes canonical."
    : `${replaced} replacement(s) in ${touched.size} file(s).${WRITE ? "" : " Run with --write to apply."}`,
);
process.exit(replaced === 0 || WRITE ? 0 : 1);