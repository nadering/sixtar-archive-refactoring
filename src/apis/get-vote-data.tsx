import API_URL from ".";

// 투표 데이터 중 투표 하나의 속성 (백엔드에서 snake-case로 반환)
export interface VoteAPIProp {
  id: number;
  title: string;
  context: string | null;
  solar_link: string;
  lunar_link: string;
  deadline: string;
  created_time: string;
}

export interface VoteProp {
  id: number;
  title: string;
  context: string | null;
  solarLink: string;
  lunarLink: string;
  deadline: string;
  createdTime: string;
}

// 투표 데이터를 가져온 후, 활성화되어 있는 투표만 반환
export const getActiveVoteData = async () => {
  // 데이터를 API에서 가져옴
  let data: VoteProp[] = [];
  const json = await (await fetch(`${API_URL}/vote`)).json();

  if (json) {
    (json as VoteAPIProp[]).forEach((vote) => {
      // 마감일을 받아와 년/월/일 단위로 분리하고,
      const deadlineSplited = vote.deadline.split("-").map((str) => {
        return parseInt(str, 10);
      });

      // 날짜를 비교하여 진행 중인 투표만 필터링
      // 월은 1월이 0부터 시작하므로, Date 객체를 생성할 때 1을 빼야 함
      if (deadlineSplited.length == 3) {
        const currentDate = new Date();
        const deadlineDate = new Date(
          deadlineSplited[0],
          deadlineSplited[1] - 1,
          deadlineSplited[2],
          0,
          0,
          0,
          0
        );

        if (currentDate <= deadlineDate) {
          data.push({
            id: vote.id,
            title: vote.title,
            context: vote.context,
            solarLink: vote.solar_link,
            lunarLink: vote.lunar_link,
            deadline: vote.deadline,
            createdTime: vote.created_time,
          });
        }
      }
    });
  } else {
    return;
  }

  return data;
};
