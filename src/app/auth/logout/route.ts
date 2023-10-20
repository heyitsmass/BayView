import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export async function GET() {

  const cookieStore = cookies();
  cookieStore.delete('refresh_token');
  cookieStore.delete('access_token');
  redirect('/auth/login');
}

