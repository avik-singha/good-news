const news = require('../model/index');

module.exports={

    getGoodNews : function(req, res, next){
        let totalItemsPerPage = 10;
        let pageNum = req.params.pageno;
        let ItemsToSkip = pageNum*totalItemsPerPage;
        
        let aggrQry = [
            {
                $match : {
                    $and: [{GoldsteinScale: {$gt: 1}},{AvgTone:{$gt: 1}}]
                }                
            },
            {$skip:ItemsToSkip},
            {$limit:totalItemsPerPage},
            {$project : {
                SourceURL:1
            }},
            {
                $sort : {
                    DateAdded : 1
                }
            } 
        ]

        news.aggregate(aggrQry).exec((err, docs) => {
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
        let totalItemsPerPage = 10;
        let pageNum = req.params.pageno;
        let ItemsToSkip = pageNum*totalItemsPerPage;
        let avgTone = req.body.avgtone;
        let goldSteinScale = req.body.gsscale;    

        let aggrQry = [
            {
                $match:{
                    $and: [
                        {$eq:["$GoldsteinScale",goldSteinScale]},
                        {AvgTone:{$gt: avgTone}}
                    ]
                },
            },
            {$skip:ItemsToSkip},
            {$limit:totalItemsPerPage},
            {
                $project: {
                    SourceURL : 1
              }
            },
            {
                $sort : {
                    DateAdded : 1
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

    getCountryAndYearwiseNews : function(req, res, next){
        let totalItemsPerPage = 50
        console.log(req.body);
        let pageNum = req.body.pageno;
        let ItemsToSkip = pageNum*totalItemsPerPage

        let aggrQry=[];
        if(req.body.countryCode!=="" && req.body.year!=="")
        {
            aggrQry=[
                {$match:
                    {
                $and: [{GoldsteinScale: {$gt: 1}},{AvgTone:{$gt: 1}},
                    {Actor2CountryCode: req.body.countryCode},
                    {Year: parseInt(req.body.year)}
                ]
              }
            },            
            {$skip:ItemsToSkip},
            {$limit:totalItemsPerPage},
            {$project : {
                SourceURL:1
            }}
         ]
        }
        else if(req.body.countryCode=="")
        {
            aggrQry=[
                {$match:
                    {
                $and: [{GoldsteinScale: {$gt: 1}},{AvgTone:{$gt: 1}},
                    {Year: parseInt(req.body.year)}
                ]
              }
            },            
            {$skip:ItemsToSkip},
            {$limit:totalItemsPerPage},
            {$project : {
                SourceURL:1
            }}
         ]
        }else if(req.body.year=="")
        {
            aggrQry=[
                {$match:
                    {
                $and: [{GoldsteinScale: {$gt: 1}},{AvgTone:{$gt: 1}},
                    {Actor2CountryCode: req.body.countryCode}                   
                ]
              }
            },            
            {$skip:ItemsToSkip},
            {$limit:totalItemsPerPage},
            {$project : {
                SourceURL:1
            }}
         ]
        }else{
            aggrQry=[
                {$match:
                    {
                $and: [{GoldsteinScale: {$gt: 1}},{AvgTone:{$gt: 1}},                  
                ]
              }
            },            
            {$skip:ItemsToSkip},
            {$limit:totalItemsPerPage},
            {$project : {
                SourceURL:1
            }}
         ]
        }
        

        news.aggregate(aggrQry).exec((err, docs) => {
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

    getDayWiseGoodNewsCount: function(req, res, next){
        let startDate = req.body.startdate
        let endDate = req.body.enddate
        let month = req.body.month
        let year = req.body.year
        let computedStartDate = parseInt(year.toString()+month.toString()+startDate.toString());
        let computedEndDate = parseInt(year.toString()+month.toString()+endDate.toString());
        let aggrQry = [
            [{$match: 
                {$and: [
                    {Day:{$gte:computedStartDate,$lte:computedEndDate}},
                    {GoldsteinScale: {$gt: 1}},
                    {AvgTone:{$gt: 1}}
                   ]
                }
            },
            {
              $group: {
                 _id: "$Day",
                 count: { $sum:1 } 
              }
            },
            {$sort:{
                "_id":1
            }}]
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
    }

}