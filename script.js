const main = document.querySelector('#main')
const form = document.querySelector('#form')

let navn = ''
let riktig = []
let index = 0

//spørsmål
const sporsmaal = [{
        audio: true,
        file: '',
        alternativ: [
            'ku', 'elefant', 'tiger'
        ],
        riktigIndex: 1,
    },
    {
        audio: true,
        file: '',
        alternativ: [
            'ku', 'elefant', 'tiger'
        ],
        riktigIndex: 2,
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
        alternativ
    } = sporsmaalet

    console.log(alternativ)
    const svarAlternativ = alternativ.map((elem, i) => {
        const output = ` 
        <label class="check-label left">${elem}
            <input type="radio" checked="checked" name="radio" data-index="${i}">
            <span class="checkmark"></span>
        </label>
        `

        return output
    })

    main.innerHTML = `
        <h1 class="center black-text">Gjett Dyr</h1>

        ${svarAlternativ.join(' ')}
    `



    index++;
}