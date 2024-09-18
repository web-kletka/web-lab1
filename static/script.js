class Interaction {
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
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Если статус ответа 200, парсим JSON
                    } else {
                        return response.json().then(result => {
                            throw new Error(result.error.toString()); // Обработка ошибок с сервера
                        });
                    }
                })
                .then(result => {
                    if (result.got.toString() === "true") {
                        outputText.textContent = "Попал";
                    } else {
                        outputText.textContent = "Промазал";
                    }

                    num = num + 1;
                    this.addNewRow(num, params.get("x"), params.get("y"), params.get("r"), result.got.toString(), result.date, result.time);
                    console.log(result);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    outputText.textContent = error.message;
                });

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

    addNewRow = (num, x, y, r, result, time, scrtime) => {

        console.log("tbody start add")
        var row = tBody.insertRow(tBody.rows.length);

// Создаем ячейки и добавляем их в строку
        var numTD = document.createElement("td");
        var xyrTD = document.createElement("td");
        var resTD = document.createElement("td");
        var timeTD = document.createElement("td");
        var scrtimeTD = document.createElement("td");
        row.appendChild(numTD);
        row.appendChild(xyrTD);
        row.appendChild(resTD);
        row.appendChild(timeTD);
        row.appendChild(scrtimeTD);

        numTD.innerHTML = num;
        xyrTD.innerHTML = x + ", " + y + ", " + r
        if (result === "true"){
            resTD.innerHTML = "Попал";
        }
        else {
            resTD.innerHTML = "Промазал";
        }
        timeTD.innerHTML = time
        scrtimeTD.innerHTML = scrtime
        console.log("tbody add")
    }


}



const outputText = document.getElementById("out_put_text")
const tBody = document.getElementById("myTBody")
let num = 0;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector("form");
    const req = new Interaction(form);
    form.addEventListener("submit", req.send);
});