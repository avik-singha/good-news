const mongoose = require('mongoose');


let eventsCSV = mongoose.Schema(
    {
         Day :  Number ,
         MonthYear :  Number ,
         Year :  Number ,
         FractionDate : Number,
         Actor1Code :  String ,
         Actor1Name :  String ,
         Actor1CountryCode :  String ,
         Actor2Code :  String ,
         Actor2Name :  String ,
         Actor2CountryCode :  String ,
         Actor2Type1Code :  String ,
         IsRootEvent :  Number ,
         EventCode :  Number ,
         EventBaseCode :  Number ,
         EventRootCode :  Number ,
         QuadClass :  Number ,
         GoldsteinScale : Number,
         NumMentions :  Number ,
         NumSources :  Number ,
         NumArticles :  Number ,
         AvgTone : Number,
         Actor1Geo_Type :  Number ,
         Actor1Geo_Fullname :  String ,
         Actor1Geo_CountryCode :  String ,
         Actor1Geo_ADM1Code :  String ,
         Actor1Geo_ADM2Code :  Number ,
         Actor1Geo_Lat :  Number ,
         Actor1Geo_Long :  Number ,
         Actor1Geo_FeatureID :  Number,
         Actor2Geo_Type :  Number ,
         Actor2Geo_Fullname :  String ,
         Actor2Geo_CountryCode :  String ,
         Actor2Geo_ADM1Code :  String ,
         Actor2Geo_ADM2Code :  Number ,
         Actor2Geo_Lat :  Number,
         Actor2Geo_Long :  Number ,
         Actor2Geo_FeatureID :  Number ,
         ActionGeo_Type :  Number ,
         ActionGeo_Fullname :  String ,
         ActionGeo_CountryCode :  String ,
         ActionGeo_ADM1Code :  String ,
         ActionGeo_ADM2Code :  Number ,
         ActionGeo_Lat : Number ,
         ActionGeo_Long :  Number ,
         ActionGeo_FeatureID : Number ,
         DateAdded :  Date ,
         SourceURL :  String ,
         downloadId :  Number 
      }
)

const news = mongoose.model("eventsCSV",eventsCSV,"eventsCSV");

module.exports=news;