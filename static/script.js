class Request {

    constructor(form) {
        console.log("Request init")
        this.form = form;
    }
    send = async (ev) => {
        ev.preventDefault()
        const formData = new FormData(this.form);
        const params = new URLSearchParams(formData);
        console.log(params.toString())
        const url = "/fcgi-bin/hello-world.jar?" + params.toString();
        try {
            const response = await fetch(url);
            if (response.ok) {
                errorDiv.hidden = true
                try {
                    const result = await response.json();
                    console.log(result);
                } catch (error) {
                    console.error('Ошибка парсинга JSON', error)
                }
            } else {
                try {
                    const result = await response.json();
                    errorDiv.hidden = false
                    errorDiv.textContent = result.error.toString()
                } catch (error) {
                    console.error('Ошибка парсинга JSON', error)
                }
            }
        } catch (error) {
            console.error('Ошибка', error)
        }
    }

}

const errorDiv = document.getElementById("error")

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("myform");
    const req = new Request(form);
    form.addEventListener("submit", req.send);
});