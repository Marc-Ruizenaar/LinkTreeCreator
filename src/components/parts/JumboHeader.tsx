import Image from "next/image";
import Link from "next/link";

export default function JumboHeader() {
  return (
    <section className="relative">
      <div className="container mx-auto flex justify-center gap-10 px-5">
        <div className="flex w-2/4 flex-col items-baseline gap-5 pt-20">
          <h1 className="text-[5rem] font-bold leading-none text-white">
            Create your personal link-website
          </h1>
          <p className="text-xl text-TextGray">
            Social is the easiest way to create a website. All of your links,
            digital products, and bookings withing your link-website.
          </p>
          <Link
            className="flex items-center justify-center gap-4 rounded-full bg-GreenMain px-8 py-3 text-2xl font-bold text-DarkBlueMain transition-all hover:gap-8 hover:transition-all"
            href={"/register"}
          >
            Sign Up Now{" "}
            <Image src={"/arrow.svg"} alt="" width={20} height={20} />
          </Link>
        </div>

        <div className="w-2/4 flex justify-center">
          <Image
            alt="Linktree layout"
            src={"/Example.png"}
            height={600}
            width={400}
          />
        </div>
      </div>

      <Image
        className="absolute inset-0 -z-10 w-full"
        alt=""
        src={"bg.svg"}
        height={600}
        width={400}
      />
    </section>
  );
}
