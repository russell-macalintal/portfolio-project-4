class User {
    constructor(username) {
        this.username = username;
        this.current_score = 0;
        this.id = '';
    }

    set gameDifficulty(level) {
        this.difficulty = level;
    }

    get gameDifficulty() {
        return this.difficulty;
    }

    static renderLogin(html_elem) {
        // Create submission form with text input field and submit button
        const form = document.createElement("form");
        form.setAttribute('id', 'user-login');
        const input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'user-input');
        input.setAttribute('placeholder', 'Enter Username');
        const submit_btn = document.createElement("button");
        submit_btn.setAttribute('id', 'user-submit');
        submit_btn.innerHTML = 'ENTER';
        
        // Add form to HTML document
        form.appendChild(input);
        form.appendChild(submit_btn);
        html_elem.appendChild(form);
    }

    submitAndRenderScores(html_elem) {
        const user = { u_name: this.username, u_score: this.current_score, u_diff: this.gameDifficulty };
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(user)
        };

        fetch(USERS_URL, configObj)
            .then( response => response.json() )
            .then( function(user_obj) {

                // After score submission to the database, the user's ID is retrieved and all of the user's scores are displayed
                this.id = user_obj['data']['id'];

                const scores_arr = user_obj['data']['attributes']['scores'];
                const s_arr = [];

                for(const elem of scores_arr) {
                    s_arr.push({'your scores': elem['score']});
                }

                const ordered_scores = s_arr.sort(function(a, b) {
                    return b['your scores'] - a['your scores'];
                })

                Game.renderScoreBoard(ordered_scores, html_elem);
                this.renderDeleteBtn(html_elem);
        }.bind(this) );
    }

    renderDeleteBtn(html_elem) {
        const delete_scores_btn = document.createElement("button");
        delete_scores_btn.innerHTML = "DELETE SCORES";
        delete_scores_btn.setAttribute('id', 'user-delete');
        delete_scores_btn.addEventListener('click', function() {
            if( confirm("Warning: Do you want to delete all of your scores? This action cannot be undone.") ) {
                this.deleteScores();
            }
        }.bind(this));
            
        html_elem.appendChild(delete_scores_btn);
    }

    deleteScores() {
        const user = { u_id: this.id };
        const configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(user)
        };

        const DELETE_URL = USERS_URL + `/${this.id}`
        fetch(DELETE_URL, configObj)
            .then( response => response.json() )
            .then( function(resp_obj) {
                alert(resp_obj['Alert']);
                window.location.reload();
        } );
    }
    
}