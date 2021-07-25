class Game {

    // Resets 'game-window' element to empty div
    static clearWindow(html_elem) {
        html_elem.innerHTML = "";
    }

    // Fetches and shows difficulty levels at the start of a new game
    static startNewGame(user, html_elem) {
        fetch(DIFFICULTIES_URL)
            .then( response => response.json() )
            .then( function(diff_obj) {
                const diff_arr = diff_obj['data'];

                for(const elem of diff_arr) {
                    const btn = document.createElement("button");
                    btn.innerHTML = `${elem['attributes']['level']} - ${elem['attributes']['grid_row']}x${elem['attributes']['grid_col']}`;
                    btn.addEventListener('click', function() {
                        user.gameDifficulty = elem['attributes']['level'];
                        Game.clearWindow(html_elem);
                        Game.renderBoard(elem['attributes']['grid_row'], elem['attributes']['grid_col'], elem['attributes']['level'], user, html_elem);
                    })
                    html_elem.appendChild(btn);
                }
            })
    }

    static renderBoard(row, col, level, user, html_elem) {
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
        this.createGrid(row, col, shuffled_cards, html_elem);
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
    static createGrid(row, col, cards, html_elem) {
        // Card counter
        console.log(cards);
        let k = 0;   
        let c = col.toString();
        for (let i = 0; i < row; i++) {
            let row = document.createElement('div');
            row.setAttribute('class', 'row');
            for (let j = 0; j < col; j++) {
                let col = document.createElement('div');
                col.classList.add('column', 'card', `${cards[k]}`, `col-${c}`);
                k++;
                row.appendChild(col);
            }
            html_elem.appendChild(row);
        }
    }

    // Fetches and shows user scores in descending order
    static getLeaderboards(html_elem) {
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

                Game.renderScoreBoard(ordered_scores, html_elem)
            })

    }

    static renderScoreBoard(sorted_arr, html_elem) { 
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

        html_elem.appendChild(table);
    }
}

