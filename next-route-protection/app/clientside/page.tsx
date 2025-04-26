"use client";

import { sessionStatus } from "@/utils/session";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

export default function page() {
  useLayoutEffect(() => {  // loaded before page renders, useEffect loads after the page rendered
    const session = sessionStatus;
    if(!session) {
        redirect("/")
    }
  }, []);
  return <div>This is protected route from clinet side</div>;
}
