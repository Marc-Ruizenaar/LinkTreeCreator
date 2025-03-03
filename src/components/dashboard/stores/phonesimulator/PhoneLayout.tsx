interface PhoneLayoutProps {
  children: React.ReactNode;
  position?: string;
}

export default function PhoneLayout({ children, position }: PhoneLayoutProps) {
  const positionContent = position === "center" ? "justify-center" : "";

  return (
    <div
      className={`no-scrollbar mb-16 flex h-[600px] w-full flex-col items-center overflow-hidden overflow-y-auto rounded-2xl border-4 border-black p-4 py-8 text-center md:mb-0 md:w-[450px] ${positionContent}`}
    >
      {children}
    </div>
  );
}
