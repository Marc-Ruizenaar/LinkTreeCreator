"use client";
import CreateAccount from "@/components/register/CreateAccount";
// import ConnectStripe from "@/utils/stripe/createCustomers";

export default function Register() {
  // const handleStripeConnect = async () => {
  //   try {
  //     const result = await ConnectStripe({
  //       name: "Marc",
  //       email: "test@marcruizenaar.com",
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="container-sm mx-auto flex h-screen w-full items-center justify-center px-5">
      {/* <button onClick={handleStripeConnect}>Test Stripe Connect</button> */}
      <CreateAccount />
    </div>
  );
}
