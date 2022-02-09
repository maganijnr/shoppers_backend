import mongoose from 'mongoose';
import colors from 'colors';

async function connectDb(){
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI)

      console.log(colors.green.underline('DB connected successfully'))
   } catch (error) {
      console.log(colors.red.bold('Unable to connect to mongo db'))
   }
}

export default connectDb