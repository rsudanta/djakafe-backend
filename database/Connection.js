const axios = require('axios');
const qs = require('qs');

const DATA_URL = process.env.BASE_URL || "http://localhost:3030";

const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

exports.getKafe = async(param)=>{
    // Query
    const queryData = {
        query: `PREFIX data: <http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT ?id ?nama ?alamat ?rating ?fasilitas ?menu ?urlFoto
        WHERE{
            ?sub rdf:type data:kafe
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:nama ?nama.}
            OPTIONAL {?sub data:alamat ?alamat.}
            OPTIONAL {?sub data:rating ?rating.}
            OPTIONAL {?sub data:fasilitas ?fasilitas.}
            OPTIONAL {?sub data:menu ?menu.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            FILTER regex(?nama, "${param.nama ? param.nama : ''}", "i")
            FILTER regex(?id, "${param.id ? param.id : ''}", "i")
            FILTER regex(?alamat, "${param.alamat ? param.alamat : ''}", "i")
            FILTER regex(?rating, "${param.rating ? param.rating : ''}", "i")
            FILTER regex(?fasilitas, "${param.fasilitas ? param.fasilitas : ''}", "i")
            FILTER regex(?menu, "${param.menu ? param.menu : ''}", "i")
        }ORDER BY ASC(?nama)`
    };
    try{
        const {data} = await axios(`${DATA_URL}/djakafe/query`,{
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        });
        console.log(data.results);
        return data.results;
    }catch(err){
        res.status(400).json(err);
    }
};

module.exports.getSuggestion = async(param)=>{
    // Query
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
        SELECT ?id ?nama ?alamat ?rating ?fasilitas ?menu ?urlFoto
        WHERE{
            ?sub rdf:type data:kafe
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:nama ?nama.}
            OPTIONAL {?sub data:alamat ?alamat.}
            OPTIONAL {?sub data:rating ?rating.}
            OPTIONAL {?sub data:fasilitas ?fasilitas.}
            OPTIONAL {?sub data:menu ?menu.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            FILTER regex(?fasilitas, "${param.fasilitas ? param.fasilitas : ''}", "i")
        } ORDER BY RAND() LIMIT 4`
        };
        try{
            const {data} = await axios(`${DATA_URL}/djakafe/query`,{
                method: 'POST',
                headers,
                data: qs.stringify(queryData)
            });
            return data.results;
        }catch(err){
            res.status(400).json(err);
        }
    };
