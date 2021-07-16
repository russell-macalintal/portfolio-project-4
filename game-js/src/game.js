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