// Show radio input value

const rangeInput = document.getElementById('progress');

rangeInput.addEventListener('input', function() {
    document.querySelector("output").textContent = this.value;
});

// Copy password

const copyBtn = document.getElementById('copy_btn');

copyBtn.addEventListener('click', function() {

    const passwordText = document.querySelector("#password p").textContent;
    navigator.clipboard.writeText(passwordText);
    this.setAttribute("class", "fa-solid fa-check");

});

const generateBtn = document.querySelector("button");

generateBtn.addEventListener("click", function() {

    document.getElementById('copy_btn').setAttribute("class", "fa-solid fa-copy");

    const checkUppercase = document.getElementById("uppercase");
    const checkLowercase = document.getElementById("lowercase");
    const checkNumber = document.getElementById("number");
    const checkSymbol = document.getElementById("symbol");

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+{}[]|:;"<>,.?/';

    let includeInPassword = [];

    if (checkUppercase.checked) { includeInPassword.push(uppercase); }
    if (checkLowercase.checked) { includeInPassword.push(lowercase); }
    if (checkNumber.checked) { includeInPassword.push(numbers); }
    if (checkSymbol.checked) { includeInPassword.push(symbols); }

    let characters = '';

    includeInPassword.forEach((element) => {
        characters += element;
    });

    // Generate password

    function generatePassword(passwordLength, characters) {

        let password = '';

        for (let c = 0; c < passwordLength; c++) {
            let index = Math.floor(Math.random() * characters.length);
            password += characters.charAt(index);
        }

        return password;

    }

    // Check password strength

    function checkPasswordStrength(password) {
        
        const miniumLength = 8;
        const haveUppercase = /[A-Z]/.test(password);
        const haveLowercase = /[a-z]/.test(password);
        const haveNumbers = /[0-9]/.test(password);
        const haveSymbols = /[^A-Za-z0-9]/.test(password);
      
        const characterTypes = [haveUppercase, haveLowercase, haveNumbers, haveSymbols];
        const presentTypes = characterTypes.filter(Boolean).length;
        
        if (password.length < miniumLength || presentTypes < 3) {

          return 'Fraca';

        } else if (password.length >= miniumLength && presentTypes == 3) {

          return 'Média';

        } else {

          return 'Forte';

        }

    }
    
    const rangeInputValue = document.getElementById('progress').value;
    
    if (rangeInputValue > 0 && includeInPassword.length > 0) {

        let generatedPassword = generatePassword(rangeInputValue, characters);
        document.querySelector('#password p').textContent = generatedPassword;

        const forcaSenha = checkPasswordStrength(generatedPassword);
        document.querySelector("strong").textContent = forcaSenha;
        
    }

});