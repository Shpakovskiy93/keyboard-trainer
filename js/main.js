const text = `Не верить императору Константину глупо. В описываемую эпоху Византия переживала далеко не лучшие времена, и событие такого масштаба, как приобщение к истинной вере северных варваров, бесперечь тревоживших рубежи империи, просто не могло остаться без комментариев.
Не верить императору Константину глупо. В описываемую эпоху Византия переживала далеко не лучшие времена, и событие такого масштаба, как приобщение к истинной вере северных варваров, бесперечь тревоживших рубежи империи, просто не могло остаться без комментариев.`;


const input = document.querySelector('input');
const letters = Array.from(document.querySelectorAll('[data-letters]'));
const specs = Array.from(document.querySelectorAll('[data-spec]'));


const party = createParty(text);
console.log(party);
init();

function init() {
    input.addEventListener('keydown', keydownHandler);
    input.addEventListener('keyup', keyupHandler);
}

function keydownHandler(event) {
    event.preventDefault()
    
    const letter = letters.find((x) => x.dataset.letters.includes(event.key));
    if(letter) {
        letter.classList.add('pressed');
        return
    }

    let key = event.key.toLowerCase();
    if(key === ' ') {
        key = 'space'
    }

    const ownSpace = specs.filter((x) => x.dataset.spec === key);
    if(ownSpace.length) {
        ownSpace.forEach(spec => spec.classList.add('pressed'));
        return;
    }

    console.warn(event);
}

function keyupHandler(event) {
    event.preventDefault()
    
    const letter = letters.find((x) => x.dataset.letters.includes(event.key));
    if(letter) {
        letter.classList.remove('pressed');
        return
    }

    let key = event.key.toLowerCase();
    if(key === ' ') {
        key = 'space'
    }

    const ownSpace = specs.filter((x) => x.dataset.spec === key);
    if(ownSpace.length) {
        ownSpace.forEach(spec => spec.classList.remove('pressed'));
        return;
    }
}

function createParty(text) {
    const party = {
        text,
        strings: [],
        maxStringLangth: 70,
        maxShowStrings: 3,
        currentStringIndex: 0,
        currentPrintIndex: 0,
        erros: [],
    }

    party.text = party.text.replace(/\n/g, '\n ');
    const words = party.text.split(' ')

    let string = [];
    for(let word of words) {
        const newStringLength = [...string, word].join(' ').length + !word.includes('\n')

        if(newStringLength > party.maxStringLangth) {
            party.strings.push(string.join(' ') + ' ')
            string = []
        }

        string.push(word)

        if(word.includes('\n')) {
            party.strings.push(string.join(' '))
            string = []
        }
    }

    if(string.length) {
        party.strings.push(string.join(' '))
    }

    return party;
}