"use client";
import SectionPictureBucket from "@/api/supabase/post/sectionPictureBucket";
import sectionPictureDatabase from "@/api/supabase/post/sectionPictureDatabase";
import sectionUpdate from "@/api/supabase/post/sectionUpdate";
import PhoneLayout from "@/components/dashboard/stores/phonesimulator/PhoneLayout";
import SectionPhone from "@/components/dashboard/stores/section-id/SectionPhone";
import { useStoreSections } from "@/context/StoreSectionsProviderContext";
import { Sections } from "@/types/profile";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { use } from "react";
import { MdEdit } from "react-icons/md";

interface SectionPageProps {
  params: Promise<{ id: string }>;
}

export default function SectionPage({ params }: SectionPageProps) {
  const unwrappedParams = use(params);
  const numericSectionId = parseInt(unwrappedParams.id, 10);
  const stringSectionId = String(numericSectionId);

  const { sections, setSections } = useStoreSections();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentSection, setCurrentSection] = useState<Sections | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [style, setStyle] = useState(1);
  const [href, setHref] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (sections) {
      const foundSection = sections.find(
        (section) => String(section.id) === stringSectionId,
      );
      setCurrentSection(foundSection || null);
    }
  }, [sections, stringSectionId]);

  useEffect(() => {
    if (currentSection) {
      setStyle(currentSection.buttonStyle || 1);
      setHref(currentSection.href || "");
      setTitle(currentSection.title || "");
      setSubTitle(currentSection.subTitle || "");
      setButtonText(currentSection.buttonText || "");
      setImage(currentSection.imageSrc || "");
    }
  }, [currentSection]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      const newImageUrl = await SectionPictureBucket(file, "section-pic");

      if (typeof newImageUrl === "object" && "fullPath" in newImageUrl) {
        const fullUrl =
          "https://metqjkrlpcpouafgrdsr.supabase.co/storage/v1/object/public/" +
          newImageUrl.fullPath;
        setImage(fullUrl);

        if (currentSection) {
          const currentID = currentSection.id != null ? currentSection.id : "";
          await sectionPictureDatabase(fullUrl, currentID);
        }
      }
    } catch (err) {
      setError("Failed to upload image.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);

    if (!currentSection) return;

    const updatedSection: Sections = {
      ...currentSection,
      buttonStyle: style,
      href: href,
      title: title,
      subTitle: subTitle,
      buttonText: buttonText,
      imageSrc: image,
    };

    setSections((prevSections) =>
      prevSections.map((section) =>
        String(section.id) === stringSectionId ? updatedSection : section,
      ),
    );

    try {
      await sectionUpdate(updatedSection, stringSectionId);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Error updating section:", error);
      setError("Failed to save section.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentSection) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex gap-4 p-10">
      <form className="w-5/6" onSubmit={handleSubmit}>
        {/* Style Selection */}
        <div>
          <div className="flex flex-row items-center gap-4">
            <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-200 p-1">
              <p className="text-[0.8rem]">1</p>
            </span>
            <h2 className="font-bold">Pick a style</h2>
          </div>
          <div className="mt-4 flex gap-4">
            <label
              className={`flex cursor-pointer items-center gap-2 rounded-lg border p-4 transition-all ${
                style === 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="buttonStyle"
                value="1"
                checked={style === 1}
                onChange={() => setStyle(1)}
                className="hidden"
              />
              <span>Button</span>
            </label>

            <label
              className={`flex cursor-pointer items-center gap-2 rounded-lg border p-4 transition-all ${
                style === 2 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="buttonStyle"
                value="2"
                checked={style === 2}
                onChange={() => setStyle(2)}
                className="hidden"
              />
              <span>Callout</span>
            </label>
          </div>
        </div>

        {/* URL Input */}
        <div>
          <div className="mt-10 flex flex-row items-center gap-4">
            <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-200 p-1">
              <p className="text-[0.8rem]">2</p>
            </span>
            <h2 className="font-bold">Paste URL*</h2>
          </div>
          <div className="mt-4 flex gap-4">
            <input
              className="input-field"
              type="url"
              name="href"
              value={href}
              onChange={(e) => setHref(e.target.value)}
              placeholder="http://your-link.com"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <div className="mt-10 flex flex-row items-center gap-4">
            <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-200 p-1">
              <p className="mb-[2px] text-[0.8rem]">3</p>
            </span>
            <h2 className="font-bold">Select image</h2>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <div className="relative w-max">
              {error && (
                <div className="absolute -top-8 left-0 right-0 text-sm text-red-500">
                  {error}
                </div>
              )}

              <div className={`relative ${isUploading ? "opacity-50" : ""}`}>
                <Image
                  className="aspect-square rounded-full object-cover"
                  src={image || "/placeholder.jpg"}
                  alt="Section Image"
                  width={100}
                  height={100}
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleImageClick}
                disabled={isUploading}
                className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-1 disabled:bg-blue-300"
              >
                <MdEdit fill="white" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Text Inputs */}
        <div>
          <div className="mt-10 flex flex-row items-center gap-4">
            <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-200 p-1">
              <p className="mb-[2px] text-[0.8rem]">4</p>
            </span>
            <h2 className="font-bold">Add text</h2>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <label className="text-sm" htmlFor="title">
              <div className="flex justify-between">
                Title
                <span className="text-gray-400">{title.length}/18</span>
              </div>

              <input
                className="input-field mt-1"
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Input Heading Here"
                maxLength={18}
              />
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <label className="text-sm" htmlFor="subTitle">
              <div className="flex justify-between">
                Subtitle
                <span className="text-gray-400">{subTitle.length}/65</span>
              </div>
              <input
                className="input-field mt-1"
                type="text"
                name="subTitle"
                id="subTitle"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="Input Heading Here"
                maxLength={65}
              />
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <label className="text-sm" htmlFor="buttonText">
              Button
              <input
                className="input-field mt-1"
                type="text"
                name="buttonText"
                id="buttonText"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Input Heading Here"
                maxLength={26}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className={`mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>

        {isSaved && <p className="mt-2 text-sm text-green-500">Saved...</p>}
      </form>

      <PhoneLayout position="center">
        <SectionPhone
          href={href}
          title={title}
          subTitle={subTitle}
          buttonText={buttonText}
          imageSrc={image}
          buttonStyle={style}
        />
      </PhoneLayout>
    </div>
  );
}
