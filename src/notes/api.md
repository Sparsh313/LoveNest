# DevTinder APIs

## Auth Router

-POST /signup
-POST /login
-POST /logout

## profile Router

> -GET /profile/view
> -PATCH /profile/edit
> -PATCH /profile/password

## ConnectionReqRouter

-POST /request/send/:status/:userId
-POST /request/review/:status/:requestedId

## UserRouter

-GET /connections
-GET /request/recieve
-GET /feed

Status:intrested,ignore,accept,reject
