"use client";

import dynamic from "next/dynamic";

const DynamicCrossmintEmbeddedCheckout = dynamic(
  () =>
    import("@crossmint/client-sdk-react-ui").then(
      (mod) => mod.CrossmintEmbeddedCheckout
    ),
  { ssr: false }
);

function CrossmintCheckout({ amount }: { amount: number }) {
  return (
    <DynamicCrossmintEmbeddedCheckout
      appearance={{
        variables: {
          borderRadius: "5px",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
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
