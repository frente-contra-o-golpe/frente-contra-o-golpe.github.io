// @ts-check
import moment from 'moment'
import { app } from './gun'

console.log('criado-por.js')

const linkValido = /^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22,})$/

const criador = new URL(window.location.href).searchParams.get('q')

if (!criador) throw Error('')

app
  .get('grupos')
  .get(criador)
  .on(listarGrupo)

function listarGrupo (grupo) {
  const { cidade = '', criador = '', org = '', link, criado_em } = grupo ?? {}
  if (!cidade || !criador || !linkValido.test(link)) return

  const lista = document.getElementById('lista')
  if (!lista) return

  const criadoPor = `<a href='/criado-por.html?q=${criador}'>${criador}</a>`

  const criadoTempoAtras = moment.utc(criado_em).fromNow(true)
  const template = `<div class="d-flex gap-2 w-100 justify-content-between">
  <div>
    <h6 class="mb-0">Cidade: ${cidade}</h6>
    <p class="mb-0 opacity-75">
      Criador por ${criadoPor}.
    </p>
  </div>
  <small class="opacity-50 text-nowrap">${criadoTempoAtras}</small>
</div>`

  const itemLista = document.createElement('a')
  itemLista.href = link
  itemLista.className =
    'list-group-item list-group-item-action d-flex gap-3 py-3'

  itemLista.innerHTML = template

  const exitente = lista.querySelector(`[href="${link}"]`)
  if (exitente) {
    exitente.replaceWith(itemLista)
    exitente.remove()
  }
  lista.appendChild(itemLista)
}

window.moment = moment
