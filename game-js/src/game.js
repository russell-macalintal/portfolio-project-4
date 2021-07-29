class Game {
    // Resets 'game-window' element to empty div
    static clearWindow(html_elem) {
        html_elem.innerHTML = "";
    }

    // Fetches and shows difficulty levels at the start of a new game
    static selectNewGame(user) {
        const game_window = document.getElementById('game-window');
        let div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = "SELECT DIFFICULTY LEVEL";
        game_window.appendChild(div);

        fetch(DIFFICULTIES_URL)
            .then( response => response.json() )
            .then( function(diff_obj) {
                const diff_arr = diff_obj['data'];

                for(const elem of diff_arr) {
                    const btn = document.createElement("button");
                    btn.innerHTML = `${elem['attributes']['level']} - ${elem['attributes']['grid_row']}x${elem['attributes']['grid_col']}`;
                    btn.addEventListener('click', function() {
                        user.gameDifficulty = elem['attributes']['level'];
                        Game.clearWindow(game_window);
                        Game.selectDifficulty(elem['attributes']['grid_row'], elem['attributes']['grid_col'], elem['attributes']['level']);
                        // Set memory board review timer in seconds
                        let t = 0;
                        Game.displayCountdown(t);
                        window.setTimeout(function() {
                            Game.startGame(user)
                        }, (t+1)*1000);
                    })
                    game_window.appendChild(btn);
                }
            })
    }

    // Select card collection based on difficulty levels
    static selectDifficulty(row, col, level) {
        let cards;
        switch(level) {
            case 'Easy':
                cards = easy_cards;
                break;
            case 'Medium':
                cards = medium_cards;
                break;
            case 'Hard':
                cards = hard_cards;
                break;
        }
        let shuffled_cards = this.shuffle(cards);
        this.renderGrid(row, col, shuffled_cards);

    }

    // Standard Fisher-Yates shuffle algorithm
    static shuffle(cards) {
        let currentIndex = cards.length;
        let randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
        }

        return cards;
    }

    // Create card deck grid
    static renderGrid(row, col, cards) {
        const game_window = document.getElementById('game-window');
        // Card counter
        let k = 0;   
        let c = col.toString();
        for (let i = 0; i < row; i++) {
            let row = document.createElement('div');
            row.setAttribute('class', 'row');
            for (let j = 0; j < col; j++) {
                let col = document.createElement('div');
                col.classList.add('column', 'card', `${cards[k]}`, `col-${c}`);
                col.setAttribute('type', `${cards[k]}`);
                k++;
                row.appendChild(col);
            }
            game_window.appendChild(row);
        }
    }

    // Show overlay with countdown timer
    static displayCountdown(t) {
        let timer_text = document.querySelector("#overlay-text");
        document.querySelector("#overlay").style.display = 'block';
        let timer = setInterval(function() {
            timer_text.innerHTML = `${t}`;
            t -= 1;
            if(t === -1) {
                clearInterval(timer);
                timer_text.innerHTML = "";
                document.querySelector("#overlay").style.display = 'none';
            }
        }, 1000);
    }

    // Gray out all cards and hide text
    static hideCards() {
        let all_cards = document.querySelectorAll(".card");
        all_cards.forEach(function(card) {
            card.classList.add('enable', 'facedown');
        });
    }

    static startGame(user) {
        // Reset list of all opened cards, list of matched cards, and user score
        let openCards = [];
        let moves = 0;
        let matchCards = [];
        user.current_score = 0;

        // Unhide Game Info elements
        const moves_html = document.getElementById("moves");
        const timer = document.getElementById("timer");
        const finish = document.getElementById("finish");
        const submit_score = document.getElementById("submit-score");
        moves_html.classList.remove("hidden");
        timer.classList.remove("hidden");

        this.hideCards();
        let t_interval = this.startTimer();
        timer.innerHTML = `TIME ELAPSED:<br>00:00`;
        moves_html.innerHTML = `<br>MOVES:<br>${moves}`;

        let all_cards = document.querySelectorAll(".card");
        const n_cards = all_cards.length;
        all_cards.forEach(function(card) {
            card.addEventListener('click', function() {
                this.classList.remove('enable', 'facedown');
                this.classList.add('disable', 'faceup');
                openCards.push(this);
                if(openCards.length === 2) {
                    moves += 1;
                    moves_html.innerHTML = `<br>MOVES:<br>${moves}`;
                    if(openCards[0].getAttribute('type') === openCards[1].getAttribute('type')) {
                        // Add cards into list of matched cards
                        matchCards.push(openCards[0]);
                        matchCards.push(openCards[1]);
                        openCards = [];
                    } else {
                        // Reset unmatched cards for the next turn
                        setTimeout( function() {
                            openCards[0].classList.remove('disable', 'faceup');
                            openCards[1].classList.remove('disable', 'faceup');
                            openCards[0].classList.add('enable', 'facedown');
                            openCards[1].classList.add('enable', 'facedown');
                            openCards = [];
                        }, 500);
                    }
                    
                }
                if(matchCards.length === n_cards) {
                    clearInterval(t_interval);
                    let final_minute = parseInt(timer.innerHTML.split(':')[1].split('>')[1]);
                    let final_sec = parseInt(timer.innerHTML.split(':')[2]);
                    let total_time = final_minute*60 + final_sec;
                    finish.classList.remove("hidden");
                    submit_score.classList.remove("hidden");
                }

            })
        })
        console.log(user);
    }

    static startTimer() {
        const timer = document.getElementById('timer');
        let sec = 0;
        let min = 0;
        let t_interval = setInterval(function() {
            if(sec < 10) {
                timer.innerHTML = `TIME ELAPSED:<br>0${min}:0${sec}`;
            } else {
                timer.innerHTML = `TIME ELAPSED:<br>${min}:${sec}`;
            }
            sec++;
            if(sec === 60) {
                min++;
                sec = 0;
            }
        }, 1000);
        return t_interval;
    }

    // Fetches and shows user scores in descending order
    static getLeaderboards() {
        fetch(SCORES_URL)
            .then( response => response.json() )
            .then( function(scores_obj) {
                const scores_arr = scores_obj['data'];
                const s_arr = [];

                for(const elem of scores_arr) {
                    const s_obj = {
                        'score': elem['attributes']['score'],
                        'username': elem['attributes']['user']['username'],
                        'difficulty': elem['attributes']['difficulty']['level']
                    }
                    
                    s_arr.push(s_obj);
                }

                const ordered_scores = s_arr.sort(function(a, b) {
                    return b['score'] - a['score'];
                })

                Game.renderScoreBoard(ordered_scores)
            })
    }

    static renderScoreBoard(sorted_arr) { 
        const game_window = document.getElementById('game-window');

        // Create leaderboards/user-scoreboard table
        const table = document.createElement('table');

        // Create table headers
        const thead = table.createTHead();
        const t_row = thead.insertRow();
        const keys = Object.keys(sorted_arr[0]);

        for(const key of keys) {
            const th = document.createElement('th');
            th.innerHTML = key.toUpperCase();
            t_row.appendChild(th);
        }

        // Create table rows containing user/score information
        const tbody = table.createTBody();
        for(const elem of sorted_arr) {
            const row = tbody.insertRow();
            for(const key in elem) {
                const cell = row.insertCell();
                cell.innerHTML = elem[key];
            }
        }

        game_window.appendChild(table);
    }
}

