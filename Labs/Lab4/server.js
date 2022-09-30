const express = require("express")

const app = express()

const SERVER_PORT = 8088

/* +======================================== GET request: /hello return "Hello Express JS ========================================+ */
// http://localhost:8088/hello
app.get("/hello", (req, res) => {
    res.send("Hello Express JS")
})

/* +========= GET request: /user return  { "firstname":"Pritesh", "lastname": "Patel" }. Use Querystring to send values =========+ */
// http://localhost:8088/user?firstname=Pritesh&lastname=Patel
app.get("/user", (req, res) => {
    var user = {
        firstname: req.query.firstname,
        lastname: req.query.lastname
    }

    res.send(JSON.stringify(user))
})

/* +======= POST request: /user return  { "firstname":"Pritesh", "lastname": "Patel" }. Use path parameter to send values =======+  */
// http://localhost:8088/user/Pritesh/Patel
app.post("/user/:firstname/:lastname", (req, res) => {
    var user = {
        firstname: req.params.firstname,
        lastname: req.params.lastname
    }

    res.send(JSON.stringify(user))
})

app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})