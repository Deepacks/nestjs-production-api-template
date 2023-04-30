import * as fs from 'fs'
import path from 'path'

const SECRET_DIR = '/run/secrets'

interface Secrets {
  [key: string]: string
}

function getSecrets<T extends Secrets = Secrets>(secretDir?: string): T {
  const _secretDir = secretDir || SECRET_DIR

  const secrets: Secrets = {}
  if (fs.existsSync(_secretDir)) {
    const files = fs.readdirSync(_secretDir)

    files.forEach((file) => {
      const fullPath = path.join(_secretDir, file)
      const key = file
      if (fs.lstatSync(fullPath).isDirectory()) return
      const data = fs.readFileSync(fullPath, 'utf8').toString().trim()

      secrets[key] = data
    })
  }
  return secrets as T
}

export const secrets = getSecrets(SECRET_DIR)
