// 체크박스 프로퍼티
interface checkboxProps {
  id: string;
  text: string;
  defaultChecked: boolean;
  onChange: () => void;
}

// 옵션에 사용되는 체크박스
export default function OptionCheckbox({
  id,
  text,
  defaultChecked,
  onChange,
}: checkboxProps) {
  return (
    <div className="inline-flex items-center group" onChange={onChange}>
      <label
        className="relative flex items-center p-1 cursor-pointer"
        htmlFor={id}
      >
        <input
          type="checkbox"
          className="before:content[''] peer relative h-[22px] w-[22px] cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-solar-400 checked:bg-solar-400 group-hover:border-solar-300 group-hover:bg-solar-300"
          id={id}
          defaultChecked={defaultChecked}
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[18px] w-[18px]"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label
        className="text-lunar-900 text-xl font-medium cursor-pointer px-1 select-none"
        htmlFor={id}
      >
        {text}
      </label>
      <label className="grow h-full cursor-pointer" htmlFor={id}></label>
    </div>
  );
}
