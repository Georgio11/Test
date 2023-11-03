//add login form

let loginBtn = document.querySelector('.login_btn');
let loginForm = document.querySelector('.login_form');

function openLoginForm() {
    loginForm.classList.add('active');
    loginBtn.classList.add('lock');
};

loginForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    loginFormValidate();
});

//validation login form

function loginFormValidate() {
    let formReq = document.querySelectorAll('.login_req');
    let errorCount = 0;
    for(let i = 0; i < formReq.length; i++) {
        let input = formReq[i];
        formRemoveError(input);
        
        if(input.value === '') {
            formAddError(input);
            errorCount++;
        };

        if(input.classList.contains('email')){
            if (emailTest(input)){
                formAddError(input);
                errorCount++;
            };
        };
    };

    if(errorCount == 0) {
        loginForm.classList.remove('active');
        loginBtn.classList.remove('lock');
        formReq.forEach(input => {
            input.value = '';
        });
    };
};

function formAddError(input) {
    input.parentElement.classList.add('form_error');
};

function formRemoveError(input) {
    input.parentElement.classList.remove('form_error');
};

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
};

//slider

let next = document.querySelector('.next');
let previous = document.querySelector('.previous');
let sliderWrapper = document.querySelector('.slider_wrapper');
let sliderItems = document.querySelectorAll('.slider_item');
let sliderSubmit = document.querySelector('.submit_slider');
let circles = document.querySelectorAll('.circle');
let sliderCount = 0;
let sliderLength = sliderItems.length;

sliderWrapper.style.width = `${100 * sliderLength}%`;

function changeNextBtn() { //add/remove next button
    if(sliderCount == 0) {
        previous.classList.add('lock');
    } else {
        previous.classList.remove('lock');
    }
};

function changeSubmitBtn() { //add/remove submit button
    if(sliderCount == sliderLength - 1) {
        sliderSubmit.classList.add('active');
        next.classList.add('lock');
    } else {
        sliderSubmit.classList.remove('active');
        next.classList.remove('lock');
    }
}

function updateCircles() { //update the number of circles
    circles.forEach((circle, index) => {
        if (index <= sliderCount) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });
}

changeNextBtn();

function rollSlider() { // move slides
    sliderWrapper.style.transform = `translate(-${sliderCount * 100 /sliderLength}%)`;
    changeNextBtn();
    changeSubmitBtn();
    updateCircles(); 
    registrationFormValidate();
};

function previousSlide() {
    if (sliderCount == 0) {
        previous.disabled = true;
    } else {
        sliderCount --;
        previous.disabled = false;
        rollSlider();
        next.style.pointerEvents = 'all';
    };
    next.disabled = false;
};

function nextSlide() {
    if (sliderCount == sliderLength - 1) {
        next.disabled = true;
    } else {
        sliderCount ++;
        next.disabled = false;
        rollSlider();
    }
    previous.disabled = false;
};

//registration form

let registrationForm = document.querySelector('.form_slider');
let locationInput = document.querySelector('.location');
let emailInput = document.querySelector('.slider_email');
let passwordInput = document.querySelector('.slider_password');

let inputFields = [
    {
        input: locationInput,
        index: 0,
    },
    {
        input: emailInput,
        index: 1,
    },
    {
        input: passwordInput,
        index: 2,
    },
];

function locationTest(input) {
    return /^.{4,}$/.test(input.value);
};

function passwordTest(input) {
    return /^.{6,}$/.test(input.value);
};

//registration form validation

function registrationFormValidate() { 
    if (sliderCount >= 2 && sliderCount <= 4) {
        let currentInput = inputFields[sliderCount - 2];
        let inputCount = `inputCount${currentInput.index + 1}`;

        if (window[inputCount] === true) {
            if (sliderCount === 4) {
                sliderSubmit.style.pointerEvents = 'all';
            } else {
                next.style.pointerEvents = 'all';
            }
        } else {
            next.style.pointerEvents = 'none';
            sliderSubmit.style.pointerEvents = 'none';
        };
    };
};

inputFields.forEach((field) => {
    field.input.addEventListener('input', () => {

        if (field.input === locationInput) {
            window[`inputCount${field.index + 1}`] = locationTest(locationInput);
        } else if (field.input === emailInput) {
            window[`inputCount${field.index + 1}`] = !emailTest(emailInput);
        } else if (field.input === passwordInput) {
            window[`inputCount${field.index + 1}`] = passwordTest(passwordInput);
        }

        registrationFormValidate();

        //request settings

        if (window[`inputCount${field.index + 1}`]) {
            formRemoveError(field.input);
            console.log(`The data in the "${field.input.name}" has been verified`);
        } else {
            formAddError(field.input);
            fetch('https://run.mocky.io/v3/f6ca495a-0a08-40de-9889-e73d49d011d2')
            .then(response => response.json())
            .then(data => {
                if (data.errors && data.errors[field.input.name]) {
                    let errorDescription = document.querySelector(`.${field.input.name}-help`);
                    errorDescription.textContent = data.errors[field.input.name][0];
                }
            })
            .catch(error => {
                console.error('Error sending request:', error);
            });
        }
    });
});


function submitForm() {
    registrationForm.submit();
};