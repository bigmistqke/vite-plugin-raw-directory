import fs from "fs/promises"
import path from "path"
import type { Plugin } from "vite"

const PREFIX = "?raw-directory"

export default function rawDirectoryPlugin(): Plugin {
  let isDev: boolean

  return {
    name: "vite-plugin-bundle",
    config(_, { command }) {
      isDev = command === "serve"
    },
    resolveId(source, importer) {
      if (source.endsWith(PREFIX)) {
        return path.resolve(
          path.dirname(importer!),
          source.replace(PREFIX, ""),
          `RAW_BUNDLER.ts${PREFIX}`,
        )
      }
      return null // Let other plugins resolve
    },
    async load(id) {
      if (id.endsWith(`RAW_BUNDLER.ts${PREFIX}`)) {
        const directory = id.replace(`/RAW_BUNDLER.ts${PREFIX}`, "")

        const importPaths = []

        for await (const entry of fs.glob(`${directory}/**/*`, {
          withFileTypes: true,
        })) {
          if (entry.isFile()) {
            entry
            importPaths.push(
              `.${entry.parentPath}/${entry.name}`.replace(directory, ""),
            )
          }
        }

        return `${importPaths
          .map((path, index) => `import source${index} from "${path}?raw"`)
          .join("\n")}
export default {
${importPaths.map((path, index) => ` "${path}": source${index}`).join(",\n")}
}`
      }
    },
  }
}
