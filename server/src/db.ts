import { MongoClient, Db } from 'mongodb'

let db: Db

export function dbInitialize(conn: string): Promise<void> {
    return MongoClient.connect(conn).then(database => {
        db = database
    }).catch(err => {
        console.error(err)
    })
}

export function getDb(): Db {
    return db
}