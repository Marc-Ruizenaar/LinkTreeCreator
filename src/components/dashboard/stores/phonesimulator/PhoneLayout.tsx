interface PhoneLayoutProps {
  children: React.ReactNode;
  position?: string;
}

export default function PhoneLayout({ children, position }: PhoneLayoutProps) {
  const positionContent = position === "center" ? "justify-center" : "";

  return (
    <div
      className={`no-scrollbar flex aspect-[1/2] h-[600px] w-[450px] flex-col items-center overflow-hidden overflow-y-auto rounded-2xl border-4 border-black p-4 py-8 text-center ${positionContent}`}
    >
      {children}
    </div>
  );
}