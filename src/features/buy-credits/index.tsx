"use client";

import { useContext, useState } from "react";
import { Loader2 } from "lucide-react";

// Files
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useUpdateUserCredits from "./hooks/useUpdateUserCredits";
import { userDetailContext } from "@/contexts/userDetailContext";

const CREDITS = [
  {
    price: "0.99",
    credits: 5,
  },
  {
    price: "1.99",
    credits: 10,
  },
  {
    price: "3.99",
    credits: 25,
  },
  {
    price: "6.99",
    credits: 50,
  },
  {
    price: "9.99",
    credits: 100,
  },
];

const BuyCredits = () => {
  const [selected, setSelected] = useState<null | (typeof CREDITS)[0]>(null);
  const { loading, updateCreditsInDB } = useUpdateUserCredits({
    redirect: true,
  });
  const { userDetail } = useContext(userDetailContext);

  return (
    <main>
      <h1 className="font-bold">Buy More Credits</h1>
      <h2 className="text-sm">
        Unlock endless possiblities - Buy more credits and transform your room
        with AI magic!
      </h2>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {CREDITS.map((data) => {
          return (
            <div
              key={data.credits}
              className={cn(
                "p-4 shadow-xl border-2 border-zinc-100 h-36 aspect-auto items-center flex flex-col justify-between rounded-lg",
                selected?.credits === data.credits && "border-purple-200"
              )}
            >
              <h1 className="text-2xl font-bold">{data.credits}</h1>
              <h2 className="text-sm font-medium">Credits</h2>

              <Button onClick={() => setSelected(data)} className="w-full h-7">
                Select
              </Button>

              <h1 className="text-sm text-purple-500">${data.price}</h1>
            </div>
          );
        })}
      </div>

      <div className="my-20">
        {selected && (
          <Button
            disabled={loading}
            onClick={() =>
              updateCreditsInDB(userDetail.credits + selected.credits)
            }
          >
            {loading ? (
              <Loader2 className="size-10 animate-spin text-white" />
            ) : (
              "Pay now"
            )}
          </Button>
        )}
        {/* {selected && (
          <PayPalButtons
            style={{ layout: "vertical" }}
            onApprove={async () => {
              onPaymentSuccess();
            }}
            onCancel={() => {
              setSelected(null);
              alert("Transaction cancelled");
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      value: selected.price,
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        )} */}
      </div>
    </main>
  );
};

export default BuyCredits;
