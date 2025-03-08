const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// disable the button initially
button.disabled = true;

// Enable button when input has text
input.addEventListener('input', function () {
    button.disabled = input.value.trim() === '';
});

// Add a chapter by pressing Enter on the keyboard
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && input.value.trim() !== '') {
        button.click();
    }
});

button.addEventListener('click', function () {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = input.value;
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', 'Remove');

        li.append(deleteButton);
        list.append(li);

        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        input.value = '';
        button.disabled = true;
        input.focus();
    }
});