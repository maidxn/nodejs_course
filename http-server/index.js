const http = require("http");

const PORT = 4000;

const server = http.createServer();

const heros = [
  {
    id: 0,
    name: "Bakugo Katsuki",
    hero_name: "Great Explosion Murder God Dynamight",
  },
  {
    id: 1,
    name: "Midoriya Izuku",
    hero_name: "Deku",
  },
  {
    id: 2,
    name: "Todoroki Shoto",
    hero_name: "Shoto",
  },
];

server.on("request", (req, res) => {
  const items = req.url.split("/");
  if (items[1] === 'info'){
    if (req.method == 'POST'){
        res.setHeader('Content-Security-Policy' , 'http://localhost:4000/heros')
        req.on('data', (data) => {
            const text = data.toString()
            console.log("Add hero:", text)
            heros.push(JSON.parse(text))
        })
        req.pipe(res)

    }
    else if (items.length === 3){
        const index = Number(items[2])
        res.end(JSON.stringify(heros[index]))
    } else {
        res.end(JSON.stringify(heros))
    }
  } else {
    res.statusCode = 404
    res.write("<h1>404</h1>")
    res.end()
    }
});


server.listen(PORT, () => {
  console.log(`PORT ${PORT} is waiting to server you~`);
});
