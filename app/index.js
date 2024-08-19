const express = require('express')
const app = express()

const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();

collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
    res.setHeader("Content-type", register.contentType);
    res.send(await register.metrics());
});

app.get("/", (req, res, next) => {
    res.setHeader("Content-type", "text/html");
    res.send(/*html*/"<marquee>Hello world!</marquee>");
    next();
});

app.listen(4000, '0.0.0.0')