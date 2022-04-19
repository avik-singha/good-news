const news = require('../model/index');

module.exports={

    getNews : function(req, res, next){
        news.find({$and: [{GoldsteinScale: {$gt: 1}},{AvgTone:{$gt: 1}}]},
            {_id:0,SourceURL:1,downloadId : 1},{limit:20},function(err,docs){
            if(err)
            {
                return res.status(200).json({
                    isError: true,
                    message: "Failed",
                    statuscode: 200,
                    details: null
                  });
            }else{
                return res.status(200).json({
                    isError: false,
                    message: "News details",
                    statuscode: 200,
                    details: docs
                  });
            }
        })
    
    },


}