1>Install [express];

2>[app.listen(7797)];

3>DB (atlas , compass , install Mongoose)

4>[mongoose.connect] (URL) {AsyncAwait}

5>phele [DB_connect] kro phir listen kroo (export ConnectDB to app.js and vha .then krke connect kro )

6>Create [Schema]

7>GET POST PATCH DELETE (/api) to DB from POSTMAN
[CRUDD]
\*\*\*
[req.body] jo hai wo undefined show hogaa hameshaa kyuki Node JSON file read ni kr pata uske liye ham ek middleware use krege to change
the format of JSON into JS object using Express_in_Built_Middleware :
[app.use(express.json())]

8>Validation , Data sanitization (mostly used in Post Patch Api)

9>Encryption
