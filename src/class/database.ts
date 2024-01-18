import mysql, { Connection } from 'mysql2';

export class Database {
    private connection: Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'MartaFr',
            password: 'Baloncesto1',
            database: 'ReservaCitas'
        });
    }


    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    public query(sql: string, args?: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}
