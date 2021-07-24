class User {
    // Customize constructor function to fetch() POST user data to Rails API to find_or_create_by existing/new user
    // constructor(username) {
    //     const u_name = { u_name: username }
    //     const configObj = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type':'application/json',
    //             'Accept':'application/json'
    //         },
    //         body: JSON.stringify(u_name)
    //     };

    //     // Use closure variable to resolve 'lost context bug'
    //     let this_user = this;
    //     fetch(USERS_URL, configObj)
    //         .then( response => response.json() )
    //         .then( function(resp_obj) {
    //             this_user.username = resp_obj['data']['attributes']['username'];
    //             this_user.id = resp_obj['data']['id'];
    //             this_user.current_score = 0;
    //         })
    // }

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
        let input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'user-input');
        input.setAttribute('placeholder', 'Enter Username');
        let submit_btn = document.createElement("button");
        submit_btn.setAttribute('id', 'user-submit');
        submit_btn.setAttribute('value', 'Enter');
        
        // Add form to HTML document
        form.appendChild(input);
        form.appendChild(submit_btn);
        html_elem.appendChild(form);
    }

    submitScore(html_elem) {
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