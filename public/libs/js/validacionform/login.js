document.addEventListener('submit', (e) => {
    if (e.target.matches('#form')) {
        e.preventDefault();
        let datosForm = new FormData(e.target);
        document.getElementById('btn-login').disabled = true;
        document.getElementById('spinner').style.display = 'block';
        document.querySelectorAll('[data-error="input"]').forEach((el)=>{ el.classList.remove('is-invalid') });
        document.querySelectorAll('[data-error="span"]').forEach((el)=>{ el.textContent = '' });
        axios.post(`${app_url}/autenticacion`, datosForm)   
            .then(function (resp){
                // console.log(resp);
                window.location.href = '/index';
            })
            .catch(function (error){

                // console.log(error.response);

                document.getElementById('btn-login').disabled = false;
                document.getElementById('spinner').style.display = 'none';

                if (error.response.status === 401) {
                    document.getElementById('login-error').style.display = 'block';
                    return;
                }

                const objeto = error.response.data.errors; //creamos el objeto para luego recorrerlo
                if (error.response.data.hasOwnProperty('errors')) //preguntamos si exite la propiedad donde se almacenan los errores false/true
                {
                    for (let key in  objeto) 
                    {
                        // console.log(key);
                        // console.log(objeto[key]);
                        //key nombre del campo ej. nombre_operacion
                        //objeto[key] valor ej. "El campo nombre operacion es obligatorio. SU VALOR"
                        document.getElementById(key).classList.add('is-invalid');
                        document.getElementById(key+'-error').textContent = objeto[key];
                    }
                }
            })
    }
})