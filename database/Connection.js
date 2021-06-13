const axios = require('axios');
const qs = require('qs');

//for local access uncomment the code below
// const DATA_URL = process.env.BASE_URL || "http://localhost:3030"; 

//for production
const DATA_URL ="http://31.220.62.156:3030";

const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

exports.getKafe = async(param)=>{
    // Query
        let searchNama = param.nama;
        let searchQueryNama = [];

        let searchAlamat = param.alamat;
        let searchQueryAlamat = [];

        let searchFasilitas = param.fasilitas;
        let searchQueryFasilitas = [];

        let searchMenu = param.menu;
        let searchQueryMenu = [];

        if(searchNama != null){
            let searchNamaSplit = searchNama.split(" ");    
        
            for(j in searchNamaSplit){
                searchQueryNama.push (`regex(?nama,"${searchNamaSplit[j]}", "i")`);
            }   
        }

        if(searchAlamat != null){
            let searchAlamatSplit = searchAlamat.split(" ");    
        
            for(j in searchAlamatSplit){
                searchQueryAlamat.push (`regex(?alamat,"${searchAlamatSplit[j]}", "i")`);
            }   
        }
        if(searchFasilitas != null){
            let searchFasilitasSplit = searchFasilitas.split(" ");    
        
            for(j in searchFasilitasSplit){
                searchQueryFasilitas.push (`regex(?fasilitas,"${searchFasilitasSplit[j]}", "i")`);
            }   
        }
        if(searchMenu != null){
            let searchMenuSplit = searchMenu.split(" ");    
        
            for(j in searchMenuSplit){
                searchQueryMenu.push (`regex(?menu,"${searchMenuSplit[j]}", "i")`);
            }   
        }

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
            OPTIONAL {?sub data:hasFacilities ?fasilitasID.}
            OPTIONAL {?fasilitasID data:fasilitas ?fasilitas.}
            OPTIONAL {?sub data:menu ?menu.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            FILTER regex(?id, "${param.id ? param.id : ''}", "i")
            FILTER (${searchQueryNama.length >0 ? searchQueryNama.join(" && ") : '?nama'})
            FILTER (${searchQueryAlamat.length >0 ? searchQueryAlamat.join(" && ") : '?alamat'})
            FILTER (${searchQueryFasilitas.length >0 ? searchQueryFasilitas.join(" && ") : '?fasilitas'})
            FILTER (${searchQueryMenu.length >0 ? searchQueryMenu.join(" && ") : '?menu'})
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
        console.log(err);

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
            OPTIONAL {?sub data:hasFacilities ?fasilitasID.}
            OPTIONAL {?fasilitasID data:fasilitas ?fasilitas.}
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
            console.log(err);
        }
    };