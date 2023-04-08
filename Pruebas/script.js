// MI CODIGO
/*fetch("https://api.estadisticasbcra.com/usd_of", {
  headers: {
    Authorization:
      "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTI0OTYyMzQsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJtaWd1ZWxvcmVzdGVjb2RpbmdAZ21haWwuY29tIn0.JlHmFQCNxU4CVo83UiAzz0DfeEF-wLrA3Pup2N2j14fHIx_41q1I4DtUmdAXBFFa4LILJQpW87L7kgDY4YEKzQ",
  },
})
  .then((response) => {
    response.json;
  })
  .then((data) => {
    console.log(data);
  });
*/

//CODIGO TUTOR
const url = "https://api.estadisticasbcra.com/usd";
const token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTI0OTYyMzQsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJtaWd1ZWxvcmVzdGVjb2RpbmdAZ21haWwuY29tIn0.JlHmFQCNxU4CVo83UiAzz0DfeEF-wLrA3Pup2N2j14fHIx_41q1I4DtUmdAXBFFa4LILJQpW87L7kgDY4YEKzQ";

fetch(url, {
  headers: {
    Authorization: `BEARER ${token}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error en la solicitud: " + response.statusText);
    }
  })
  .then((data) => {
    console.log("Cotizacion dolar Banco Nacion:", data);
  })
  .catch((error) => {
    console.error(error);
  });
