
function entrar(){
    let usuario = document.querySelector('#usuario')
    let usuarioLabel = document.querySelector('#userLabel')

    let senha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')

    let msgError = document.querySelector('#msgError')

    let users = []

    
    let usuarioValid = {
        nome: '',
        user: '',
        senha: '',
        mensagem: []
    };

    users = JSON.parse(localStorage.getItem('users'))
    
    users.forEach((item) => {
        if(usuario.value == item.user && senha.value == item.senhaUser) {
            usuarioValid = {
                nome: item.nomeUser,
                user: item.user,
                senha: item.senhaUser
            }
            localStorage.setItem('mensagem', JSON.stringify(item.mensagem))
        }
    })
   // console.log(usuarioValid)

   if(usuario.value == usuarioValid.user && senha.value == usuarioValid.senha ){
    window.location.href = 'recados.html'

   // criar token para garantir que o usuário tá logado
    let token = Math.random().toString(16).substring(2)
    localStorage.setItem('token', token)
    localStorage.setItem('userLogado', JSON.stringify(usuarioValid))

   }else{
    usuarioLabel.setAttribute('style', 'color: red')
    usuario.setAttribute('style', 'border-color: red')
    senhaLabel.setAttribute('style', 'color: red')
    senha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML='Usuário ou senha incorretos.'
    usuario.focus()
   }
}
