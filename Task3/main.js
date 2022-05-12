
const btnSend = document.querySelector('.btn-send')
const btnGeo = document.querySelector('.btn-geo')
const divContent = document.querySelector('.content')

const wsUri = "wss://echo-ws-service.herokuapp.com";
  
let websocket;

btnSend.addEventListener('click', () => {
   const inputTxt = document.querySelector('input').value
   divContent.insertAdjacentHTML('beforeend', `<div class="senderMessage">${inputTxt}</div>`);
   websocket = new WebSocket(wsUri);
   websocket.onopen = function(evt) {};
   websocket.onclose = function(evt) {};
   websocket.onmessage = function(evt) {
      writeToScreen(
         `${evt.data}`
         );  
   };
   websocket.onerror = function(evt) {
      console.log('error ' + evt.data)
   };

   //случай, когда не успел законектится, но уже пытается отправить send()
   setTimeout(sendMessage, 2000, websocket, inputTxt); 
});

function sendMessage(WS, message) {
   WS.send(message)
}

function writeToScreen(message) {
   let myContent = document.createElement("div");
   myContent.className = 'serverMessage'
   myContent.innerHTML = message;
   divContent.appendChild(myContent);
}

btnGeo.addEventListener('click', () => {
  
   // Функция, срабатывающая при успешном получении геолокации
   const success = (position) => {
      console.log('position', position);
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      divContent.insertAdjacentHTML('beforeend', `<div class="senderMessage"><a href="https://www.openstreetmap.org/#map=15/${latitude}/${longitude}" target="_blank">Геолокация</a></div>`);
   } 
   
   if (!navigator.geolocation) {
      console.log('Failed geo')   
   } else {
      navigator.geolocation.getCurrentPosition(success);
   }


   
});