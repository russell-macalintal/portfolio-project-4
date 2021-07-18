class Game {
    static getDifficulty() {
        const levels = []
        fetch(DIFFICULTIES_URL)
            .then( response => response.json() )
            .then( function(diff_obj) {
                const diff_arr = diff_obj['data'];
                for(let elem of diff_arr) {
                    levels.push(elem['attributes']);
                }
            })
        return levels;    
    }

    static getScores() {
        const scores = [];
        fetch(SCORES_URL)
            .then( response => response.json() )
            .then( function(scores_obj) {
                const scores_arr = scores_obj['data'];
                for(let elem of scores_arr) {
                    let s_obj = {
                        'score': elem['attributes']['score'],
                        'username': elem['attributes']['user']['username'],
                        'difficulty': elem['attributes']['difficulty']['level']
                    }
                    
                    scores.push(s_obj);
                }
            })
        
        return scores;
    }

    static clearWindow(html_elem) {
        html_elem.innerHTML = "";
    }

    static showLevels(levels, html_elem) {
        for(const level of levels) {
            const btn = document.createElement("button");
            btn.innerHTML = `${level['level']} - ${level['grid_col']}x${level['grid_row']}`;
            html_elem.appendChild(btn);
        }
    }
}