class Game {

    // Resets 'game-window' element to empty div
    static clearWindow(html_elem) {
        html_elem.innerHTML = "";
    }

    // Fetches and shows difficulty levels at the start of a new game
    static showLevels(html_elem) {
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
        console.log(`Testing: Grid Size: ${grid_col} x ${grid_row}`);
    }

    // Fetches and shows user scores in descending order
    static showLeaderboards(html_elem) {
        fetch(SCORES_URL)
            .then( response => response.json() )
            .then( function(scores_obj) {
                const scores_arr = scores_obj['data'];
                const s_arr = [];

                for(let elem of scores_arr) {
                    let s_obj = {
                        'score': elem['attributes']['score'],
                        'username': elem['attributes']['user']['username'],
                        'difficulty': elem['attributes']['difficulty']['level']
                    }
                    
                    s_arr.push(s_obj);
                }

                const ordered_scores = s_arr.sort(function(a, b) {
                    return b['score'] - a['score'];
                })

                // Create leaderboards table
                let table = document.createElement('table');

                // Create table headers
                let thead = table.createTHead();
                let t_row = thead.insertRow();
                let keys = Object.keys(ordered_scores[0]);

                for(let key of keys) {
                    let th = document.createElement('th');
                    th.innerHTML = key.toUpperCase();
                    t_row.appendChild(th);
                }

                // Create table rows containing user and score information
                let tbody = table.createTBody();
                for(let elem of ordered_scores) {
                    let row = tbody.insertRow();
                    for(let key in elem) {
                        let cell = row.insertCell();
                        cell.innerHTML = elem[key];
                    }
                }

                html_elem.appendChild(table);
            })

    }
}