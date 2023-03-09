
const ObjectId = require('mongodb').ObjectId

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // const artistdata = {
    //   artistName :"Samar",
    //   email : "sam123@gmail.com",
    //   password : "3333",
    //   role : " admin"
    // }
    // artistdata.password = await bcrypt.hash(
    //   artistdata.password,
    //   10
    // );
     
    //   await db.collection('artistdatas').insertOne(artistdata)

     await db.collection('artistdatas').updateOne({_id :new ObjectId("6401c8dfe69481cf4fb49a4f")},{$set : {role :"admin"}})

  }
    ,
  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
   await db.collection('artistdatas').updateOne({_id :new ObjectId("6401c8dfe69481cf4fb49a4f")}, {$set: {role: "artist"}});
  }
};
