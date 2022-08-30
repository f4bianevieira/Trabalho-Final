let nome = document.querySelector('#nome');
let nomeLabel = document.querySelector('#nomeLabel');
let validNome = false

let usuario = document.querySelector('#usuario');
let usuarioLabel = document.querySelector('#usuarioLabel');
let validUsuario = false

let senha = document.querySelector('#senha');
let senhaLabel = document.querySelector('#senhaLabel');
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha');
let confirmLabel = document.querySelector('#confirmLabel');
let validConfirm = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')



nome.addEventListener('keyup', () => {

    if(nome.value.length <= 2){
        nomeLabel.setAttribute('style', 'color:red');
        nomeLabel.innerHTML = '<strong>Nome *Insira no minimo 3 caracteres*</strong>'
        nome.setAttribute('style', 'border-color:red')
        validNome = false;
    }else{
        nomeLabel.setAttribute('style', 'color:green')
        nomeLabel.innerHTML = 'Nome';
        nome.setAttribute('style', 'border-color:green')
        validNome = true;
    };
});
usuario.addEventListener('keyup', () => {

    if(usuario.value.length <= 2){
        usuarioLabel.setAttribute('style', 'color:red');
        usuarioLabel.innerHTML = '<strong>Usuário *Insira no minimo 3 caracteres*</strong>'
        usuario.setAttribute('style', 'border-color:red')
        validUsuario =false;
    }else{
        usuarioLabel.setAttribute('style', 'color:green')
        usuarioLabel.innerHTML = 'Usuário';
        usuario.setAttribute('style', 'border-color:green')
        validUsuario = true;
    };
});
senha.addEventListener('keyup', () => {

    if(senha.value.length <= 5){
        senhaLabel.setAttribute('style', 'color:red');
        senhaLabel.innerHTML = '<strong>Senha *Insira no minimo 6 caracteres*</strong>'
        senha.setAttribute('style', 'border-color:red')
        validSenha = false;
    }else{
        senhaLabel.setAttribute('style', 'color:green')
        senhaLabel.innerHTML = 'Senha';
        senha.setAttribute('style', 'border-color:green')
        validUsuario = true;
    };
});
confirmSenha.addEventListener('keyup', () => {

    if(senha.value != confirmSenha.value){
        confirmLabel.setAttribute('style', 'color:red');
        confirmLabel.innerHTML = '<strong>Repita a senha *As senhas não conferem*</strong>'
        confirmSenha.setAttribute('style', 'border-color:red')
        validConfirm = false;
    }else{
        confirmLabel.setAttribute('style', 'color:green')
        confirmLabel.innerHTML = 'Repita a senha';
        confirmSenha.setAttribute('style', 'border-color:green')
        validConfirm = true;
    };
});


function cadastrar(){
    if(validNome && validUsuario && validUsuario && validConfirm){
        // ou adiciona no array ou cria um array vazio
        let users = JSON.parse(localStorage.getItem('users') || '[]')
        // array de objetos com dados do usuário cadastrado
        users.push(
            {
                nomeUser: nome.value,
                user: usuario.value,
                senhaUser: senha.value,
                mensagem: [],
            }
        );

        localStorage.setItem('users', JSON.stringify(users));

        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = '<strong>Cadastrando o usuário...</strong>'
        msgError.innerHTML = ''
        msgError.setAttribute('style', 'display: none')
        
        setTimeout(() => {
            window.location.href = 'entrar.html'
        }, 3000);

        
    }else{

        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar </strong>.'
        msgSuccess.innerHTML = ''
        msgSuccess.setAttribute('style', 'display: none')
    };
};