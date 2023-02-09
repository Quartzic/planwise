// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const supabase_url = Deno.env.get("SUPABASE_URL");
const service_role_key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req) => {

  const supabase = createClient(supabase_url, service_role_key, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
  });
  
  const data = {
    message: `Working!`,
  }
  
  // get a list of todos that don't have dates
  let { data: todos, error: error } = await supabase
  .from('todos')
  .select(`
    task,
    inserted_at,
    deadline_at
  `)

  console.log(todos)

  todos.forEach((todo) => {
    if(isValidTime(deadline_at))
    // do the stuff for each todo here
    console.log(todo)
  })

  


  // schedule each todo and update its date

  // if everything went well return ok

  return new Response(
    JSON.stringify(data) + "\n",
  )

})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
