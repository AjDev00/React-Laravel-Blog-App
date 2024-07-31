import Icons from "./Icons";
import Title from "./Title";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row justify-between px-3 items-center pt-3">
        <div>
          <Title />
        </div>
        <div>
          <Icons />
        </div>
      </div>
    </div>
  );
}
