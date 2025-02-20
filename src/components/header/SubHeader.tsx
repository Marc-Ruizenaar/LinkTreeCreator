export default function SubHeader({ text }: { text: string }) {
  return (
    <div className="bg-GreenMain relative px-5 z-10 w-full py-2 text-center">
      <p className="text-DarkBlueMain container mx-auto font-bold">{text}</p>
    </div>
  );
}
