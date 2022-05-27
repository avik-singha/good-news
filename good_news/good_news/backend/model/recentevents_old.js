const mongoose = require('mongoose');


let recentEvents = mongoose.Schema(
      {
        GlobalEventId: Number,
        Day: Number,
        MonthYear: Number,
        Year: Number,
        FractionDate: Number,
        IsRootEvent: Number,
        EventCode: String,
        EventBaseCode: String,
        EventRootCode: String,
        QuadClass: Number,
        GoldsteinScale: Number,
        NumMentions: Number,
        NumSources: Number,
        NumArticles: Number,
        AvgTone: Number,
        DateAdded: Date,
        SourceURL: String,
        actorCodes: Array,
        points: Array,
        Actor1: {
            Name: String,
            Code: String,
            CountryCode: String,
            KnownGroupCode: String,
            EthnicCode: String,
            Religion1Code: String,
            Religion2Code: String,
            Type1Code: String,
            Type2Code: String,
            Type3Code: String,
            Geo: {
                type: String,
                coordinates: Array
            },
            Geo_Type: Number,
            Geo_Fullname: String,
            Geo_CountryCode: String,
            Geo_ADM1Code: String,
            Geo_ADM2Code: String,
            Geo_FeatureID: String
        },
        Actor2: {
            Name: String,
            Code: String,
            CountryCode: String,
            KnownGroupCode: String,
            EthnicCode: String,
            Religion1Code: String,
            Religion2Code: String,
            Type1Code: String,
            Type2Code: String,
            Type3Code: String,
            Geo: {
                type: String,
                coordinates: Array
            },
            Geo_Type: Number,
            Geo_Fullname: String,
            Geo_CountryCode: String,
            Geo_ADM1Code: String,
            Geo_ADM2Code: String,
            Geo_FeatureID: String,
        },
        Action: {
            Geo: {
                type: String,
                coordinates: Array
            },
            Geo_Type: Number,
            Geo_Fullname: String,
            Geo_CountryCode: String,
            Geo_ADM1Code: String,
            Geo_ADM2Code: String,
            Geo_FeatureID: String,
        },
        Info: {
            meta: {
                title: String,
                description: String,
            },
            og: {
                site_name : String,
                title : String,
                type : String,
                description : String,
                image : String,
            }
        }
    }
)

const news = mongoose.model("recentEvents",recentEvents,"recentEvents");

module.exports=news;