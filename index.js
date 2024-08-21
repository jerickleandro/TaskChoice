const fs = require("fs");
function executar(){
    const linhas = fs.readFileSync("tasks.json", "utf8")
    const tarefas = JSON.parse(linhas);
    while(true){
        console.log("Digite o número da tarefa que deseja executar:");
        console.log("1 - Listar Tarefas pendententes");
        console.log("2 - Ver Tarefa");
        console.log("3 - Atualizar Tarefa");
        console.log("4 - Criar Tarefa");
        console.log("5 - Listar Tarefas concluidas");
        console.log("6 - Sortear tarefa para fazer");
        console.log("7 - Sair");

        let opcao = parseInt(require("readline-sync").question(""));
        if(opcao == 1){
            console.log("************* Listar Tarefas pendententes - Inicio *******************");
            console.table(tarefas.tarefasPendentes);
            // for(let i = 0; i < tarefas.tarefasPendentes.length; i++){
            //     console.log(`${i+1} - ${tarefas.tarefasPendentes[i].title}`);
            // }
            console.log("************* Listar Tarefas pendententes -  FIM  ********************");

        }
        if(opcao == 2){
            console.log("************* Ver tarefa - Inicio *******************");
            console.log("Digite o número da tarefa que deseja ver:");
            let opcaoTask = parseInt(require("readline-sync").question(""));
            console.log("------------------------------------------------------");
            if(opcaoTask < 0 || opcaoTask > (tarefas.tarefasPendentes.length-1)){
                console.log("Tarefa não encontrada");
                console.log("------------------------------------------------------");
                console.log("************* Ver tarefa -  Fim   *******************");
                continue;
            }
            console.log("Titulo: ", tarefas.tarefasPendentes[opcaoTask].title);
            console.log("Descrição: ",tarefas.tarefasPendentes[opcaoTask].description);
            console.log("------------------------------------------------------");
            console.log("************* Ver tarefa -  Fim   *******************");
        }
        if(opcao == 3){
            console.log("************* Atualizar Tarefa - Inicio *******************");
            console.log("Digite o número da tarefa que deseja atualizar:");
            let opcaoTask = parseInt(require("readline-sync").question(""));
            console.log("------------------------------------------------------");
            if(opcaoTask < 0 || opcaoTask > tarefas.tarefasPendentes.length-1){
                console.log("Tarefa não encontrada");
                console.log("------------------------------------------------------");
                console.log("************* Atualizar Tarefa -  Fim   *******************");
                continue;
            }
            console.log("Titulo: ", tarefas.tarefasPendentes[opcaoTask].title);
            console.log("Descrição: ",tarefas.tarefasPendentes[opcaoTask].description);
            console.log("1 - Concluir Tarefa");
            console.log("2 - Atualizar Titulo");
            console.log("3 - Atualizar Descrição");
            console.log("4 - Atualizar Status")
            let opcaoAtualizar = parseInt(require("readline-sync").question(""));
            if(opcaoAtualizar == 1){
                tarefas.tarefasPendentes[opcaoTask].updatedAt = new Date();
                tarefas.tarefasConcluidas.push(tarefas.tarefasPendentes[opcaoTask]);
                tarefas.tarefasPendentes.splice(opcaoTask, 1);
            }
            if(opcaoAtualizar == 2){
                console.log("Digite o novo titulo:");
                tarefas.tarefasPendentes[opcaoTask].title = require("readline-sync").question("");
            }
            if(opcaoAtualizar == 3){
                console.log("Digite a nova descrição:");
                tarefas.tarefasPendentes[opcaoTask].description = require("readline-sync").question("");
            }
            if(opcaoAtualizar == 4){
                console.log("Escolha o novo status:");
                console.log("1 - Pendente");
                console.log("2 - Andamento");
                let status = parseInt(require("readline-sync").question(""));
                while(status < 1 || status > 2){
                    console.log("Escolha o novo status:");
                    console.log("1 - Pendente");
                    console.log("2 - Andamento");
                    status = parseInt(require("readline-sync").question(""));
                }
                tarefas.tarefasPendentes[opcaoTask].status = status === 1 ? "Pendente" : "Andamento";
            }
            console.log("------------------------------------------------------");
            fs.writeFileSync("tasks.json", JSON.stringify(tarefas));
            console.log("************* Atualizar Tarefa -  Fim   *******************");
        }
        if(opcao == 4){
            console.log("************* Criar Tarefa - Inicio *******************");
            console.log("Digite o titulo da tarefa:");
            let titulo = require("readline-sync").question("");
            while(titulo == ""){
                console.log("Titulo não pode ser vazio, digite o titulo da tarefa:");
                titulo = require("readline-sync").question("");
            }

            console.log("Digite a descrição da tarefa:");
            let descricao = require("readline-sync").question("");
            while(descricao == ""){
                console.log("Descrição não pode ser vazio, digite a descrição da tarefa:");
                descricao = require("readline-sync").question("");
            }
            let novaTarefa = {
                title: titulo,
                description: descricao,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            tarefas.tarefasPendentes.push(novaTarefa);
            fs.writeFileSync("tasks.json", JSON.stringify(tarefas));
            console.log("------------------------------------------------------");
            console.log("************* Criar Tarefa -  Fim   *******************");

        }
        if(opcao == 5){
            console.log("************* Listar Tarefas concluidas - Inicio *******************");
            for(let i = 0; i < tarefas.tarefasConcluidas.length; i++){
                console.log(`${i+1} - ${tarefas.tarefasConcluidas[i].title}`);
            }
            console.log("************* Listar Tarefas concluidas -  FIM  ********************");
        }
        if(opcao == 6){
            console.log("************* Sortear tarefa para fazer - Inicio *******************");
            if(tarefas.tarefasPendentes.length == 0){
                console.log("Nenhuma tarefa pendente");
                console.log("------------------------------------------------------");
                console.log("************* Sortear tarefa para fazer -  Fim   *******************");
                continue;
            }
            let tarefaEmAndamento = tarefas.tarefasPendentes.filter(tarefa => tarefa.status === "Andamento");
            let numeroSorteado = Math.floor(Math.random() * tarefaEmAndamento.length);
            console.log("Tarefa sorteada: ", tarefaEmAndamento[numeroSorteado].title);
            console.log("Descrição: ", tarefaEmAndamento[numeroSorteado].description);
            console.log("------------------------------------------------------");
            console.log("************* Sortear tarefa para fazer -  Fim   *******************");
        }
        if(opcao == 7){
            console.log("Obrigado!");
            break;
        }
    }
}
executar();