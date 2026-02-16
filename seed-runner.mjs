// Seed runner that properly loads env before Payload
import pkg from '@next/env'
const { loadEnvConfig } = pkg
loadEnvConfig(process.cwd(), true)

// Now dynamically import the seed script
const { register } = await import('tsx/esm/api')
const unregister = register()

await import('./src/seed.ts')

unregister()
