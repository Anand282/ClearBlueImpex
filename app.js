var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}


var countrySelect = document.querySelector('.country'),
    stateSelect = document.querySelector('.state'),
    citySelect = document.querySelector('.city')

function loadCountries() {
    countrySelect.innerHTML = '<option selected>Loading countries...</option>';
    fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } })
        .then(response => response.json())
        .then(data => {
            countrySelect.innerHTML = '<option value="">Select Country</option>';
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.iso2;
                option.textContent = country.name;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading countries:', error);
            countrySelect.innerHTML = '<option selected>Error loading countries</option>';
        });

    stateSelect.disabled = true;
    citySelect.disabled = true;
}

function loadStates() {
    stateSelect.disabled = false;
    stateSelect.innerHTML = '<option selected>Loading states...</option>';
    const selectedCountryCode = countrySelect.value;
    citySelect.innerHTML = '<option value="">Select City</option>';
    citySelect.disabled = true;

    fetch(`${config.cUrl}/${selectedCountryCode}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } })
        .then(response => response.json())
        .then(data => {
            stateSelect.innerHTML = '<option value="">Select State</option>';
            data.forEach(state => {
                const option = document.createElement('option');
                option.value = state.iso2;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading states:', error);
            stateSelect.innerHTML = '<option selected>Error loading states</option>';
        });
}

function loadCities() {
    citySelect.disabled = false;
    citySelect.innerHTML = '<option selected>Loading cities...</option>';
    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;

    fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } })
        .then(response => response.json())
        .then(data => {
            citySelect.innerHTML = '<option value="">Select City</option>';
            data.forEach(city => {
                const option = document.createElement('option');
                option.value = city.name;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading cities:', error);
            citySelect.innerHTML = '<option selected>Error loading cities</option>';
        });
}


window.onload = loadCountries
countrySelect.classList.add('select-loading');
countrySelect.classList.remove('select-loading');

// form validation

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    const name = document.getElementById("name");
    const contact = document.getElementById("contact");
    const email = document.getElementById("email");
    const query = document.getElementById("query");

    const nameError = document.getElementById("name-error");
    const contactError = document.getElementById("contact-error");
    const emailError = document.getElementById("email-error");
    const queryError = document.getElementById("query-error");

    const namePattern = /^[A-Za-z\s]+$/;
    const contactPattern = /^\+?\d{1,4}[\s]?\d{3,5}[\s]?\d{3,5}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    name.addEventListener("input", function () {
        if (!name.value.trim()) {
            nameError.textContent = "Name is required.";
            name.style.borderColor = "red";
        } else if (!namePattern.test(name.value)) {
            nameError.textContent = "Name must contain only letters.";
            name.style.borderColor = "red";
        } else {
            nameError.textContent = "";
            name.style.borderColor = "#00A859";
        }
    });

    contact.addEventListener("input", function () {
        if (!contact.value.trim()) {
            contactError.textContent = "Contact number is required.";
            contact.style.borderColor = "red";
        } else if (!contactPattern.test(contact.value)) {
            contactError.textContent = "Contact number must contain only digits.";
            contact.style.borderColor = "red";
        } else {
            contactError.textContent = "";
            contact.style.borderColor = "#00A859";
        }
    });

    email.addEventListener("input", function () {
        if (!emailPattern.test(email.value)) {
            emailError.textContent = "Please enter a valid email address.";
            email.style.borderColor = "red";
        } else {
            emailError.textContent = "";
            email.style.borderColor = "#00A859";
        }
    });

    query.addEventListener("input", function () {
        if (!query.value.trim()) {
            queryError.textContent = "Query is required.";
            query.style.borderColor = "red";
        } else {
            queryError.textContent = "";
            query.style.borderColor = "#00A859";
        }
    });


    form.addEventListener("submit", function (e) {
        let isValid = true;


        if (!name.value.trim()) {
            nameError.textContent = "Name is required.";
            name.style.borderColor = "red";
            isValid = false;
        } else if (!namePattern.test(name.value)) {
            nameError.textContent = "Name must contain only letters.";
            name.style.borderColor = "red";
            isValid = false;
        }


        if (!contact.value.trim()) {
            contactError.textContent = "Contact number is required.";
            contact.style.borderColor = "red";
            isValid = false;
        } else if (!contactPattern.test(contact.value)) {
            contactError.textContent = "Contact number must contain only digits.";
            contact.style.borderColor = "red";
            isValid = false;
        }


        if (!email.value.trim()) {
            emailError.textContent = "Email is required.";
            email.style.borderColor = "red";
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            emailError.textContent = "Enter a valid email.";
            email.style.borderColor = "red";
            isValid = false;
        }


        if (!query.value.trim()) {
            queryError.textContent = "Query is required.";
            query.style.borderColor = "red";
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }


    });

});


var form = document.getElementById('sheetdb-form');

form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: 'Form Submitted!',
            text: 'Thank you for your submission.',
            confirmButtonText: 'Done'
        }).then(() => {
            form.reset(); 
            const inputs = form.querySelectorAll("input, textarea, select");
            inputs.forEach(input => input.style.borderColor = "");
            const errors = form.querySelectorAll(".error");
            errors.forEach(error => error.textContent = "");
        });
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later.',
        });
    });
});
