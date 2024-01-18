"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
class Database {
    constructor() {
        this.connection = mysql2_1.default.createConnection({
            host: 'localhost',
            user: 'MartaFr',
            password: 'Baloncesto1',
            database: 'ReservaCitas'
        });
    }
    connect() {
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
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
    close() {
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
exports.Database = Database;
