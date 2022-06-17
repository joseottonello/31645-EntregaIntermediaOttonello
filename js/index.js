const 
//variables globales
form = document.getElementById("form"),
email = document.getElementById("email"),
password = document.getElementById("password"),
rememberme = document.getElementById("rememberme"),
forgetme = document.getElementById("forgetme"),
access = document.getElementById("access"),
navbar = document.getElementById("navbar"),
container = document.getElementById("container"),
property = document.getElementById("property"),
spinner = document.getElementById("spinner"),
//Archivo JSON siulador de API
URL = "../Proyecto/properties.json";

//al clickear guardara nuestros datos
rememberme.addEventListener("click", () => {
    //si no hay datos ingresados emitira una alerta
    if (!email.value | !password.value) {
        Toastify({
            text: "You have not entered your data",
            duration: 2000
        }).showToast();
      //si hay datos ingresados los guarda  
    } else {
        Toastify({
            text: "Your data has been saved!",
            duration: 2000
        }).showToast();
        localStorage.setItem(email.value, password.value);
    }
})

//al clickear elminara nuestros datos
forgetme.addEventListener("click", () => {
    //si no hay datos guardados emitira una alerta
    if (!localStorage.length) {
        Toastify({
            text: "You have not entered your data",
            duration: 2000
        }).showToast();
      //si hay datos ingresados los elimina
    } else {
        localStorage.clear()
        Toastify({
            text: "Your data has been deleted!",
            duration: 2000
            }).showToast();
        }
})
//al clickear nos llevara a las propiedades
access.addEventListener("click", () => {
    //si no se completaron los datos no se podra avanzar
    if (email.value == "" | password.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'No Data',
            text: 'You have not entered your data! Try again please'
          })
      //si esta el formulario completado se pintan las propiedades
    } else {
        form.classList.replace("form","formRemove");
        spinner.classList.replace("spinner","spinner-border");
        setTimeout(() => {
            spinner.classList.replace("spinner-border","spinner")
            paintNavbar()
            paintProperties()
        }, 500);
    }
})

const paintNavbar = () => {
    navbar.innerHTML = `
    <div class="logo">
        <img src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/64/undefined/external-rent-rental-property-xnimrodx-blue-xnimrodx-3.png"/>
        <h3>Ottonello Rents</h3>
    </div>
    <div class="search">
        <form class="d-flex" role="search">
            <input id="search" class="form-control me-2" type="search" placeholder="$00000" aria-label="Search">
            <button id="filter" class="btn btn-outline-primary" type="button">Filter</button>
        </form>
        <button id="log" type="button" class="btn btn-outline-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
        </button>
    </div>`

    let log = document.getElementById("log");
    log.addEventListener("click", () => {
        navbar.classList.replace("navbar","navbarRemove");
        container.classList.replace("container","containerRemove");
        spinner.classList.replace("spinner","spinner-border");
        setTimeout(() => {
            spinner.classList.replace("spinner-border","spinner");
            window.location.reload();
        }, 1000);
    });
}

const paintProperties = () => {
    //llamamos al archivo json con las propiedades
    fetch(URL)
    //convertimos la respuesta en formato json
    .then((respuesta) => respuesta.json())
    //pasamos las propiedades con el parametro informacion
    .then((informacion) => {
            informacion.map((el) => {
                container.innerHTML += `
                    <div class="card text-center" style="width: 20rem;">
                        <img src=${el.img} class="card-img-bottom" alt="..." />
                        <div class="card-body">
                            <h3 class="card-title">${el.name}</h3>
                            <p class="card-text">${el.details}</p>
                            <h4>Price: ${el.price}</h4>
                            <h4>Contract: ${el.contract}</h4>
                            <h4>Fee: ${el.fee}</h4>
                        </div class="btn">
                            <button id=${el.id} type="button" class="btn btn-outline-primary">More Info</button>
                        </div>
                    </div>`
                    })
                    
                    informacion.forEach((select) => {
                        //seleccionamos la propiedad que el usuario escogio
                        document.getElementById(`${select.id}`).addEventListener("click", () => {
                            //primera
                            navbar.classList.replace("navbar", "navbarRemove");
                            container.classList.replace("container", "containerRemove");
                            spinner.classList.replace("spinner", "spinner-border");
                            setTimeout(() => {
                                spinner.classList.replace("spinner-border", "spinner");
                                property.classList.replace("propertyRemove","property");
                                propertySelect(select)
                            }, 500);
                        })
                    })
        }) 
}

const propertySelect = (select) => {
    //eliminamos las propiedades y damos lugar a la opcion seleccionada
    property.innerHTML = `
        <div class="card mb-3" style="max-width: 940px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src=${select.interior3} class="img-fluid rounded-start" alt="...">
                    <img src=${select.interior2} class="img-fluid rounded-start" alt="...">
                    <img src=${select.interior3} class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h1 class="card-title">${select.name}</h1>
                        <p class="card-text">${select.details}</p>
                        <p class="card-text">${select.details}</p>
                        <p class="card-text">${select.details}</p>
                        <h3>Price: ${select.price}</h3>
                        <h3>Contract: ${select.contract}</h3>
                        <h3>Fee: ${select.fee}</h3>
                    </div>
                    <div>
                        <button id="back" type="button" class="btn btn-primary">Back</button>
                        <button id="reserve" type="button" class="btn btn-primary">Reserve</button>
                    </div>
                </div>
            </div>
        </div>`

        //al clickear nos llevara de nuevo a las propiedades
        let back = document.getElementById("back");
        back.addEventListener("click", () => {
            property.classList.replace("property","propertyRemove");
            spinner.classList.replace("spinner", "spinner-border")
            //eliminamos la propiedad seleccionada y pintamos todas las propiedades de nuevo
            //esto nos permite entrar a una propiedad seleccionada con mayor detalle y volver hacia las demas propiedades
            setTimeout(() => {
                navbar.classList.replace("navbarRemove", "navbar");
                container.classList.replace("containerRemove", "container");
                spinner.classList.replace("spinner-border", "spinner")
            }, 500);         
        })
        
        //al clickear se arroja una alerta
        let reserve = document.getElementById("reserve");
        reserve.addEventListener("click", () => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              //le pregunta al usuario si esta seguro de realizar la reserva
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, reserve this property!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                //si se confirma la reserva se le notifica al usuario
                if (result.isConfirmed) {
                    const propertySave = JSON.stringify(select);
                    localStorage.setItem(`Property`, propertySave);
                    swalWithBootstrapButtons.fire(
                        'Property reserved!',
                        'A file is downloaded below which contains your data and the propertys data so that you can approach the real estate agent and avoid delays.',
                        'success'
                  )
                  //si se cancela se retorna a la opcion seleccionada
                } else if (
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'You have canceled the operation',
                    'error'
                  )
                }
              })
        })
}



