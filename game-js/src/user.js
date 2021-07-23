class User {
    // Customize constructor function to fetch() POST user data to Rails API to find_or_create_by existing/new user
    constructor(username) {
        const u_name = { u_name: username }
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(u_name)
        };

        // Use closure variable to resolve 'lost context bug'
        let this_user = this;
        fetch(USERS_URL, configObj)
            .then( response => response.json() )
            .then( function(resp_obj) {
                this_user.username = resp_obj['data']['attributes']['username'];
                this_user.id = resp_obj['data']['id'];
                this_user.current_score = 0;
            })
    }

    static renderLogin(html_elem) {
        // Create submission form with text input field and submit button
        let form = document.createElement("form");
        let input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'user-input');
        input.setAttribute('placeholder', 'Enter Username');
        input.setAttribute('minlength', '3');
        let submit_btn = document.createElement("button");
        submit_btn.setAttribute('id', 'user-submit');
        submit_btn.setAttribute('value', 'Enter');
        
        // Add form to HTML document
        form.appendChild(input);
        form.appendChild(submit_btn);
        html_elem.appendChild(form);
    }

    getScores(html_elem) {
        fetch()
    }
    
}