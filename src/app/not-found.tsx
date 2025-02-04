import Header from "@/components/header/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 flex flex-col items-center justify-center gap-5 p-4 text-center">
        <h1 className="text-3xl font-bold">Store Not Found</h1>
        <p>The store you are looking for does not exist.</p>
        <Link
          href="/"
          className="block w-max rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
        >
          Return to Home
        </Link>
      </div>
    </>
  );
}
