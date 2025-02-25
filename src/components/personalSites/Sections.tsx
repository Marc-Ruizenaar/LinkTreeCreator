"use client";
import getSectionsPublic from "@/api/supabase/get/getSectionsPublic";
import { Store } from "@/types/profile";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface Section {
  id: string;
  title: string;
  subTitle?: string;
  imageSrc?: string;
  buttonStyle: number;
  href?: string;
  buttonText?: string;
}

interface SectionsProps {
  userData: Store;
}

function SectionItemDiv({ section }: { section: Section }) {
  return (
    <div className="shadow-section w-full rounded-xl bg-white p-4">
      <div className="flex items-center gap-4 text-left">
        <Image
          className="h-14 w-14 rounded-xl object-cover"
          src={section.imageSrc || "/placeholder.jpg"}
          alt={section.title}
          width={50}
          height={50}
        />
        <div>
          <h3 className="font-bold">{section.title}</h3>
          {section.buttonStyle === 1 && (
            <p className="text-sm">{section.subTitle}</p>
          )}
        </div>
      </div>
      {section.buttonStyle === 1 && (
        <Link
          href={section.href || "./"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white text-center"
        >
          {section.buttonText}
        </Link>
      )}
    </div>
  );
}

function SectionItemLink({ section }: { section: Section }) {
  return (
    <Link
      href={section.href || ""}
      target="_blank"
      rel="noopener noreferrer"
      className="shadow-section w-full rounded-xl bg-white p-4"
    >
      <div className="flex items-center gap-4 text-left">
        <Image
          className="h-14 w-14 rounded-xl object-cover"
          src={section.imageSrc || "/placeholder.jpg"}
          alt={section.title}
          width={50}
          height={50}
        />
        <div>
          <h3 className="font-bold">{section.title}</h3>
          {section.buttonStyle === 1 && (
            <p className="text-sm">{section.subTitle}</p>
          )}
        </div>
      </div>
      {section.buttonStyle === 1 && (
        <Link
          href={section.href || "./"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white text-center"
        >
          {section.buttonText}
        </Link>
      )}
    </Link>
  );
}

export default function Sections({ userData }: SectionsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    async function fetchSections() {
      if (!userData.user_id) {
        setIsLoading(false);
        return;
      }

      try {
        const fetchedSections = await getSectionsPublic(userData.user_id);
        setSections(fetchedSections);
      } catch (error) {
        console.error("Error fetching sections:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }

    fetchSections();
  }, [userData.user_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full flex-col gap-5">
        {sections.map((section) =>
          section.buttonStyle === 2 ? (
            <SectionItemLink key={section.id} section={section} />
          ) : (
            <SectionItemDiv key={section.id} section={section} />
          ),
        )}
      </div>
    </div>
  );
}
