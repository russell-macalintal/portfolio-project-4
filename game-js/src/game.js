class Game {

    static clearWindow(html_elem) {
        html_elem.innerHTML = "";
    }

    static showLevels(html_elem) {
        fetch(DIFFICULTIES_URL)
            .then( response => response.json() )
            .then( function(diff_obj) {
                const diff_arr = diff_obj['data'];

                for(const elem of diff_arr) {
                    const btn = document.createElement("button");
                    btn.innerHTML = `${elem['attributes']['level']} - ${elem['attributes']['grid_col']}x${elem['attributes']['grid_row']}`;
                    html_elem.appendChild(btn);
                }
            })
    }

    static showLeaderboards(scores, html_elem) {
        fetch(SCORES_URL)
            .then( response => response.json() )
            .then( function(scores_obj) {
                const scores_arr = scores_obj['data'];
                const scores = [];

                for(let elem of scores_arr) {
                    let s_obj = {
                        'score': elem['attributes']['score'],
                        'username': elem['attributes']['user']['username'],
                        'difficulty': elem['attributes']['difficulty']['level']
                    }
                    
                    scores.push(s_obj);
                }

                const ordered_scores = scores.sort(function(a, b) {
                    return b['score'] - a['score'];
                })

                console.log(ordered_scores);
            })

    }
}