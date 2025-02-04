import Image from "next/image";

export default function CallToAction() {
  const checks = [
    "Calendar Booking & Scheduling",
    " Digital Products",
    " Membership Subscriptions",
    "1-tap Checkout Direct from your Link-in-Bio",
    " Email list builder",
  ];

  return (
    <div>
      <h1 className="py-5 text-2xl font-bold">
        Save $100s with Stan as your All-In-One Store
      </h1>
      <hr />
      <div>
        <ul className="flex flex-col gap-2 py-4">
          {checks.map((check) => (
            <li key={check} className="flex items-center gap-2">
              <Image src={"/check.svg"} alt="" width={15} height={15} /> {check}
            </li>
          ))}
        </ul>
      </div>
      <hr />
    </div>
  );
}
