function form() {
    function emailIsValid(str) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return reg.test(str) ? true : false;
    }

    function nameIsValid(str) {
        return String(str).trim().length >= 2 ? true : false;
    }

    function phoneIsValid(str) {
        let reg = /[0-9]+$/;
        return reg.test(String(str)) && str.length >= 10 ? true : false;
    }

    function showMessage(str, isError = false) {
        let messageBox = document.querySelector(".form-section__message");
        messageBox.classList.add("form-section__message--active");
        messageBox.textContent = str;

        if (isError) {
            messageBox.classList.add("form-section__message--error");
        } else {
            messageBox.classList.remove("form-section__message--error");
        }
    }

    const message = {
        empty: "Пожалуйста, заполните все обязательные поля",
        ok: "Спасибо! Ваши заявка отправлена логисту!",
        email: "Укажите, пожалуйста, корректный email",
        name: "Укажите, пожалуйста, имя",
        phone: "Укажите, пожалуйста, корректный номер телефона",
        error: "Произошла ошибка!"
    };

    function getFormInfo(form) {
        let data = {};
    
        for (let input of form.elements) {
            const key = input.getAttribute("name");
            if (key !== null) {
                data[key] = input.value;
            }
        }
    
        return data;
    }

    function sendEmail(user) {
        const POST_URL = "./post.php"       // <---  ПОМЕНЯТЬ URL
        const data = JSON.stringify(user);
    
        let request = new XMLHttpRequest();
        request.open("POST", POST_URL);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        request.send(data);
    
        showMessage("Подождите...");
        
        request.addEventListener("load", () => {
            if (request.status === 200) {
                showMessage(message.ok);
            } else {
                showMessage(message.error, true);
            }
        });
    }

    let form = document.forms.mainForm;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        for (let input of form.elements) {
            const key = input.getAttribute("name");
    
            if (key === "email") {
                if (!emailIsValid(input.value)) {
                    showMessage(message.email, true);
                    return;
                }
            }
            else if (key == "name") {
                if (!nameIsValid(input.value)) {
                    showMessage(message.name, true);
                    return;
                }
            }
            else if (key == "phone") {
                if (!phoneIsValid(input.value)) {
                    showMessage(message.phone, true);
                    return;
                }
            }
        }
    
        sendEmail(getFormInfo(form));
    });
}

form();