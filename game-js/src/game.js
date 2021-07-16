class Game {
    static getDifficulty() {
        return fetch(DIFFICULTIES_URL)
            .then( response => response.json() )
            .then( function( diff_obj) {
                console.log( diff_obj );
            })
    }
}