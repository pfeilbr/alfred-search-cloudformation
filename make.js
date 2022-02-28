import https from 'https';
import fs from "fs";

const itemsFromCDK = () => {
    const sourceDirectory = "data/aws-cdk/packages/@aws-cdk/cfnspec/spec-source/specification/000_cfn/000_official"
    const files = fs.readdirSync(sourceDirectory);
    const items = files.flatMap(f => {
        const data = JSON.parse(fs.readFileSync(`${sourceDirectory}/${f}`));
        return Object.keys(data[`ResourceTypes`] || {}).map(t => ({title: t, url: data["ResourceTypes"][t].Documentation}))
    })
    
    
    fs.writeFileSync('data.json', JSON.stringify(items, null, 2));
}

const itemsFromAwsToolKitVSCode = () => {
    let url = "https://raw.githubusercontent.com/aws/aws-toolkit-vscode/master/src/dynamicResources/model/supported_resources.json";


    https.get(url,(res) => {
        let body = "";
    
        res.on("data", (chunk) => {
            body += chunk;
        });
    
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                const items = Object.keys(json).map(e => ({title: e, url: json[e].documentation}))
                fs.writeFileSync('data.json', JSON.stringify(items, null, 2));
            } catch (error) {
                console.error(error.message);
            };
        });
    
    }).on("error", (error) => {
        console.error(error.message);
    });
}

itemsFromCDK();
//itemsFromAwsToolKitVSCode();