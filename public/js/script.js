const form = document.querySelector('form')
const search = document.querySelector('button')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


search.addEventListener('click', (e) => {
  const value = document.querySelector('input').value

  message1.textContent = 'Loading..'
  message2.textContent = ''

  fetch('http://localhost:3000/weather?address='+ value +' ').then((res) => {res.json().then((res) =>{
  if(res.error) {
    message1.textContent = res.error
      message2.textContent = ''

  } else {
    message1.textContent = ('place: '+res.location)
    message2.textContent = (' forcast: '+ res.forcast)
    }
  })})
  

  e.preventDefault()
})