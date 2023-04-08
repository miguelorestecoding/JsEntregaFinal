fetch("https://api.estadisticasbcra.com/usd_of", {
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
