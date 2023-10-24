
'use server'
export function handleLogin(form:react.FormData){
   const username = form.get('username')?.value; 
   const password = form.get('password')?.value; 
   /** perform work */ 
   

   return { ok: true} 
}