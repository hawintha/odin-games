let lightSwitch = document.querySelector('#lightSwitch');
lightSwitch.addEventListener('click', () => {
    let iconName = lightSwitch.innerText;
    if (iconName === "dark_mode") {
        lightSwitch.innerText = "light_mode";
    } else {
        lightSwitch.innerText = "dark_mode";
    }
});