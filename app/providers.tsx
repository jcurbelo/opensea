"use client";
import {
  CrossmintCheckoutProvider,
  CrossmintProvider,
} from "@crossmint/client-sdk-react-ui";

const clientApiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY;

if (!clientApiKey) {
  throw new Error("NEXT_PUBLIC_CROSSMINT_API_KEY is not set");
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CrossmintProvider apiKey={clientApiKey}>
      <CrossmintCheckoutProvider>{children}</CrossmintCheckoutProvider>
    </CrossmintProvider>
  );
};
