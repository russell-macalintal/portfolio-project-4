const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users`;
const SCORES_URL = `${BASE_URL}/scores`;
const DIFFICULTIES_URL = `${BASE_URL}/difficulties`;

document.addEventListener('DOMContentLoaded', function() {
    fetch(DIFFICULTIES_URL)
        .then( response => response.json() )
        .then( function( diff_obj) {
            console.log( diff_obj );
        })
})