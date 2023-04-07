//https://the-one-api.dev/

fetch("https://the-one-api.dev/v2/character", {
  headers: {
    Authorization: "BEARER bMR6CsmZkKJExGmI7O4k",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

/*
  LOTR
  bMR6CsmZkKJExGmI7O4k
  */
