import {connect, connection} from 'mongoose';

const conn = {
    isConnected: false
}

export async function dbConnect(){
    if(conn.isConnected) return;
    const db = await connect(process.env.MONGODB_URL)
    conn.isConnected = db.connections[0].readyState
    console.info(db.connection.db.databaseName)
}

connection.on('connected',()=>{
    console.info('Connection to database established')
})

connection.on('error',(err)=>{
    console.error(err)
})