import * as mongoose from 'mongoose';

class Database {
    private DB_URL: string;

    constructor() {
        this.DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/db_portal';
        console.log(`Attempting to connect to MongoDB at: ${this.DB_URL}`);
    }

    async createConnection() {
        try {
            await mongoose.connect(this.DB_URL, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log('✅ Connected to MongoDB');
            
            mongoose.connection.on('error', (err) => {
                console.error('MongoDB connection error:', err);
            });
            
            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected');
            });
        } catch (error) {
            console.error('❌ MongoDB connection error:', error);
            console.error(`Failed to connect to MongoDB at: ${this.DB_URL}`);
            console.error('Please verify:');
            console.error('1. MongoDB server is running');
            console.error('2. Connection string is correct');
            console.error('3. Network connectivity exists');
            process.exit(1);
        }
    }
}

export default Database;