let el = document.getElementById('b')
el.addEventListener('mousedown', () => el.classList.add('mousedown'))
el.addEventListener('mouseup', () => el.classList.remove('mousedown'))


