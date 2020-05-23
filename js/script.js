// variaveis globais
let time;
let id_time = 0;

function start() {
  clearInterval(time)
  interval(0, 0, 0)

  document.querySelector('button.js-start').classList.add('hide')
  document.querySelector('div.btn-container.btn-cont1').classList.remove('hide')
}

function stop() {
  document.querySelectorAll('div.btn-container')
    .forEach(btn => btn.classList.toggle('hide'))

  clearTimeout(time)
}

function add() {
  const cron = document.querySelector('header').innerHTML
  const container = document.querySelector('main')
  container.classList.remove('hide')

  const time = cron.match(/\d/gi)

  const div = document.createElement('div')
  div.classList = 'time-line'

  const id = document.createElement('p')
  id.innerHTML = id_time++
  id.classList = 'time-id'
  
  const addTime = document.createElement('p')
  addTime.innerHTML = `${time[0]}${time[1]}:${time[2]}${time[3]}.${time[4]}${time[5]}`
  addTime.classList = 'time-add'

  div.appendChild(id)
  div.appendChild(addTime)

  // adicionar no container antes que qualquer elemento
  container.insertAdjacentElement('afterbegin', div)
}

function continueTime() {
  const container = document.querySelector('header').innerHTML

  // pegar todos os numeros e retornar um array de 6 espaço
  const time = container.match(/\d/gi)

  const milisegundo = Number(time[4] + time[5])
  const segundo = Number(time[2] + time[3])
  const minuto = Number(time[0] + time[1])

  interval(milisegundo, segundo, minuto)

  document.querySelectorAll('div.btn-container')
    .forEach(btn => btn.classList.toggle('hide'))
}

function reset() {
  clearInterval(time)

  const main = document.querySelector('main')
  main.classList.add('hide')
  main.innerHTML = ''
  id_time = 0;

  document.querySelector('header').innerHTML = '00:00.00'

  document.querySelector('button.js-start').classList.remove('hide')
  document.querySelector('div.btn-container.btn-cont2').classList.add('hide')
}

function interval(milisegundo, segundo, minuto) {
  time = setInterval(() => {
    if (milisegundo < 99) {
      ++milisegundo
    } else {
      segundo++
      milisegundo = 0
    }

    if (segundo == 60) {
      segundo = 0;
      minuto++;
    }

    editarCronometro(milisegundo, segundo, minuto)
  }, 10)
}

function editarCronometro(mm, s = 0, m = 0) {
  const container = document.querySelector('header')

  let time;
  let segundo = s >= 10 ? s : `0${s}`;
  let milisegundo = mm >= 10 ? mm : `0${mm}`

  if (m == 0) {
    if(s == 0) return container.innerHTML = `00:00.<span class="time">${milisegundo}</span>`

    time = s >= 10 ? `00:<span class="time">${segundo}.${milisegundo}</span>`
      : `00:0<span class="time">${s}.${milisegundo}</span>`
  } else {
    time = m < 10 ? `0<span class="time">${m}:${segundo}.${milisegundo}</span>`
      : `<span class="time">${m}:${segundo}.${milisegundo}</span>`
  }

  container.innerHTML = time
}
