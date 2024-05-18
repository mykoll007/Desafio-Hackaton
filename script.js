// Variáveis globais
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

// Seleciona a div do calendário
const calendar = document.getElementById('calendar0');
const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

// Função para adicionar dias na tabela
function addDayToTable(dayString) {
    const date = new Date(dayString);
    const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

    const dayMapping = {
        0: 'domingo',
        1: 'segunda',
        2: 'terca',
        3: 'quarta',
        4: 'quinta',
        5: 'sexta',
        6: 'sabado'
    };

    const dayId = dayMapping[dayOfWeek];
    const dayCell = document.getElementById(dayId);

    if (dayCell) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = dayString;
        dayCell.appendChild(eventDiv);
    }
}

// Função load será chamada quando a página carregar
function load() {
    const date = new Date();

    // Mudar título do mês
    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const daysMonth = new Date(year, month + 1, 0).getDate();
    const firstDayMonth = new Date(year, month, 1);

    const dateString = firstDayMonth.toLocaleDateString('pt-br', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const paddinDays = weekdays.indexOf(dateString.split(', ')[0]);

    // Mostrar mês e ano
    document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br', { month: 'long' })}, ${year}`;

    calendar.innerHTML = '';

    // Criando uma div com os dias
    for (let i = 1; i <= paddinDays + daysMonth; i++) {
        const dayS = document.createElement('div');
        dayS.classList.add('day');

        const dayString = `${month + 1}/${i - paddinDays}/${year}`;

        // Condicional para criar os dias de um mês
        if (i > paddinDays) {
            dayS.innerText = i - paddinDays;

            const eventDay = events.find(event => event.date === dayString);

            if (i - paddinDays === day && nav === 0) {
                dayS.id = 'currentDay';
            }

            if (eventDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventDay.title;
                dayS.appendChild(eventDiv);
            }

            dayS.addEventListener('click', () => {
                openModal(dayString);
                addDayToTable(dayString); // Adicione esta linha para adicionar o dia à tabela
            });
        } else {
            dayS.classList.add('padding');
        }

        calendar.appendChild(dayS);
    }
}

// Botões de navegação
function buttons() {
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
}

buttons();
load();

//pular

// acordeon checkbox
function myFunction(id) {
    var accordionContent = document.getElementById(id);
    accordionContent.classList.toggle("w3-show");
}

//jquery
$(document).ready(function () {
    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        selectable: true,
        editable: true,
        select: function (start, end, allDay) {
            $("#addEvent").show();
            $("#editEvent").hide();
            $("#addNew-event").modal("show");
            $("#addNew-event input:text").val("");
            $("#getStart").val(start);
            $("#getEnt").val(end);
        },
        eventClick: function (event, element) {
            $("#addEvent").hide()
            $("#editEvent").show().data("ev", event);
            $("#addNew-event").modal("show");
            $("#addNew-event input:text").val("");
            $("#eventName").val(event.title);
        }
    });

    $("body").on("click", "#addEvent", function () {
        var eventName = $("#eventName").val();
        $("#calendar").fullCalendar("renderEvent", {
            title: eventName,
            start: $("#getStart").val(),
            end: $("#getEnd").val()
        }, true);

        $("#addNew-event form")[0].reset();
        $("#addNew-event").modal("hide");
    });
    $("body").on("click", "#editEvent", function () {
        var eventName = $("#eventName").val();
        var ev = $(this).data("ev");
        ev.title = eventName;
        $("#calendar").fullCalendar("updateEvent", ev);

        $("#addNew-event form")[0].reset();
        $("#addNew-event").modal("hide");
    });

    // Função para atualizar o parágrafo com o mês e o ano
    function updateMonthDisplay(date) {
        const monthNames = [
            "janeiro", "fevereiro", "março",
            "abril", "maio", "junho", "julho",
            "agosto", "setembro", "outubro",
            "novembro", "dezembro"
        ];

        const month = date.getMonth();
        const year = date.getFullYear();

        $('#maio').text(monthNames[month] + ' ' + year);
    }

    // Evento para atualizar o parágrafo quando o mês é alterado
    $('#calendar').fullCalendar({
        // Configurações do seu calendário
        // ...

        // Callback chamado quando o mês é alterado
        viewRender: function (view, element) {
            updateMonthDisplay(view.intervalStart);
        }
    });
});



// 1 modal
let btn_Aba = document.getElementById("seta-down")
let modalLogin = document.getElementById("abrirLogin")

btn_Aba.addEventListener('click', function () {
    if (modalLogin.style.display === "grid") {
        modalLogin.style.display = "none";
    } else {
        modalLogin.style.display = "grid";
    }

});


//modal login
let login = document.getElementById("entrarLogin")
let modalLogin1 = document.getElementById("teste-modal")
let logado = document.getElementById("btnlogin")

login.addEventListener('click', function () {
    modalLogin1.style.display = "block"

})

logado.addEventListener('click', function () {
    modalLogin1.style.display = "none"
})
//pegar o valor
document.getElementById("btnlogin").addEventListener('click', function () {
    // Pegando os valores dos campos de entrada
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    console.log("E-mail:", email);
    console.log("Senha:", senha);
})

//Escondendo e aparecendo tabela

// Selecionando todos os checkboxes e salas de reunião
let checkboxes = document.querySelectorAll("#checkbox0 ,#checkbox1, #checkbox2,#checkbox3, #checkbox4, #checkbox5, #checkbox6, #checkbox7, #checkbox8, #checkbox9, #checkbox10, #checkbox11, #checkbox12, #checkbox13, #checkbox14, #checkbox15, #checkbox16, #checkbox17, #checkbox18, #checkbox19, #checkbox20, #checkbox21, #checkbox22, #checkbox23, #checkbox24, #checkbox25, #checkbox26, #checkbox27, #checkbox28, #checkbox29, #checkbox30, #checkbox31, #checkbox32, #checkbox33, #checkbox34, #checkbox35, #checkbox36, #checkbox37, #checkbox38, #checkbox39, #checkbox40, #checkbox41, #checkbox42, #checkbox43, #checkbox44, #checkbox45, #checkbox46, #checkbox47, #checkbox48, #checkbox49, #checkbox50, #checkbox51, #checkbox52");
let salasReuniao = document.querySelectorAll("#sala0,#sala1, #sala2,#sala3, #sala4, #sala5, #sala6, #sala7, #sala8, #sala9, #sala10, #sala11, #sala12, #sala13, #sala14, #sala15, #sala16, #sala17, #sala18, #sala19, #sala20, #sala21, #sala22, #sala23, #sala24, #sala25, #sala26, #sala27, #sala28, #sala29, #sala30, #sala31, #sala32, #sala33, #sala34, #sala35, #sala36, #sala37, #sala38, #sala39, #sala40, #sala41, #sala42, #sala43, #sala44, #sala45, #sala46, #sala47, #sala48, #sala49, #sala50, #sala51, #sala52");


// Adicionando o evento de clique a todos os checkboxes
checkboxes.forEach(function (checkbox, index) {
    checkbox.addEventListener('click', function () {
        // Verificando se o checkbox está marcado
        if (checkbox.checked) {
            // Se estiver marcado, tornar a sala de reunião correspondente visível
            salasReuniao[index].style.display = 'table-row';
        } else {
            // Caso contrário, ocultar a sala de reunião correspondente
            salasReuniao[index].style.display = 'none';
        }
    });

});

// Função para marcar todas as salas ao clicar em "Todos"
function marcarTodas() {
    checkboxes[0].addEventListener('click', function () {
        // Verificando se o checkbox "Todos" está marcado
        if (checkboxes[0].checked) {
            // Marcando todos os outros checkboxes
            checkboxes.forEach(function(checkbox, index) {
                if (index !== 0) {
                    checkbox.checked = true;
                }
            });
            // Marcando todas as salas de reunião
            salasReuniao.forEach(function(sala) {
                sala.checked = true;
            });
            // Exibindo todas as salas da tabela
            document.querySelectorAll(".salas").forEach(function(sala) {
                sala.style.display = 'table-row';
            });
        } else {
            // Desmarcando todos os outros checkboxes
            checkboxes.forEach(function(checkbox, index) {
                if (index !== 0) {
                    checkbox.checked = false;
                }
            });
            // Desmarcando todas as salas de reunião
            salasReuniao.forEach(function(sala) {
                sala.checked = false;
            });
            // Ocultando todas as salas da tabela
            document.querySelectorAll(".salas").forEach(function(sala) {
                sala.style.display = 'none';
            });
        }
    });
}


// Chamando a função para marcar todas as salas ao clicar em "Todos"
marcarTodas();


var reserva0 = document.getElementById("registrar0")
var reserva1 = document.getElementById("registrar1");
let reservaModal = document.getElementById("modal-reserva")
let fecharModal = document.getElementById("modal-fechar")

//Botão de reservar
var botaoReservar = document.getElementById("botao-reservar")

// Adicionando um evento de clique para ambos os elementos de reserva

reserva0.addEventListener('click', function() {
    abrirModal(reserva0);
});
reserva1.addEventListener('click', function() {
    abrirModal(reserva1);
});

// Função para abrir o modal
function abrirModal(reserva) {
    reservaModal.style.display = "block";
    // Armazenando a reserva clicada para uso posterior
    reservaAtual = reserva;
}

fecharModal.addEventListener('click', function(){
    reservaModal.style.display = "none"
})
botaoReservar.addEventListener("click", function(){
    reservaModal.style.display = "none"
})
// armazenando

var capacidades = []
var docentes = []
var siglas = []
var horarios = []


var docente = document.getElementById("docente")
var sigla = document.getElementById("sigla")
let horario = document.getElementById("horario")
// var dateInicio = document.getElementById("date") Iguais dps alterar
// var dateFim = document.getElementById("date") Iguais dps alterar


botaoReservar.addEventListener("click", function () {
     if(reservaAtual){
         // Reinicializar os arrays antes de adicionar novos dados
         reiniciarArrays();

    docentes.push(docente.value);
    siglas.push(sigla.value);
    horarios.push(horario.value);


    mostrarTexto();
     }
})

function mostrarTexto() {
    var aux = "";
    for(var cont = 0; cont <siglas.length; cont++){
        aux += '<p>Docente: ' + docentes[cont]  + '</p>' +
        '<p>Curso: ' + siglas[cont] + '</p>' +
        '<p>Horario: ' + horarios[cont] + '</p>' +
        '<br>'
 

    }
    reservaAtual.innerHTML = aux;
}

function reiniciarArrays() {
    docentes = [];
    siglas = [];
    horarios = [];
}

//menu

var menu = document.getElementById("menu")
var botoesAltExcl= document.getElementById("excluir")
var botoesAltExcl1 = document.getElementById("alterar")


menu.addEventListener('click', function(){
   if(botoesAltExcl.style.display === "none"){
    botoesAltExcl.style.display = "block"
   } else{
    botoesAltExcl.style.display = "none"
   }
})
menu.addEventListener('click', function(){
    if(botoesAltExcl1.style.display === "none"){
        botoesAltExcl1.style.display = "block"
       } else{
        botoesAltExcl1.style.display = "none"
       }
})

//excluir modal
var modalExcluir = document.getElementById("modal-excluir")
var excluirAceito = document.getElementById("excluir-modal")

botoesAltExcl.addEventListener('click', function(){
    modalExcluir.style.display = "block"
})

excluirAceito.addEventListener('click', function(){
    modalExcluir.style.display = "none"
})

