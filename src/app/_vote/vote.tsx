import { VoteProp } from "@apis";

// 서열표 투표 컴포넌트
export default function Vote({ data }: { data: VoteProp }) {
  return (
    <div className="flex flex-col w-60 gap-y-1 py-4 border-b border-gray-800 first:pt-0 last:pb-0 last:border-0">
      <div className="flex flex-col">
        <span className="text-black text-xl font-semibold leading-tight">{data.title}</span>
        <span className="text-gray-700 mt-[-4px]">~ {data.deadline}</span>
      </div>
      {data.context ? (
        <span className="leading-snug">{data.context}</span>
      ) : (
        <></>
      )}
      <div className="flex flex-row items-start gap-x-2">
        <a
          className="text-lunar hover:font-semibold"
          href={data.lunarLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          [LUNAR]
        </a>
        <span>|</span>
        <a
          className="text-solar hover:font-semibold"
          href={data.solarLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          [SOLAR]
        </a>
      </div>
    </div>
  );
}
