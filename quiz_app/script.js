// OOP: Nesne Tabanlı Programlama
// Object

// Sınıf, Constructor => nesne * 30
// ES5, ES6, ES7

const quiz = new Quiz(sorular);
const ui = new UI()

// 3
ui.btn_start.addEventListener("click", function() {
    // 4
    ui.quiz_box.classList.add("active");
    // css ekledikten sonra yukarıdaki kod
    // 24
    startTimer(10)
    // 27
    startTimerLine();
    // 6
    ui.soruGoster(quiz.soruGetir());
    // 10
    // 14
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btn_next.classList.remove("show");
})

// 7
ui.btn_next.addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        // 24
        clearInterval(counter);
        clearInterval(counterLine) // 29
        startTimer(10);
        // 28
        startTimerLine();
        ui.soruGoster(quiz.soruGetir());
        // 15
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        // 12 
        ui.btn_next.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine) // 29
        // 18
        ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        // 20
        ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});

// 21
ui.btn_quit.addEventListener("click", function(){
    window.location.reload();  // sayfa tekrar yüklenir
})
// 22
ui.btn_replay.addEventListener("click", function(){
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
})

// // 8
// const option_list = document.querySelector(".option_list");
// // 9
// const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>'
// const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>'


// 9
function optionSelected(option){
    // 25
    clearInterval(counter);
    clearInterval(counterLine) // 29
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)){
        // 17
        quiz.dogruCevapSayisi += 1;
        // 17 yukarıda
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon)
    }else{
        option.classList.add("incorrect")
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon)
    }

    for(let i = 0; i < ui.option_list.children.length; i++){
        ui.option_list.children[i].classList.add("disabled")
    }

    // 11
    ui.btn_next.classList.add("show");
}

// 23
let counter;
function startTimer(time){
    counter = setInterval(timer, 1000)

    function timer(){
        ui.time_second.textContent = time;
        time--;

        if(time < 0){
            clearInterval(counter);

            ui.time_text.textContent = "Süre Bitti";

            let cevap = quiz.soruGetir().dogruCevap;

            for(let option of ui.option_list.children){
                if(option.querySelector("span b").textContent == cevap){
                    option.classList.add("correct")
                    option.insertAdjacentHTML("beforeend", ui.correctIcon)
                }
                option.classList.add("disabled");
            }
            ui.btn_next.classList.add("show")
        }
    }
}

// 26
let counterLine;
function startTimerLine() {
    let line_width = 0;

   counterLine = setInterval(timer, 100);

    function timer() {
        line_width += 5;
        ui.time_line.style.width = line_width + "px";

        if(line_width > 549){
            clearInterval(counterLine)
        }
    }
}