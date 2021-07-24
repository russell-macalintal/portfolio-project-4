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
                    btn.innerHTML = `${elem['attributes']['level']} - ${elem['attributes']['grid_col']}x${elem['attributes']['grid_row']}`;
                    btn.addEventListener('click', function() {
                        Game.launchGame(elem['attributes']['grid_col'], elem['attributes']['grid_row']);
                    })
                    html_elem.appendChild(btn);
                }
            })
    }

    static launchGame(grid_col, grid_row) {
      
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

