export async function register() {
  const { connectToDB } = await import('./utils/connectToDB');

  await connectToDB();
}
