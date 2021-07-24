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

    constructor(username, id) {
        this.username = username;
        this.id = id;
        this.current_score = 0;
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

    static submitLogin(game_user, username, callbackFn) {
        const u_name = { u_name: username }
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(u_name)
        };

        fetch(USERS_URL, configObj)
            .then( response => response.json() )
            .then( function(resp_obj) {
                game_user = new User(resp_obj['data']['attributes']['username'], resp_obj['data']['id']);
                game_user.callbackFn;
        });
        
    }

    getScores(html_elem) {
        let this_user = this;

        // fetch(USERS_URL + `/${this_user.id}`)
        //     .then( response => response.json() )
        //     .then( function(user_obj) {
        //         const scores_arr = user_obj['data']['attributes']['scores'];
        //         const s_arr = [];

        //         for(let elem of scores_arr) {
        //             s_arr.push({'score': elem['score']});
        //         }

        //         const ordered_scores = s_arr.sort(function(a, b) {
        //             return b['score'] - a['score'];
        //         })

        //         Game.renderScoreBoard(ordered_scores, html_elem);
        //     })
    }
    
}