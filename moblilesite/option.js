const toggleSwitch = document.querySelector('#darkModeToggle');

toggleSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});
