
const url = "http://localhost:3000/api/pedido/";
let resultados = '';
const formArticulo = document.querySelector("form");
const userped = document.getElementById("USERPED");
const emauser = document.getElementById("EMAUSER");
const celuuser = document.getElementById("CELUUSER");
const menped = document.getElementById("MENPED");
const msgped = document.getElementById("MSGPED");
var opcion = '';

btnCrear.addEventListener('click', () => {
    console.log("Acción de listar activada");
    opcion = 'crear';
});

formArticulo.addEventListener('submit',
    (e) => {
        e.preventDefault();
        if (opcion == 'crear') {
            if (USERPED.value == "" || EMAUSER.value == "" || CELUUSER.value == "" || MENPED.value == "" || MSGPED.value == "") {
                alert("Asegúrese de que todos los campos estén completos");
                return false;
            } else {
                console.log("Todos los campos están completos");
                fetch(
                    url,
                    {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                USERPED: USERPED.value,
                                EMAUSER: EMAUSER.value,
                                CELUUSER: CELUUSER.value,
                                MENPED: MENPED.value,
                                MSGPED: MSGPED.value
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
