// @ts-check
import { app } from './gun'
import 'gun/lib/not'
import moment from 'moment'

console.log('criar.js')

const linkValido = /^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22,})$/

// @ts-ignore
window.criar = () => {
  console.log('chamou')

  const criado_em = moment.utc().toISOString()
  const cidade = getValueById('cidade')
  const criador = getValueById('nome')
  const link = getValueById('link')

  const linkInvalido = !linkValido.test(link)
  if (linkInvalido) {
    mostrarMensagem('link inválido')
  }

  if (!cidade) {
    mostrarMensagem('campo cidade obrigatório')
  }

  if (!criador) {
    mostrarMensagem('campo nome obrigatório')
  }

  if (!criador || !cidade || linkInvalido) return

  esconderMensagens()

  app.get('grupos').get(criador).put({
    criado_em,
    cidade,
    criador,
    link
  })

  clearValueById('cidade')
  clearValueById('nome')
  clearValueById('link')

  return false
}

function getValueById (id) {
  /** @type { HTMLInputElement } */
  // @ts-ignore
  const input = document.getElementById(id)
  if (!input) throw Error(`Input #${id} não encontrado`)

  return input.value
}

function clearValueById (id) {
  /** @type { HTMLInputElement } */
  // @ts-ignore
  const input = document.getElementById(id)
  if (!input) throw Error(`Input #${id} não encontrado`)

  input.value = ''
}

function mostrarMensagem (mensagem) {
  try {
    // @ts-ignore
    document.getElementById('mensagem').innerText += `${mensagem}\n`
    // @ts-ignore
    document.getElementById('mensagem').style.display = 'block'
  } catch {}
}
function esconderMensagens () {
  try {
    // @ts-ignore
    document.getElementById('mensagem').innerText = ''
    // @ts-ignore
    document.getElementById('mensagem').style.display = 'none'
  } catch {}
}

// @ts-ignore
window.esconderMensagens = esconderMensagens
