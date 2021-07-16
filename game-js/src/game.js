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
}