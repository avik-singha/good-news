const news = require('../model/index');

module.exports={

    // getNews : function(req, res, next){
    //     let totalItemsPerPage = 10

    getGoodNews : function(req, res, next){
        let totalItemsPerPage = 10;
        let pageNum = req.params.pageno;
        let ItemsToSkip = pageNum*totalItemsPerPage;
        

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
                return res.status(200).json({
                    isError: false,
                    message: "News details",
                    statuscode: 200,
                    details: docs
                  });
            }
        })
    
    },
    
    getProgressiveGoodNews : function(req, res, next){        

        let avgTone = req.body.avgtone;
        let goldSteinScale = req.body.gsscale;    

        let aggrQry = [
            {
                $sample : {size : 100}
            },
            {
                $match:{
                    $and: [
                        {$eq:["$GoldsteinScale",goldSteinScale]},
                        {AvgTone:{$gt: avgTone}}
                    ]
                },
            },
            {
                $project: {
                    SourceURL : 1
              }
            }    

        ]

        news.aggregate(aggrQry).exec((err,docs)=>{
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
                    message: "News details - Progressive",
                    statuscode: 200,
                    details: docs
                  });
            }
        })    
    },

    getRandomGoodNews : function(req, res, next){        
        console.log("random")
        let aggrQry = [
            {
                $sample : {size : 1000}
            },
            {
                $match:{
                    $and: [{GoldsteinScale: {$gt: 1}},{AvgTone:{$gt: 1}}]
                },
            },
            {
                $project: {
                    SourceURL : 1
              }
            }    

        ]

        news.aggregate(aggrQry).exec((err,docs)=>{
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
                    message: "News details - Random",
                    statuscode: 200,
                    details: docs
                  });
            }
        })    
    },

    getCountryWiseGoodNewsCount: function(req, res, next){
        let aggrQry = [
            {$match: 
                {$and: [{GoldsteinScale: {$gt: 1}},{AvgTone:{$gt: 1}}]}
            },
            {
              $group: {
                 _id: "$Actor2CountryCode",
                 count: { $sum:1 } 
              }
            }
          ]

        news.aggregate(aggrQry).exec((err,docs)=>{
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
                    message: "Country wise good news count",
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