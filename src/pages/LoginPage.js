import React from "react";
import { supabase } from "../lib/api.js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useAuth } from "../components/Auth.js";
import { Navigate } from "react-router-dom";



export default function LoginPage() {
  const session = useAuth().session;

  return (
    <div className="mx-auto max-w-7xl px-4 flex flex-col gap-8 items-center justify-center">
      <div className="rounded p-4">
        {session ? (
          <Navigate to="/" />
        ) : (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#1f2937',
                    brandAccent: 'darkblue',
                  },
                },
              }, }}
            providers={['github']}
            socialButtonSize="xlarge"

          />
        )}
      </div>
    </div>
  );
}