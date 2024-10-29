import { getMultipleBoardData } from "@apis";
import { Board } from "@board";

// 여러 난이도의 서열표 페이지
export default async function MultipleBoardPage({
  params,
}: {
  params: Promise<{
    mode: string;
    firstDifficulty: string;
    secondDifficulty: string;
  }>;
}) {
  // Dynamic Routing 데이터
  const mode = (await params).mode;
  const firstDifficulty = parseInt((await params).firstDifficulty, 10);
  const secondDifficulty = parseInt((await params).secondDifficulty, 10);

  // API를 사용하여 데이터를 가져옴
  const data = await getMultipleBoardData(
    mode,
    firstDifficulty,
    secondDifficulty
  );

  return (
    <>
      <Board
        mode={mode}
        firstDifficulty={firstDifficulty}
        secondDifficulty={secondDifficulty}
        data={data}
      />
    </>
  );
}
