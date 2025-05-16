"use client";

import { useCrossmintCheckout } from "@crossmint/client-sdk-react-ui";
import dynamic from "next/dynamic";

function Skeleton() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        background: "#151515",
        borderRadius: "5px",
        padding: "32px 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          height: 20,
          width: "60%",
          background: "#222",
          borderRadius: 4,
          marginBottom: 8,
        }}
      />
      <div style={{ height: 48, background: "#222", borderRadius: 4 }} />
      <div style={{ height: 48, background: "#222", borderRadius: 4 }} />
      <div style={{ display: "flex", gap: 8 }}>
        <div
          style={{ flex: 1, height: 48, background: "#222", borderRadius: 4 }}
        />
        <div
          style={{ width: 80, height: 48, background: "#222", borderRadius: 4 }}
        />
      </div>
      <div
        style={{
          height: 20,
          width: "40%",
          background: "#222",
          borderRadius: 4,
          marginBottom: 8,
        }}
      />
      <div style={{ height: 48, background: "#222", borderRadius: 4 }} />
      <div
        style={{
          height: 20,
          width: "30%",
          background: "#222",
          borderRadius: 4,
          alignSelf: "center",
          marginBottom: 8,
        }}
      />
      <div
        style={{
          height: 48,
          background: "#3E82F7",
          borderRadius: 4,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          height: 16,
          width: "70%",
          background: "#222",
          borderRadius: 4,
          alignSelf: "center",
        }}
      />
    </div>
  );
}

const DynamicCrossmintEmbeddedCheckout = dynamic(
  () =>
    import("@crossmint/client-sdk-react-ui").then(
      (mod) => mod.CrossmintEmbeddedCheckout
    ),
  { ssr: false, loading: () => <Skeleton /> }
);

function CrossmintCheckout({ amount }: { amount: number }) {
  const { order } = useCrossmintCheckout();
  const isLoading = !order?.phase || !order?.payment;

  return (
    <>
      <div style={{ display: isLoading ? "none" : "block" }}>
        <DynamicCrossmintEmbeddedCheckout
          appearance={{
            variables: {
              borderRadius: "5px",
              fontFamily:
                "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              colors: {
                danger: "#FF0000",
                warning: "#FFA500",
                backgroundPrimary: "#0E0E0E",
                textPrimary: "#FFFFFF",
                textSecondary: "#A0A0A0",
                borderPrimary: "#1F1F1F",
                accent: "#3E82F7",
              },
            },
            rules: {
              DestinationInput: {
                display: "hidden",
              },
              Input: {
                colors: {
                  background: "#151515",
                  border: "#2A2A2A",
                  text: "#FFFFFF",
                  placeholder: "#666666",
                },
              },
              PrimaryButton: {
                colors: {
                  background: "#3E82F7",
                  text: "#FFFFFF",
                },
                hover: {
                  colors: {
                    background: "#3B75E0",
                  },
                },
              },
              Tab: {
                colors: {
                  background: "#151515",
                  text: "#A0A0A0",
                },
                selected: {
                  colors: {
                    background: "#252525",
                    text: "#FFFFFF",
                  },
                },
              },
            },
          }}
          lineItems={{
            tokenLocator: "solana:6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
            executionParameters: {
              mode: "exact-in",
              amount: amount.toString(),
            },
          }}
          recipient={{
            walletAddress: "9MznXcmR45vKW2PnTKs1orUnwR23x9i4ARPxr5zhFH93",
          }}
          payment={{
            crypto: {
              enabled: false,
            },
            fiat: {
              enabled: true,
              allowedMethods: {
                card: true,
                applePay: false,
                googlePay: false,
              },
            },
            receiptEmail: "robin+hello@crossmint.com",
          }}
        />
      </div>
      <div style={{ display: isLoading ? "block" : "none" }}>
        <Skeleton />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0E0E0E", minHeight: "100vh" }}>
      <div style={{ maxWidth: "400px", margin: "40px auto" }}>
        <CrossmintCheckout amount={1} />
      </div>
    </div>
  );
}
