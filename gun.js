export * from 'gun'
import Gun from 'gun'
import 'gun/sea'
const gun = Gun([
  'http://localhost:8765/gun',
  'https://frente-gun-server.herokuapp.com/gun'
])

export const app = gun
