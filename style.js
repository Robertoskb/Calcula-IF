let el = document.getElementById('b')
el.addEventListener('mousedown', () => el.classList.add('mousedown'))
el.addEventListener('mouseup', () => el.classList.remove('mousedown'))

el.addEventListener('touchstart', () => el.classList.add('mousedown'))
el.addEventListener('touchend', () => el.classList.remove('mousedown'))


