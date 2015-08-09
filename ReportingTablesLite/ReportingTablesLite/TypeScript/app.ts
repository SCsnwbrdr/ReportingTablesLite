requirejs.config({
    baseUrl: "Scripts",
    paths: {
        jquery: "libs/jquery-2.1.4.min",
        datatables: "libs/DataTables/jquery.dataTables",
        app: "app.js"
    }
})

import firstReport = require("FirstReport");