import Icons from "./Icons";
import InputSearch from "./InputSearch";
import Title from "./Title";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row justify-between px-3 items-center pt-3 md:px-20 md:pt-1">
        <div className="md:mt-1">
          <Title />
        </div>
        <div className="hidden md:flex -mt-2">
          <InputSearch />
        </div>
        <div>
          <Icons />
        </div>
      </div>
    </div>
  );
}
