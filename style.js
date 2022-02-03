let el = document.getElementById('b')

if (!checkDevice()){
el.addEventListener('mouseenter', () => el.classList.add('enter'))
el.addEventListener('mouseout', () => el.classList.remove('enter'))

el.addEventListener('mousedown', () => el.classList.add('mousedown'))
el.addEventListener('mouseup', () => el.classList.remove('mousedown'))
}

else{
    el.addEventListener('touchstart', () => el.classList.add('touchenter'))
    el.addEventListener('touchend', () => el.classList.remove('touchenter'))
}


function checkDevice() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false; 
     }
   }
   

