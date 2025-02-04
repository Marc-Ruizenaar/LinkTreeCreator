import Image from "next/image";

export default function Payment() {
  return (
    <>
      <div className="mt-5 rounded-xl border-2 border-gray-300 p-5">
        <label>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <input type="radio" name="paymentOption" />
              <p className="text-xl font-bold">Annual</p>
            </div>

            <div className="text-end">
              <p className="line-through">$360/yr</p>
              <p className="text-xl font-bold">$300/yr</p>
            </div>
          </div>
        </label>
      </div>

      <div className="mt-5 rounded-xl border-2 border-gray-300 p-5">
        <label>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <input type="radio" name="paymentOption" />
              <p className="text-xl font-bold">Monthly</p>
            </div>

            <p className="text-xl font-bold">$29/mo</p>
          </div>
        </label>
      </div>

      <div className="mt-5">
        <h2 className="mb-2 font-semibold">Credit Card Payment</h2>
        <div className="rounded-xl border-2 border-gray-300">
          <input
            className="w-full border-b-2 bg-transparent p-3"
            type="text"
            placeholder="1234 1234 1234 1234"
          />
          <input
            className="w-1/2 border-r-2 bg-transparent p-3"
            type="text"
            placeholder="MM/JJ"
          />
          <input
            className="w-1/2 bg-transparent p-3"
            type="number"
            placeholder="CVC"
          />
        </div>
        <p className="flex items-center mt-2 gap-1">
          Secure Payment Powered by
          <Image src={"/stripe.svg"} alt="Stripe" width={40} height={30} />
        </p>
      </div>
    </>
  );
}
