import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { OpenAIApi, Configuration } from "https://esm.sh/openai";

const openai = new OpenAIApi(
    new Configuration({
        apiKey: Deno.env.get("OPENAI_API_KEY"),
    })
);

const supabase_url = Deno.env.get("SUPABASE_URL");
const service_role_key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req: Request) => {
    try {
        const supabase = createClient(supabase_url, service_role_key, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });

        // check if the given API key matches any in the api_keys database
        const { data: api_key_data, error: api_key_error } = await supabase
            .from("api_keys")
            .select("*")
            .eq("api_key", req.headers.get("X-API-Key"))
            .single();
        if (api_key_error) {
            throw new Error(api_key_error.message);
        } else {
            if (!api_key_data) {
                throw new Error("Invalid API Key");
            }
        }

        // get user id from api key
        let user_id = api_key_data.user_id;

        const { prompt } = await req.json();

        let task_split_prompt = `Based on the following request, create a comma-separated list of tasks:

        [Request] Tomorrow I'm going out with Susie. I should get her some flowers and get my haircut before our date. Also, I need to take Sam to the vet.
        [Response] Get Susie flowers,Get haircut,Take Sam to vet
        
        [Request] Refill my water bottle
        [Response] Refill water bottle
        
        [Request] ${prompt}
        [Response]
        `;

        // send the prompt to openai
        const task_split_response = await openai.createCompletion({
            prompt: task_split_prompt,
            model: "text-davinci-003",
            max_tokens: 100,
        });

        let split_tasks = task_split_response.data.choices[0].text.split(",");

        for (const task of split_tasks) {
            let duration_estimate_prompt = `Estimate the time that the following task would take, in minutes. Return -1 if the task is impossible or otherwise unclear. Only return one number, not a range:
                Take out the trash;5
                Do dishes;15
                Win hackathon;1440
                Solve p=np;-1
                Finish lab report;60
                ${task};`;

            const duration_estimate_response = await openai.createCompletion({
                prompt: duration_estimate_prompt,
                model: "text-davinci-003",
                max_tokens: 2,
            });

            let duration_estimate = parseInt(
                duration_estimate_response.data.choices[0].text.replace(" minutes", "")
            );
            if (duration_estimate < 0) {
                duration_estimate = null;
            }

            // make a new todo in the database
            const { data: todo_data, error: todo_error } = await supabase
                .from("todos")
                .insert([
                    {
                        task: task,
                        user_id: user_id,
                        duration: duration_estimate,
                    },
                ]);
        }

        // return the response
        return new Response(JSON.stringify(split_tasks), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }
});
