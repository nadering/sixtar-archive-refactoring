import { getSingleBoardData } from "@apis";
import { Board } from "@board";

// 단일 난이도의 서열표 페이지
export default async function SingleBoardPage({
  params
}: {
  params: Promise<{
    mode: string;
    firstDifficulty: string;
  }>
}) {
  // Dynamic Routing 데이터
  const mode = (await params).mode;
  const firstDifficulty = parseInt((await params).firstDifficulty, 10);

  // API를 사용하여 데이터를 가져옴
  const data = await getSingleBoardData(mode, firstDifficulty);

  return (
    <>
      <Board mode={mode} firstDifficulty={firstDifficulty} data={data} />
    </>
  );
}
