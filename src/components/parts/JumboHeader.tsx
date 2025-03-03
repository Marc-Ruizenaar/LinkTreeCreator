import Image from "next/image";
import Link from "next/link";

export default function JumboHeader() {
  return (
    <section className="relative bg-BlueMain">
      <div className="container mx-auto flex flex-col justify-center gap-10  px-5 md:flex-row">
        <div className="flex w-full flex-col items-baseline gap-5 md:w-2/4 md:pt-20">
          <h1 className="text-3xl font-bold text-white md:text-[3rem] lg:text-[5rem] md:leading-none">
            Create your personal link-website
          </h1>
          <p className="text-TextGray md:text-xl">
            Social is the easiest way to create a website. All of your links,
            digital products, and bookings within your link-website.
          </p>
          <Link
            className="flex items-center justify-center gap-4 rounded-full bg-GreenMain px-8 py-3 text-xl font-bold text-DarkBlueMain transition-all hover:gap-8 hover:transition-all md:text-2xl"
            href={"/register"}
          >
            Sign Up Now{" "}
            <Image src={"/arrow.svg"} alt="" width={20} height={20} />
          </Link>
        </div>

        <div className="mb-4 flex w-full justify-start lg:justify-center md:w-2/4">
          <Image
            alt="Linktree layout"
            src={"/Example.png"}
            height={600}
            width={400}
          />
        </div>
      </div>
    </section>
  );
}
