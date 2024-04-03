const { MongoClient } = require('mongodb')

let dbConnection;
let uri = 'mongodb+srv://aliassly13:vgwLZfdrcQzlpXzI@sbacluster.nkeskcn.mongodb.net/'

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri).then((client) => {
            dbConnection = client.db()
            return cb();
        }).catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection


}