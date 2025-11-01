class Game {
    constructor() {
        this.boxs = document.querySelectorAll('.box');
        this.title = document.querySelector('.title');
        this.again = document.querySelector('.again');
        this.notice = document.querySelector('.notice');
        this.role = "player";
        this.win = false;
    };
    
    init() {
        this.boxs.forEach(box => {
            box.addEventListener("click", (event) => {
                if (this.win === true) {
                    return;
                } else if (this.role === "bot") {
                    this.viewNotice("ليس دورك!");
                } else if (box.innerHTML === "X") {
                    this.viewNotice("اخترت المربع مسبقاً!");
                } else if (box.innerHTML === "O") {
                    this.viewNotice("المربع اختاره البوت!");
                } else if (this.win === false) {
                    box.innerHTML = "X";
                    box.classList.add("bg-blue");
                    this.check();
                };
            });
        });
        
        this.again.addEventListener("click", (event) => {
            this.win = false;
            this.again.classList.remove("show");
            this.again.classList.add("hide");
            this.title.classList.remove("bg-red");
            this.title.classList.remove("bg-blue");
            this.title.classList.remove("bg-win");
            this.title.classList.remove("bg-draw");
            this.boxs.forEach(box => {
                box.innerHTML = "";
                box.classList.remove("bg-red");
                box.classList.remove("bg-blue");
                box.classList.remove("bg-win");
            });
            this.check();
        });
    };
    
    check() {
        if (this.role === "player") {
            var symbol = "X";
        } else {
            var symbol = "O";
        };
        
        if (
            this.boxs[0].innerHTML === symbol &&
            this.boxs[1].innerHTML === symbol &&
            this.boxs[2].innerHTML === symbol
            
            ||
            
            this.boxs[3].innerHTML === symbol &&
            this.boxs[4].innerHTML === symbol &&
            this.boxs[5].innerHTML === symbol
            
            ||
            
            this.boxs[6].innerHTML === symbol &&
            this.boxs[7].innerHTML === symbol &&
            this.boxs[8].innerHTML === symbol
            
            ||
            
            this.boxs[0].innerHTML === symbol &&
            this.boxs[3].innerHTML === symbol &&
            this.boxs[6].innerHTML === symbol
            
            ||
            
            this.boxs[1].innerHTML === symbol &&
            this.boxs[4].innerHTML === symbol &&
            this.boxs[7].innerHTML === symbol
            
            ||
            
            this.boxs[2].innerHTML === symbol &&
            this.boxs[5].innerHTML === symbol &&
            this.boxs[8].innerHTML === symbol
            
            ||
            
            this.boxs[0].innerHTML === symbol &&
            this.boxs[4].innerHTML === symbol &&
            this.boxs[8].innerHTML === symbol
            
            ||
            
            this.boxs[2].innerHTML === symbol &&
            this.boxs[4].innerHTML === symbol &&
            this.boxs[6].innerHTML === symbol
        ) {
            this.win = true;
            if (this.role === "player") {
                this.title.innerHTML = "🎊 مبروك، انت الفائز 🎊";
            } else {
                this.title.innerHTML = "💔 لقد خسرت  💔";
            };
            let ranges = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            ranges.forEach((range) => {
                if (
                    this.boxs[range[0]].innerHTML === symbol &&
                    this.boxs[range[1]].innerHTML === symbol &&
                    this.boxs[range[2]].innerHTML === symbol
                ) {
                    for (let i = 0; i < range.length; i++) {
                        this.boxs[range[i]].classList.add("bg-win");
                    };
                }
            });
            this.again.classList.remove("hide");
            this.again.classList.add("show");
        } else if (
            (function() {
                for (let i = 0; i < this.boxs.length; i++) {
                    if (this.boxs[i].innerHTML === "") {
                        return false;
                    };
                };
                return true;
            }).call(this)
        ) {
            this.win = true;
            this.title.innerHTML = "⭐ تعادل ⭐";
            this.again.classList.remove("hide");
            this.again.classList.add("show");
        } else {
            if (this.role === "player") {
                this.title.innerHTML = "انتظر، دور الذكاء الاصطناعي...";
                this.role = "bot";
                this.playBot();
            } else {
                this.title.innerHTML = "دورك...";
                this.role = "player";
            };
        };
    };
    
    playBot(portion = 1) {
        setTimeout(() => {
            const box = this.boxs[Math.floor(Math.random() * this.boxs.length)];
            if (box.innerHTML === "") {
                box.innerHTML = "O";
                box.classList.add("bg-red");
                this.check();
            } else {
                return this.playBot(portion++);
            };
        }, 2000 / portion);
    };
    
    viewNotice(text) {
        this.notice.innerHTML = text;
        this.notice.classList.remove("hide");
        this.notice.classList.add("show");
        setTimeout(() => {
            this.notice.classList.remove("show");
            this.notice.classList.add("hide");
        }, 1500);
    };
};
const game = new Game();
game.init();