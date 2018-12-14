const main = document.querySelector("#main");
const form = document.querySelector("#form");

let navn = "";
let gjetting = [];
let index = 0;

//spørsmål
let sporsmaal = [
  {
    audio: true,
    file: "elefant.wav",
    alternativ: ["Ku", "Elefant", "Tiger"],
    riktigIndex: 1
  },
  {
    audio: true,
    file: "ku.wav",
    alternativ: ["Ku", "Elefant", "Tiger"],
    riktigIndex: 0
  },
  {
    audio: true,
    file: "gris.wav",
    alternativ: ["Hest", "Katt", "Gris"],
    riktigIndex: 2
  },
  {
    audio: false,
    file: "Video1.mp4",
    alternativ: ["Sjiraff", "Elefant", "Hest"],
    riktigIndex: 0
  },
  {
    audio: false,
    file: "Video2.mp4",
    alternativ: ["Katt", "Løve", "Tiger"],
    riktigIndex: 1
  },
  {
    audio: false,
    file: "Video4.mp4",
    alternativ: ["Enhjørning", "Flodhest", "Elefant"],
    riktigIndex: 2
  }
];

sporsmaal = shuffle(sporsmaal);

form.addEventListener("submit", formSubmit, false);

//on submit
function formSubmit(e) {
  e.preventDefault();
  registrerNavn();
  changeSporsmaal();
}

//registrere navn
function registrerNavn() {
  const navnInp = document.querySelector("#navn");
  navn = navnInp.value;

  if (navn.toUpperCase() === "MARIE") {
    navn = "Mari";
  }
}

//endrer rekkefølgen på spørsmål
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//endrer sporsmål
function changeSporsmaal() {
  const sporsmaalet = sporsmaal[index];
  const { file, alternativ, audio } = sporsmaalet;

  let alleredeValgt;
  try {
    alleredeValgt = gjetting[index];
  } catch (err) {
    alleredeValgt = null;
  }

  const svarAlternativ = alternativ.map((elem, i) => {
    checked = "";
    if (i == alleredeValgt) {
      checked = "checked";
    }
    const output = ` 
        <label class="check-label left">${elem}
            <input type="radio" name="radio" data-index="${i}" ${checked}>
            <span class="checkmark"></span>
        </label>
        `;

    return output;
  });

  const fileElement = hentFil(file, audio);

  //om det skal stå neste eller fullfør
  let knappeInnhold = "Neste";

  if (index + 1 >= sporsmaal.length) {
    knappeInnhold = "Fullfør";
  }

  //tilbakeknapp
  let tilbakeknapp = `<button id="tilbake" class="btn flat small blue center-block">Tilbake</button>`;
  if (index === 0) {
    tilbakeknapp = "";
  }
  main.style.opacity = 0;

  setTimeout(() => {
    main.innerHTML = `
          <h1 class="center black-text">Gjett Dyr, ${index + 1} av ${
      sporsmaal.length
    }</h1>
          ${fileElement}
          <button id="spillIgjen" class="btn flat blue center-block">Spill igjen</button>
          <div class="space"></div>
          <div>
          ${svarAlternativ.join(" ")}
          </div>
          <div class="space"></div>
          <button id="neste" class="btn filled blue center-block">${knappeInnhold}</button>
          ${tilbakeknapp}
      `;

    const spillKnapp = document.querySelector("#spillIgjen");
    spillKnapp.addEventListener("click", spillPaNytt, false);

    const nestKnapp = document.querySelector("#neste");
    nestKnapp.addEventListener("click", gaaVidere, false);

    const tilbakKnapp = document.querySelector("#tilbake");
    if (tilbakKnapp !== null) {
      tilbakKnapp.addEventListener("click", gaaTilbake, false);
    }
    main.style.opacity = 1;
  }, 500);
}

//hent fil
function hentFil(navn, audio) {
  if (audio === true) {
    return `
            <audio nocontrols autoplay id="audio">
                <source src = "${navn}"
            type = "audio/mpeg">Nettleseren din støtter ikke audio elementer</audio>
        `;
  }

  //else

  return `
    <video nocontrols autoplay id="audio">
        <source src="${navn}" type="video/mp4">
        Nettleseren din støtter ikke video elementer
    </video>
  `;
}

//Spill på nytt
function spillPaNytt() {
  const audioElem = document.querySelector("#audio");
  audioElem.currentTime = 0;
  audioElem.play();
}

function gjett() {
  let id;
  try {
    const selected = document.querySelector("input:checked");
    id = selected.getAttribute("data-index");
  } catch (err) {
    id = null;
  }
  gjetting[index] = id;
}

function regnPoeng() {
  let poeng = 0;
  let sum = 0;

  sporsmaal.forEach((elem, i) => {
    const gjetteIndex = gjetting[i];

    if (gjetteIndex == elem.riktigIndex) {
      poeng++;
    }
    sum++;
  });

  return {
    poeng,
    sum
  };
}

//gå videre
function gaaVidere() {
  gjett();
  if (index + 1 < sporsmaal.length) {
    index++;
    changeSporsmaal();
  } else {
    visSisteSide();
  }
}

//gå tilbake
function gaaTilbake() {
  gjett();
  if (index - 1 >= 0) {
    index--;
    changeSporsmaal();
  }
}

//siste side
function visSisteSide() {
  const { poeng, sum } = regnPoeng();

  const prosent = (100 * poeng) / sum;

  let melding = "";

  if (prosent === 100) {
    melding = `Alt riktig, ${navn}. Bra jobba`;
  } else if (prosent >= 75) {
    melding = `Ok, ${navn}. Du gjorde det greit`;
  } else if (prosent > 50) {
    melding = `Over halveis, ${navn}. Du gjorde noe`;
  } else {
    melding = `Ja, ${navn}. Øv mer`;
  }

  main.innerHTML = `
        <h1 class = "center black-text">${melding}</h1>
        <p class="center black-text">Du fikk ${poeng} av ${sum}</p>
        <div class="space"></div>
        <div class="graf-parent standing" style="height: 300px">
            <div class="graf white-text center" data-height="${prosent}%" style="height: 0%;">Du fikk ${poeng}</div>
            <div class="graf white-text center" data-height="100%" style="height: 0%;">Total: ${sum}</div>
        </div>
        <div class="space"></div>
        <button id="restart" class="btn filled blue center-block">Start på nytt</button>
    `;

  document.querySelector("#restart").addEventListener("click", restart, false);

  setTimeout(grafHoyde, 1);
}

function grafHoyde() {
  const grafer = document.querySelectorAll(".graf");

  grafer.forEach(elem => {
    const height = elem.getAttribute("data-height");
    elem.style.height = height;
  });
}

//prøve på nytt
function restart() {
  navn = "";
  gjetting = [];
  index = 0;

  sporsmaal = shuffle(sporsmaal);

  main.innerHTML = `
  <form action="" id="form">

  <label for="">Navn
      <input type="text" class="input" id="navn" placeholder="Skriv navn..." required>
  </label>

  <button type="submit" class="btn filled blue center-block">Start</button>
</form>
  `;

  const navnForm = document.querySelector("#form");
  navnForm.addEventListener("submit", formSubmit, false);
}
