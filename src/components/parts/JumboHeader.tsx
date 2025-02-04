import Image from "next/image";
import Link from "next/link";

export default function JumboHeader() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto flex justify-center gap-10 px-5">
        <div className="flex w-2/4 flex-col items-baseline gap-5">
          <h1 className="text-[5rem] font-bold leading-none text-white">
            Meet Your All·in·One Creator Store
          </h1>
          <p className="text-TextGray text-xl">
            Stan is the easiest way to make money online. All of your courses,
            digital products, and bookings are now hosted within your
            link-in-bio.
          </p>
          <Link
            className="bg-GreenMain text-DarkBlueMain flex items-center justify-center gap-4 rounded-full px-8 py-3 text-2xl font-bold transition-all hover:gap-8 hover:transition-all"
            href={"/register"}
          >
            Sign Up Now{" "}
            <Image src={"/arrow.svg"} alt="" width={20} height={20} />
          </Link>
        </div>
        <Image
          className="w-2/4"
          alt=""
          src={"/stan_hero-1.png"}
          height={600}
          width={400}
        />
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
