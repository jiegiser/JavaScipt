let sth = 0;
Array.from(Array(15))
    .map(Math.random)
    .forEach((v, i) => {
        sth = sth = v * i;
        console.log(sth);
    })