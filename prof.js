var fs = require('fs'); 
var axios = require('axios');

var getFolder = async () => {
    await axios({
        url: 'http://api.github.com/repos/owid/covid-19-data/contents/public/data/vaccinations/country_data?ref=master',
        method: 'get'
    }).then(async response => {return response})
    .then(async response => response.data.map(async item => {
        const writer = fs.createWriteStream(`./data/${item.name}`)
        const streamResponse = await axios({
            url: `http://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/${item.name}`,
            method: 'get',
            responseType: 'stream'
        })
        streamResponse.data.pipe(writer);
        writer.on('error', () => {console.log('error')})
    }))
    console.log("finished")
}
getFolder()
