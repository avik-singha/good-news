const news = require('../model/index');

module.exports={

    getNews : function(req, res, next){
        let totalItemsPerPage = 10

        let pageNum = req.params.pageno;
        let ItemsToSkip = pageNum*totalItemsPerPage

        news.find({$and: [{GoldsteinScale: {$gt: 1}},{AvgTone:{$gt: 1}}]},
            {SourceURL:1},{skip:ItemsToSkip,limit:totalItemsPerPage},function(err,docs){
            if(err)
            {
                return res.status(200).json({
                    isError: true,
                    message: "Failed",
                    statuscode: 200,
                    details: null
                  });
            }else{
                // console.log(docs);
                return res.status(200).json({
                    isError: false,
                    message: "News details",
                    statuscode: 200,
                    details: docs
                  });
            }
        })
    
    },


    getCountrywiseNews : function(req, res, next){
        let totalItemsPerPage = 50
        console.log(req.body);
        let pageNum = req.body.pageno;
        let ItemsToSkip = pageNum*totalItemsPerPage

        news.find({$and: [{GoldsteinScale: {$gt: 1}},
            {AvgTone:{$gt: 1}},
            {Actor2CountryCode: req.body.countryCode}
        ]},
            {SourceURL:1},{skip:ItemsToSkip,limit:totalItemsPerPage},function(err,docs){
            if(err)
            {
                return res.status(200).json({
                    isError: true,
                    message: "Failed",
                    statuscode: 200,
                    details: null
                  });
            }else{
                // console.log(docs);
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