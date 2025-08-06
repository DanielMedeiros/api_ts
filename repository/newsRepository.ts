import * as mongoose from 'mongoose';
import NewsSchema from '../models/newsSchema';

export default mongoose.model('News', NewsSchema, 'news'); // 'news' is the collection name
