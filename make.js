const https = require('https');
const fs = require("fs");

let url = "https://raw.githubusercontent.com/aws/aws-toolkit-vscode/master/src/dynamicResources/model/supported_resources.json";

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            const output = Object.keys(json).map(e => ({title: e, url: json[e].documentation}))
            fs.writeFileSync('data.json', JSON.stringify(output, null, 2));
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});