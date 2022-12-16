const url = "http://localhost:3000/api/pedido/";
let resultados = '';
const formArticulo = document.querySelector("form");
const nomcon = document.getElementById("NOMCON");
const apecon = document.getElementById("APECON");
const celcon = document.getElementById("CELCON");
const emacon = document.getElementById("EMACON");
const msgcon = document.getElementById("MSGCON");
var opcion = 'crear';

/*btnCrear.addEventListener('click', () => {
    console.log("Acción de listar activada");
    opcion = 'crear';
});*/

formArticulo.addEventListener('submit',
    (e) => {
        e.preventDefault();
        if (opcion == 'crear') {
            if (NOMCON.value == "" || APECON.value == "" || CELCON.value == "" || EMACON.value == "" || MSGCON.value == "") {
                alert("Asegúrese de que todos los campos estén completos");
                return false;
            } else {
                console.log("Todos los campos están completos");
                console.log(NOMCON.value);
                fetch(
                    url,
                    {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                NOMCON: NOMCON.value,
                                APECON: APECON.value,
                                CELCON: CELCON.value,
                                EMACON: EMACON.value,
                                MSGCON: MSGCON.value
                            }
                        )
                    }
                )
                    .then(
                        response => response.json()
                    )
                    .then(
                        response => location.reload()
                    );
            }
        } else if (opcion == 'editar') {
            console.log("Activado el ");
        }
    }
);