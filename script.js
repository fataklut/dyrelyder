const main = document.querySelector('#main')
const form = document.querySelector('#form')

let navn = ''
let gjetting = []
let index = 0

//spørsmål
const sporsmaal = [{
        audio: true,
        file: 'elefant.wav',
        alternativ: [
            'ku', 'elefant', 'tiger'
        ],
        riktigIndex: 1,
    },
    {
        audio: true,
        file: 'ku.wav',
        alternativ: [
            'ku', 'elefant', 'tiger'
        ],
        riktigIndex: 0,
    },
]


form.addEventListener('submit', formSubmit, false)

//on submit
function formSubmit(e) {
    e.preventDefault()
    registrerNavn()
    changeSporsmaal()
}

//registrere navn
function registrerNavn() {
    const navnInp = document.querySelector('#navn')
    navn = navnInp.value
}

//endrer sporsmål
function changeSporsmaal() {
    const sporsmaalet = sporsmaal[index]
    const {
        file,
        alternativ,
        audio
    } = sporsmaalet


    const svarAlternativ = alternativ.map((elem, i) => {
        const output = ` 
        <label class="check-label left">${elem}
            <input type="radio" name="radio" data-index="${i}">
            <span class="checkmark"></span>
        </label>
        `

        return output
    })


    const fileElement = hentFil(file, audio)

    main.innerHTML = `
        <h1 class="center black-text">Gjett Dyr</h1>
        ${fileElement}
        <div>
        ${svarAlternativ.join(' ')}
        </div>
        <button id="neste" class="btn filled blue center-block"> Neste </button>
    `

    const nestKnapp = document.querySelector('#neste')
    nestKnapp.addEventListener('click', gaaVidere, false)
}

//hent fil
function hentFil(navn, audio) {
    if (audio === true) {
        return `
            <audio nocontrols autoplay>
                <source src = "${navn}"
            type = "audio/mpeg">Your browser does not support the audio element. </audio>
        `
    }

    //else

}

function gjett() {
    const selected = document.querySelector('input:checked')
    const id = selected.getAttribute('data-index')
    gjetting[index] = id
}

//gå videre
function gaaVidere() {
    gjett()
    index++;
    if (index < sporsmaal.length) {

        changeSporsmaal()
    }
}