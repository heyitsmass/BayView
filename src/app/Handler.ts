'use server';

import { HomepageAction } from '@/context';

export default async function Handler(action: HomepageAction) {  

  

  return {
    statusCode: 200,
    body: {
      message: 'Hello World!'
    }
  };
}
