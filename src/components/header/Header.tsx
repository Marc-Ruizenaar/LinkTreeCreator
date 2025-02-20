import MainHeader from "./MainHeader";
import SubHeader from "./SubHeader";

export default function Header() {
  return (
    <header>
      <SubHeader
        text="It's completely free forever! 🎉"
      />
      <MainHeader />
    </header>
  );
}
