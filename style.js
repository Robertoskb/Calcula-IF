let el = document.getElementById('b')
el.addEventListener('mouseenter', () => el.classList.add('enter'))
el.addEventListener('mouseout', () => el.classList.remove('enter'))

el.addEventListener('mousedown', () => el.classList.add('mousedown'))
el.addEventListener('mouseup', () => el.classList.remove('mousedown'))

el.addEventListener('touchstart', () => el.classList.add('touchenter'))
el.addEventListener('touchend', () => el.classList.remove('touchenter'))


