class User {
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
        
        fetch(USERS_URL, configObj)
            .then( response => response.json() )
            .then( function(resp_obj) {
                console.log(resp_obj);
            })

        this.username = username;
        this.current_score = 0;
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

    }
    
}