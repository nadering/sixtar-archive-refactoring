import { VoteProp } from "@apis";
import Vote from "./vote";

// 우측 상단 느낌표 아이콘 클릭 시 나오는 모달로, 서열표 투표 관련 기능을 담당하는 컴포넌트
export default function VoteModal({ data }: { data: VoteProp[] }) {
  return (
    <div className="absolute top-16 right-0 z-50 mx-2 my-2">
      <div className="flex flex-col items-stretch bg-white border-2 border-solar rounded-xl px-3 py-2">
        {data.length != 0 &&
          data.map((vote) => {
            return <Vote key={vote.id} data={vote} />;
          })}
      </div>
    </div>
  );
}
