// pagina que mais ou menos funciona        

let userLogado = JSON.parse(localStorage.getItem('userLogado'))

let logado = document.querySelector('#logado')

let idMsg = document.querySelector('#idMsg')
let idMsgLabel = document.querySelector('#idMsgLabel')
let validMsg = false

let detalhamento = document.querySelector('#detalhamento')
let detalhamentoLabel = document.querySelector('#detalhamentoLabel')
let validDetalhamento = false

let descricao = document.querySelector('#descricao')
let descricaoLabel = document.querySelector('#descricaoLabel')
let validDescricao = false

let desc_txt = document.getElementById("desc_txt");
let det_txt = document.getElementById("det_txt");


logado.innerHTML = 'Olá, ' + userLogado.nome + '! Seja bem vindo(a) à sua página de recados.' 

if(!localStorage.getItem('token') ){
    alert('Você precisa estar logado para acessar essa página.')
    window.location.href = 'entrar.html'

    localStorage.removeItem('userLogado')
}

mostrarRecados();

function salvaRecados(){

    if(detalhamento !== 0 && descricao !== 0){
        
        let recadosArray = JSON.parse(localStorage.getItem('mensagem') || '[]')

        const time = new Date().getTime()
        const random = Math.floor((1 + Math.random())* time).toString(16).substring(1)
        const id = `${random}-${random}-${random}-${random}`

        recadosArray.push(
            {   
                id,
                detalhamento: detalhamento.value,
                descricao: descricao.value
            }
        );

        localStorage.setItem('mensagem', JSON.stringify(recadosArray));
            mostrarRecados();

    }else{
        alert('Preencha todos os campos para salvar os recados.')
    };
};
    function mostrarRecados(){

        let recadosArray = JSON.parse(localStorage.getItem('mensagem'));
        let table = document.getElementById('tabela')
        table.innerHTML=''

            for(const index in recadosArray){
                const numeracao=Number(index)+1

                const tr= document.createElement('tr')
                tr.className='dif'
                const th =document.createElement('th')
                th.setAttribute('width','20')
                th.innerText=`${numeracao}`
                const td1 =document.createElement('td')
                
                td1.innerText=`${recadosArray[index].detalhamento}`
                const td2 =document.createElement('td')
                
                td2.innerText=`${recadosArray[index].descricao}`
                const td3 =document.createElement('td')
                
                
                const btnEditar =document.createElement('button')
                btnEditar.setAttribute('id',"editarBtn")
                btnEditar.onclick=()=>editaRecados(recadosArray[index].id)
                btnEditar.innerText='Editar'

                const btnApagar =document.createElement('button')
                btnApagar.setAttribute('id',"apagarBtn")
                btnApagar.className="btn btn-danger"
                btnApagar.onclick=()=>apagaRecados(recadosArray[index].id)
                btnApagar.innerText='Apagar'

                td3.appendChild(btnApagar)
                td3.appendChild(btnEditar)
                tr.appendChild(th)
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)
            };
    };

    function apagaRecados(id){
        console.log("apagou");
        let pegarMensagem = JSON.parse(localStorage.getItem('mensagem'))
        
        let apagarMensagem = pegarMensagem.filter((mensagem) => mensagem.id !== id)

        localStorage.setItem(`mensagem`, JSON.stringify(apagarMensagem))


        mostrarRecados();
    };

        function editaRecados(id){
            console.log("editou");

            let pegarMgs = JSON.parse(localStorage.getItem('mensagem'))
        const index= pegarMgs.findIndex(element => element.id === id);
        if(index<0){
            alert('Recado não encontrado')
            return;
        }
        detalhamento.value=pegarMgs[index].detalhamento
        descricao.value=pegarMgs[index].descricao

        let editar=document.getElementById('salvarRecado')
        editar.innerHTML='Atualizar'
        editar.onclick=()=>recadosModificados(editar,pegarMgs,index)

        }

        function recadosModificados(botao,mensagem,indiceArray){
            
            mensagem[indiceArray].detalhamento=detalhamento.value
            mensagem[indiceArray].descricao=descricao.value
            localStorage.setItem('mensagem',JSON.stringify(mensagem))
            mostrarRecados() 
            
            setTimeout(()=>{
                botao.innerHTML='Salvar'
                botao.onclick=()=>salvaRecados()
            },1000)
        };
        
//atualizar recados

        function atualizarRecados(){

            let pegarUsuarioLogado = JSON.parse(localStorage.getItem('userLogado'))
            let arrayUsers = JSON.parse(localStorage.getItem('users'))
            let pegarMgs = JSON.parse(localStorage.getItem('mensagem'))

            arrayUsers.forEach((item) => {

                if( item.user === pegarUsuarioLogado.user){
                    item.mensagem = pegarMgs
                }

            });

            localStorage.setItem('users', JSON.stringify(arrayUsers))
        }


    function sair(){

        atualizarRecados();

        localStorage.removeItem('token');
        localStorage.removeItem('userLogado');
        localStorage.removeItem('mensagem');

        window.location.href = 'entrar.html'

    };
