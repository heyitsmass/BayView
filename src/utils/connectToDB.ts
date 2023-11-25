import mongoose from 'mongoose';

export async function connectToDB(): Promise<void> {
  try {
    const { MONGODB_URI } = process.env;
    let { ENV } = process.env;

    if (!MONGODB_URI) throw Error('MONGODB_URI is not defined');

    if (!ENV) ENV = 'DEV';

    const dbName = ENV !== 'DEV' ? 'bayview' : 'bayview-dev';

    await mongoose.connect(
      `${MONGODB_URI}/${dbName}?retryWrites=true&w=majority`
    );

    const { name, port } = mongoose.connection;

    console.log('\n*********** MongoDB ***********\n');
    console.log(`  Name: ${name}`);
    console.log(`  Port: ${port}`);
    console.log('\n********** Connected **********\n');
  } catch (err) {
    const { message } = err as Error;
    console.log(message);
  }
}
