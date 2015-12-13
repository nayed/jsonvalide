'use strict'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactApp from './es5-lib/react-app.js'

import express from 'express'
const app = express()

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    const rApp = React.createFactory(ReactApp)({})
    const reactHtml = ReactDOMServer.renderToString(rApp)

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>JSON Formatter</title>
      </head>
      <body>
        <div id="app">${reactHtml}</div>
        <script src="/static/js/react-app.js"></script>
      </body>
    </html>
    `
    res.send(html)
})

const server = app.listen(9000, () => {
    let port = server.address().port
    console.log(`Server running at http://localhost:${port}`)
})