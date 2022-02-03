
let el = document.getElementById('b')
let checkDevice = Modernizr.touchevents 

if (!checkDevice){
el.addEventListener('mouseenter', () => el.classList.add('enter'))
el.addEventListener('mouseout', () => el.classList.remove('enter'))

el.addEventListener('mousedown', () => el.classList.add('mousedown'))
el.addEventListener('mouseup', () => el.classList.remove('mousedown'))

}

else{
    el.addEventListener('mouseenter', () => el.classList.add('touchenter'))
    el.addEventListener('mouseout', () => el.classList.remove('touchenter'))
}




