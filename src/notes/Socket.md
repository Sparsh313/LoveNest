[User_Interface]

> 1>Create a Chat component => const { targetId } = useParams();
> 2>Route path="/chat/:targetId"
> 3>Build Ui for my chat window

setup in backend (1st step) phir wapis a jao FE pe

> 4>npm i socket.io-client
> 5>function banao createSocketConnections naam ka aur return kr do io(BASE_URL);
> 6>chat.js me jaake yhi function call kro then UseEffect me Socket.emit((join),{userId , recieverId})
> 7>As soon as page unloads disconnect kr do

now go to backend and create a Room in Joinchat

> 8>sendMsg trigger krne ke liye ek fnc banao aur socket emit krwa do usme {name,userId,recieverId,newMsg} bhej ke
> use value=newMsg and onChage krne pe setnewMSg(e.t.v) in input bar
> phir yhi newMsg bhej do socke.emit pe on clicking send

go to BackEnd and listen to sendMsg

[Backend]

> 1>setup socket.io

a> [App.js] me
(const http = require(http) , phir server banao using http.createServer(app))

b> [sockets.js] me
1>socket.io ko Import: Sabse pehle, humne socket.io ko import kiya hai, jo client aur server ke beech real-time communication manage karta hai.
2>Initializesockets function banae ge jo ki call hoga App.js , app.js ko tidy rkhne ke lie
3>const io = socket(server,{cors}) => socket.io ko server ke saath initialize karta hai.
3>io.on("connection", ()) => connection Event : Jab koi client connect karta hai, yeh event trigger hota hai.

> 2> Creating a room in JoinChat

JoinChat frontend se trigger kre ga socket.on pe
dono user ke liye roomId bana do and
socket.join(roomId) => join kra do us roomId pe

> 3> Listen to sendMsg
