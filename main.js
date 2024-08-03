let casa = document.querySelectorAll('.incasa');
let tras = document.querySelectorAll('.intrasferta');
let result = document.querySelectorAll('.risultati');
let bottone = document.querySelector('.bottone');
let output = document.querySelector('.outputlayout');
let selector = document.querySelector('select');

let request = new XMLHttpRequest();
request.open('GET', './turno.json');
request.responseType = 'json';
request.send();
request.onload = function () {
    let fileJson = request.response;
    for (let i = 0; i <= fileJson.length; i++) {
        if (i == 0) {
            let select = document.querySelector('select');
            let text = document.createTextNode("");
            let option = document.createElement('option');
            option.appendChild(text);
            select.appendChild(option);
        } else {
            select = document.querySelector('select');
            text = document.createTextNode(Number(i));
            option = document.createElement('option');
            option.appendChild(text);
            select.appendChild(option);
        }
    }
}

function calcola() {

    function clas(casa, tras) {
        let arrayclas = new Array;
        let poscasa = Number(casa[1].value);
        let postras = Number(tras[1].value);
        if (poscasa > postras) {
            arrayclas[0] = 0;
            arrayclas[1] = 0;
            arrayclas[2] = 1;
            if ((poscasa - postras) < 6)
                arrayclas[1] = 1;
        }
        else {
            arrayclas[0] = 1;
            arrayclas[1] = 0;
            arrayclas[2] = 0;
            if ((postras - poscasa) < 6)
                arrayclas[1] = 1;
        }
        return arrayclas;
    }

    function punt(casa, tras) {
        let arraypunt = new Array;
        let cv = Number(casa[2].value);
        let cn = Number(casa[3].value);
        let cp = Number(casa[4].value);
        let tv = Number(tras[2].value);
        let tn = Number(tras[3].value);
        let tp = Number(tras[4].value);
        arraypunt[0] = (cv + tp);
        arraypunt[1] = (cn + tn);
        arraypunt[2] = (cp + tv);
        return arraypunt;
    }
    output.style = "display: inline-flex";
    arrayclas = clas(casa, tras);
    arraypunt = punt(casa, tras);
    for (let i = 0; i < 3; i++) {
        result[i].value = ((100 / 2) * ((arrayclas[i] / (arrayclas[0] + arrayclas[1] + arrayclas[2])) + ((arraypunt[i] / (arraypunt[0] + arraypunt[1] + arraypunt[2]))))).toFixed(3);
    }
}

selector.onchange = function seleziona() {
    let num = document.getElementById('selector');
    let numero = Number(num.value - 1);
    let request = new XMLHttpRequest();
    request.open('GET', './turno.json');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        let fileJson = request.response;
        if (num.value === "") {
            for (let i = 0; i < casa.length; i++) {
                casa[i].value = "";
                tras[i].value = "";
            }
            output.style = "display: none";
        } else {
            casa[0].value = String(fileJson[numero].nomecasa);
            casa[1].value = Number(fileJson[numero].posizionecasa);
            casa[2].value = Number(fileJson[numero].partitevintecasa);
            casa[3].value = Number(fileJson[numero].partitenullecasa);
            casa[4].value = Number(fileJson[numero].partitepersecasa);
            casa[5].value = Number(fileJson[numero].golfatticasa);
            casa[6].value = Number(fileJson[numero].golsubiticasa);
            tras[0].value = String(fileJson[numero].nometras);
            tras[1].value = Number(fileJson[numero].posizionetras);
            tras[2].value = Number(fileJson[numero].partitevintetras);
            tras[3].value = Number(fileJson[numero].partitenulletras);
            tras[4].value = Number(fileJson[numero].partitepersetras);
            tras[5].value = Number(fileJson[numero].golfattitras);
            tras[6].value = Number(fileJson[numero].golsubititras);
            calcola();
        }
    }
}
bottone.addEventListener('click', calcola);