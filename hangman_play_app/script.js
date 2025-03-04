const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container')
const message_el = document.getElementById('success-message')
const wrongLetters_el = document.getElementById('wrong-letters')
const items = document.querySelectorAll('.item');
const message_ell = document.getElementById('message');
const btn = document.getElementById('play-again')

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord(){
    const words = ["javascrıpt", "java", "python", "css", "html"];
    return words[Math.floor(Math.random() * words.length)]
}

function displayWord(){

    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
                <div class="letter"> 
                    ${correctLetters.includes(letter) ? letter : ''} 
                </div>`).join('')}
    `;
    const w = (word_el.innerText.replace(/\n/g,''));
    if (w === selectedWord){
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler kazandınız.'
    }
}

function updateWromgLetters(){
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı harfler</h3>':''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    items.forEach((items,index)=>{
        const errorCount = wrongLetters.length;

        if(index < errorCount){
            items.style.display = 'block';
        }else{
            items.style.display = 'none';
        }
    })

    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        message_el.innerText = 'Maalesef kaybettiniz.'
    }
}

function displayMessage(){
    message_ell.classList.add('show');

    setTimeout(function(){
        message_ell.classList.remove('show')
    }, 2000);
}

btn.addEventListener('click', function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWromgLetters();

    popup.style.display = 'none';
})

window.addEventListener('keydown', function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
                
            }
        }else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWromgLetters()
            }else{
                displayMessage();
            }
        }
    }
})

displayWord();