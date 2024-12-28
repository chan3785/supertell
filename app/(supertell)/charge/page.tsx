"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [walletServicesPlugin, setWalletServicesPlugin] =
    useState<any>();

  const bridge = async () => {};
  const faucet = async () => {
    const faucetUrl = `https://faucet.altnet.rippletest.net/accounts`;
    try {
    } catch (error: any) {
      console.error("Error funding wallet:", error.message);
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-20">
      <div className="z-10 w-full font-mono mt-10 text-white space-y-10">
        <div className="space-x-10">
        </div>
        <div className="space-x-10">
          <Button onClick={() => bridge()} className="bg-[rgb(105,227,169)]">Bridge</Button>
          <h1>Move Assets Between The Neo X and Neo N3</h1>
        </div>
      </div>
    </main>
  );
}
