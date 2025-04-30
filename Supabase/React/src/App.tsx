import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Task from "./components/Task";
import { supabase } from "./supabase_client";

function Page() {
  const [session, setSession] = useState<any>(null);

  async function fetchSession() {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session)
  } 
  useEffect(() => { 
    fetchSession()

    const {data : authListener} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }

  }, []) 

  
  return (
    <div style={{ margin: 20 , display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      {session ? <Task session={session}/> : <Auth />}
    </div>
  );
}
export default Page;
