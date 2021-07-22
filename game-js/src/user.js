class User {
    constructor(username) {
        this.username = username;
        this.current_score = 0;
    }

    static renderLogin(html_elem) {
        let form = document.createElement("form");
        let input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'user-input');
        input.setAttribute('placeholder', 'Enter Username');
        input.setAttribute('minlength', '3');
        let submit_btn = document.createElement("button");
        submit_btn.setAttribute('id', 'user-submit');
        submit_btn.setAttribute('value', 'Enter');
        
        form.appendChild(input);
        form.appendChild(submit_btn);
        html_elem.appendChild(form);
    }
    
}