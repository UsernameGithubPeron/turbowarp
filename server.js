const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

let players = [];

wss.on("connection", (ws) => {
players.push(ws);

ws.on("message", (message) => {
players.forEach((player) => {
if (player.readyState === WebSocket.OPEN) {
player.send(message.toString());
}
});
});

ws.on("close", () => {
players = players.filter(player => player !== ws);
});
});

console.log("Multiplayer server running");
