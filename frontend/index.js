document.addEventListener("DOMContentLoaded", function() {
    // Seleziona gli elementi DOM necessari
    const invokeButtons = {
        inserimento: document.getElementById("invokeButton"),
        recupero: document.getElementById("invokeButtonRecupero"),
        login: document.getElementById("invokeButtonLogin"),
        insert: document.getElementById("invokeButtonInsert")
    };
    const spinner = document.getElementById("spinner");
    const responseContainer = document.getElementById("responseContainer");
    let userId;

    // Funzione per gestire le richieste API
    function handleApiRequest(url, requestData) {
        // Mostra il loader
        spinner.classList.remove("hidden");
        // Pulisci la risposta precedente
        responseContainer.innerHTML = "";

        // Effettua la richiesta API
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const statusCode = response.status;
            responseContainer.innerHTML = "Status Code: " + statusCode;
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data["user-id"]) {
                userId = data["user-id"];
            }
            // Visualizza la risposta formattata
            const responseBody = JSON.stringify(data, null, 2); // Pretty print JSON
            responseContainer.innerHTML += "<br>Response:<pre>" + responseBody + "</pre>";
        })
        .catch(error => {
            console.error('Error:', error);
            responseContainer.innerHTML = "Error: " + error.message;
        })
        .finally(() => {
            // Nascondi il loader alla fine della richiesta
            spinner.classList.add("hidden");
        });
    }

    // Event listener per l'invocazione del primo endpoint
    invokeButtons.inserimento.addEventListener("click", function() {
        handleApiRequest('http://localhost:4566/2015-03-31/functions/inserimento_api/invocations', null);
    });

    // Event listener per l'invocazione del secondo endpoint
    invokeButtons.recupero.addEventListener("click", function() {
        handleApiRequest('http://localhost:4566/2015-03-31/functions/recupero_api/invocations', null);
    });

    // Event listener per l'invocazione del terzo endpoint
    invokeButtons.login.addEventListener("click", function() {
        const data = { "name": "nicholas" };
        handleApiRequest('http://localhost:4566/2015-03-31/functions/login_api/invocations', data);
    });

    // Event listener per l'invocazione del quarto endpoint
    invokeButtons.insert.addEventListener("click", function() {
        const data = { "user-id": userId, "time": 200 };
        handleApiRequest('http://localhost:4566/2015-03-31/functions/inserimento_api/invocations', data);
    });
});
