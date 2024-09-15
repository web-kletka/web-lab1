class Request {
    constructor(form) {
        console.log("Request init")
        this.form = form;
    }
    send = async (ev) => {
        ev.preventDefault()
        const formData = new FormData(this.form);
        const params = new URLSearchParams(formData);
        console.log(params.get("r"))
        console.log(params.toString())
        if (!this.validate(params)) return
        console.log("params ok")
        const url = "/fcgi-bin/hello-world.jar?" + params.toString();
        try {
            const response = await fetch(url);
            if (response.ok) {
                try {
                    const result = await response.json();

                    if (result.got.toString() === "true"){
                        outputText.textContent = "Попал";
                    }
                    else {
                        outputText.textContent = "Промазал";
                    }
                    console.log(result);
                } catch (error) {
                    console.error('Ошибка парсинга JSON', error)
                }
            } else {
                try {
                    const result = await response.json();
                    outputText.hidden = false
                    outputText.textContent = result.error.toString()
                } catch (error) {
                    console.error('Ошибка парсинга JSON', error)
                }
            }
        } catch (error) {
            console.error('Ошибка', error)
        }
    }

    validate = (params) => {
        let x = params.get("x");
        let y = params.get("y");
        let r = params.get("r");
        let result = "";
        console.log(x, y, r);

        if (x == null){
            result = "ERROR: x = null";
            console.log("ERROR: x = null");
        }
        if (y === ''){
            result = "ERROR: y = ''";
            console.log("ERROR: y = ''");
        }
        console.log(y, typeof y, Number.isNaN(y))
        if (Number.isNaN(Number(y))){
            result = "ERROR: y not num";
            console.log("ERROR: y not num");
        }
        if(-3 > y || y > 3){
            result = "y not between -3 and 3";
            console.log("y not between -3 and 3");
        }
        if (r == null){
            result = "ERROR: r = null";
        }

        if (result === "")
            return true;
        else {
            outputText.hidden = false
            outputText.textContent = result;
            return false;
        }
    }
}

const outputText = document.getElementById("out_put_text")


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector("form");
    const req = new Request(form);
    form.addEventListener("submit", req.send);
});