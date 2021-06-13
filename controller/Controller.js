const connection = require('../database/Connection');
const Format = require('../addons/format');

module.exports.getKafe = async (req, res) => {
    try{
        console.log("function starting")
        // Query data dari repo
        let djakafe = await connection.getKafe(req.query);

        if(!djakafe.bindings.length){
            return res.status(200).json({
                data:[],
                message: "Data tidak ditemukan"
            });
        }

        djakafe = djakafe.bindings.map((kafe)=>Format(kafe));

        if(req.params.id){
            let kafe = djakafe.filter((kafe)=>{
                return kafe.id == req.params.id
            });
            res.status(200).json({
                data:kafe[0],
                message: kafe.length ? 'Data kafe berhasil didapatkan' : 'Tidak ada hasil dari pencarian'
            })
        }else{
            res.status(200).json({
                data: djakafe,
                message: "Menampilkan semua kafe"
            })
        }
    }catch(err){
        res.status(400).json(err);
        console.log(err);

    }
}

module.exports.getSuggestion = async(req, res)=>{
    try{
        // Query data dari connection
        let djakafe = await connection.getSuggestion(req.query);

        if(!djakafe.bindings.length){
            return res.status(200).json({
                data:[],
                message: "Data tidak ditemukan"
            });
        }

        djakafe = djakafe.bindings.map((kafe)=>Format(kafe));
        res.status(200).json({
            data: djakafe,
            message: "Data Seluruh Kafe"
        })

    }catch(err){
        res.status(400).json(err);
        console.log(err);
    }
}