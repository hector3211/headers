import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { shoppingCart } from "@/stores/cart-store";
import { useStore } from "@nanostores/react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface FormSchema {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: number;
  shippingMehod: { type: string; cost: number } | null;
  total: number | null;
  paymentOptions: "credit-card" | "paypal";
}

export default function CheckoutPage() {
  const $cartItems = useStore(shoppingCart);
  const [shippingCost, setShippingCost] = useState(10);
  const [subTotal, setSubTotal] = useState(() => {
    let total = 0;
    for (const item of $cartItems) {
      total += item.price;
    }
    return total;
  });
  const [tax, setTax] = useState(() => {
    return subTotal * 0.07;
  });
  const [formState, setFormState] = useState<FormSchema>(() => {
    return {
      total: subTotal + tax + shippingCost,
      shippingMehod: { type: "standard", cost: 10 },
    } as FormSchema;
  });

  const handleShippingChange = (value: string): void => {
    const cost = value === "express" ? 20 : 10;
    setShippingCost(cost);
    setFormState({
      ...formState,
      shippingMehod: { type: value, cost },
      total: subTotal + cost,
    });
  };

  const handlePaymentOption = (value: "credit-card" | "paypal") => {
    setFormState({ ...formState, paymentOptions: value });
  };

  const placeOrder = (): void => {
    // validateForm()
    toast.success("Checked out Successfully!");
    // console.log(`${JSON.stringify(formState, null, 2)}\n`);
    // console.log(`cost: ${formState.total}`);
  };

  return (
    <div className=" container mx-auto p-4 py-40 min-h-[calc(100vh-0rem)]">
      <a href="/cart">
        <Button variant={"link"} className="mb-3">
          <ArrowLeft />
          Back To Cart
        </Button>
      </a>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {$cartItems.map((item) => {
              const imageUrl =
                typeof item.src === "string" ? item.src : item.src.src;
              return (
                <div className="container flex items-center m-1 space-x-4">
                  <div className="bg-gray-100 p-2 rounded-md max-w-[10rem]">
                    <img
                      src={imageUrl}
                      alt={`${item.name} image`}
                      className="rounded-md w-full"
                    />
                  </div>
                  <div className="container">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.quantity}</p>
                  </div>
                  <div className="container flex justify-end font-semibold">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </CardContent>
          <Separator className="my-4" />
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-end">
                <span>${(subTotal + tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(subTotal + tax + shippingCost).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            placeOrder();
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter your shipping details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    required
                    type="text"
                    id="firstName"
                    placeholder="John"
                    minLength={2}
                    maxLength={150}
                    onChange={(e) =>
                      setFormState({ ...formState, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    required
                    id="lastName"
                    placeholder="Doe"
                    minLength={2}
                    maxLength={150}
                    onChange={(e) =>
                      setFormState({ ...formState, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  required
                  type="text"
                  id="address"
                  placeholder="123 Main St"
                  minLength={10}
                  maxLength={350}
                  onChange={(e) =>
                    setFormState({ ...formState, address: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    required
                    type="text"
                    id="city"
                    placeholder="New York"
                    minLength={5}
                    maxLength={150}
                    onChange={(e) =>
                      setFormState({ ...formState, city: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    required
                    id="zipCode"
                    type="number"
                    placeholder="10001"
                    minLength={5}
                    maxLength={5}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        zipCode: e.target.valueAsNumber,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Shipping Method</Label>
                <RadioGroup
                  defaultValue="standard"
                  onValueChange={handleShippingChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard Shipping ($10)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express Shipping ($20)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <Separator className="my-4" />
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Select your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup onValueChange={handlePaymentOption}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>
              {formState.paymentOptions === "credit-card" && (
                <div className="">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Credit Card Number</Label>
                    <Input
                      required
                      type="text"
                      id="card-number"
                      pattern="\d{16}"
                      maxLength={16}
                    />
                  </div>
                  <div className="flex items-center gap-x-6 py-2">
                    <div className="container">
                      <Label htmlFor="card-expiration">Expiration</Label>
                      <Input
                        required
                        type="text"
                        placeholder="04/29"
                        id="card-expiration"
                        pattern="(0[1-9]|1[0-2])\/\d{2}"
                        maxLength={5}
                      />
                    </div>
                    <div className="container">
                      <Label htmlFor="card-security-code">CVV</Label>
                      <Input
                        required
                        type="text"
                        id="card-security-code"
                        pattern="\d{3,4}"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-billing-code">Billing Zip Code</Label>
                    <Input
                      required
                      type="text"
                      id="card-billing-code"
                      defaultValue={formState.zipCode}
                      minLength={5}
                      maxLength={5}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
