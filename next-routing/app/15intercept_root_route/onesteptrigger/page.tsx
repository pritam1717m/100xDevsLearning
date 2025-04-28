import Link from "next/link";
import React from "react";

export default function OneStepTrigger() {
  return (
    <div>
      <p>One Step Trigger</p>
      <Link href="/15intercept_root_route/onestepintercept" className="text-blue-500" >Intercept 1 step up</Link>
    </div>
  );
}
