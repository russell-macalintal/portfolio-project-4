class User {
    constructor(username) {
        this.username = username;
        this.current_score = 0;
    }

    set gameDifficulty(level) {
        this.difficulty = level;
    }

    get gameDifficulty() {
        return this.difficulty;
    }

    static renderLogin(html_elem) {
        // Create submission form with text input field and submit button
        let form = document.createElement("form");
        form.setAttribute('id', 'user-login');
        let input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'user-input');
        input.setAttribute('placeholder', 'Enter Username');
        let submit_btn = document.createElement("button");
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
                // After score submission, all of the user's scores are displayed
                const scores_arr = user_obj['data']['attributes']['scores'];
                const s_arr = [];

                for(let elem of scores_arr) {
                    s_arr.push({'your scores': elem['score']});
                }

                const ordered_scores = s_arr.sort(function(a, b) {
                    return b['your scores'] - a['your scores'];
                })

                Game.renderScoreBoard(ordered_scores, html_elem);
        });
    }
    
}