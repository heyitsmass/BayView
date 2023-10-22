'use server';

import { DashboardAction } from '@/context';

export default async function Handler(action: DashboardAction) {  

  

  return {
    statusCode: 200,
    body: {
      message: 'Hello World!'
    }
  };
}
