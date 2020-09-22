// en este ejercicio ajax vamos a trabajar con funciones anonimas

(()=> {
    // creacion de la instancia
    const xhr= new XMLHttpRequest(),
        $xhr = document.getElementById("xhr"),
        $fragmento = document.createDocumentFragment();

    // console.log(xhr);

    // ahora crearemos el manejo de los eventos

    xhr.addEventListener("readystatechange",(e) => {
        if(xhr.readyState !== 4) return;
        // console.log(xhr);
        
        
        if(xhr.status >= 200 && xhr.status < 300){
            // console.log("Exito");
            // console.log(xhr.responseText);
            // $xhr.innerHTML = xhr.responseText;        //esto no se hace hay que primro convertirlo en fotmato json
            let json = JSON.parse(xhr.responseText);
            // console.log(json);

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML =  `${el.name}----------${el.email}-------------${el.phone}.`;
                $fragmento.appendChild($li);
            });

            $xhr.appendChild($fragmento);

        }else {
            // console.log("Error");
            let message = xhr.statusText || "Ocurrio un Error";
            // console.log(message);
            $xhr.innerHTML =  `Error ${xhr.status}: ${message}.`;
        }
        // console.log("Este mensaje se ejecutara de cualquier forma")        
    });


    //  ahora crearemos la apertura especificando el metodo y la url

    xhr.open("GET","https://jsonplaceholder.typicode.com/users");     // Nuestra api desde el citio
    // xhr.open("GET","ajax.json");                                  // Nuestra api desde nuestro citio local


    // ahora crearemos el envio con o sin datos dependiendo de las nesecidades

    xhr.send();
})();

// en este ejercicio vamos a ver el mismo ejercicio de arriba pero con
//  el metodo FETCH :


(() => {
    const $fetch = document.getElementById("fetch"),
        $fragmento = document.createDocumentFragment();

    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
            // console.log(res);
            return res.ok? res.json() : Promise.reject(res);  // Aca podemos especificar en que formato lo queremos enviar como en json o text o bolb 
        })
        .then((json) => {
            // console.log(json);
            // $fetch.innerHTML = json;
            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML =  `${el.name}----------${el.email}-------------${el.phone}.`;
                $fragmento.appendChild($li);
            });

            $fetch.appendChild($fragmento);
        })
        .catch((err) => {
            // console.log(err);
            let message = err.statusText || "Ocurrio un Error";
            $fetch.innerHTML =  `Error ${err.status}: ${message}.`;
        })
        .finally(() => {
            // console.log("Esto se ejecutara independiente del resultado de la promesa FETCH");
    });

})();


// Este ejercicio es igual que el anterior utilizando la API Fetch pero utilizando Async-Await

(() => {
    const $fetchAsync = document.getElementById("fetch-async"),
        $fragmento = document.createDocumentFragment();

    async function getData() {
        try{
            let res = await fetch("https://jsonplaceholder.typicode.com/users"),
                json = await res.json();
                // console.log(res,json);
                // if(!res.ok) throw new Error("Ocurrio un eeror al solicitar los datos"); // este es una forma de llamar al error
                if(!res.ok) throw {status: res.status, statusText: res.statusText};  // esta es la otra forma para llamar al error

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML =  `${el.name}----------${el.email}-------------${el.phone}.`;
                $fragmento.appendChild($li);
            });

            $fetchAsync.appendChild($fragmento);
        
        } catch(err) {
            // console.log(err);
            let message = err.statusText || "Ocurrio un Error";
            $fetchAsync.innerHTML =  `Error ${err.status}: ${message}.`;

        } finally {
            // console.log("Esto se ejecutara independient del try... catch");
        }

        

    }
    getData();
})();


// *******************************************************************************************************************
// en este ejemplo vamos a utilizar el mismo ejemplo anterior pero con la libreria Axios

(() => {
    const $axios = document.getElementById("axios"),
        $fragmento = document.createDocumentFragment();

    axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            // console.log(res);
            let json = res.data;

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML =  `${el.name}----------${el.email}-------------${el.phone}.`;
                $fragmento.appendChild($li);
            });

            $axios.appendChild($fragmento);
        })
        .catch(err => {
            // console.log(err.response);
            let message = err.response.statusText || "Ocurrio un Error";
            $axios.innerHTML =  `Error ${err.response.status}: ${message}.`;
        })
        .finally(() => {
            // console.log("Esto se ejecutara independiente de le respuesta de axios");
        });
})();


// ***********************************************************************************************************************************+
//  en este ejemplo vamos a utilizar el mismo ejemplo anterior con la libreria axios pero asincrono (Async-Await)

(() => {
    const $axiosAsync = document.getElementById("axios-async"),
        $fragmento = document.createDocumentFragment();


    async function getData() {
        try {
            // let res = await axios.get("ajax.json"),     // para ver que tambien sirve de forma local
            let res = await axios.get("https://jsonplaceholder.typicode.com/users"), // de forma externa
                json = await res.data;

            console.log(res, json);

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML =  `${el.name}----------${el.email}-------------${el.phone}.`;
                $fragmento.appendChild($li);
            });

            $axiosAsync.appendChild($fragmento);
        } catch (err) {
            // console.log(err.response);
            let message = err.response.statusText || "Ocurrio un Error";
            $axiosAsync.innerHTML =  `Error ${err.response.status}: ${message}.`;
        } finally {
            // console.log("Esto se ejecutara independiente de le respuesta de axios");
        }
    }
    getData();
})();










































