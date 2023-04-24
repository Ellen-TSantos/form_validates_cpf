class ValidaForm {
    constructor() {
        this.form = document.querySelector('.form')
        this.events(); 
        
    }
    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);

        });
    }

    handleSubmit(e) {
        e.preventDefault();
       const Validated = this.fieldsAreValid();
       const validPasswords = this.passwordsAreValid();

       if (Validated && validPasswords) {
        alert('Formulario enviado.')
        this.form.submit();
        
        
       }


    }

    passwordsAreValid() {
        let valid = true;

        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeat--password');

        if(password.value !== repeatPassword.value) {
            valid = false;
            this.createsError(password, 'Campos senha e repetir senha precisa ser iguais');
            this.createsError(repeatPassword, 'Campos senha e repetir senha precisa ser iguais');
        }
        if(password.value.length < 6 || password.value.length > 12) {
           valid = false;
           this.createsError(password, 'Senha precisa estar entre 6 e 12 caracteres');
        }
        return valid 
    }

    fieldsAreValid() {
        let valid = true;

        for (let errorText of this.form.querySelectorAll('.error--text')) {
            errorText.remove();
        }

        for(let  field of this.form.querySelectorAll('.valid')) {
            const label = field.previousElementSibling.innerText;

           if(!field.value) {
            this.createsError(field, `campo ${label}  não pode estar em branco`)
            valid = false;
           }

           if(field.classList.contains('cpf')) {
            if(!this.validaCPF(field)) valid = false;
           }
           if(field.classList.contains('user')) {
            if(!this.validaUser(field)) valid = false;
           }
           
        }  
        return valid;

    }
    validaUser(field) {
        const user = field.value;
        let valid = true;
        if(!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createsError(field, 'Usuário precisa ter apenas letras e/ou números.');
            valid = false;
        }
        if(user.length < 3 || user.length > 12) {
            this.createsError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }
        return valid
    }


    validaCPF(field) {
        const cpf = new ValidaCPF(field.value);

        if(!cpf.valida()) {
            this.createsError(field, 'CPF inválido.' );
            return false;
        }

        return true;

    }
    
    createsError(field,msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error--text');
        field.insertAdjacentElement('afterend',div)
    }

    
}

const allValid = new ValidaForm();