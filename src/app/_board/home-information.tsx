import Image from "next/image";
import InformationRami from "@public/information_rami.webp";

export default function HomeInformation() {
  return (
    <div className="flex flex-col grow justify-center items-center px-4 py-8">
      <div className="flex flex-col items-center px-2 gap-y-5">
        <Image
          className="rounded-xl select-none"
          src={InformationRami}
          alt="information-rami"
          width={400}
          priority
        />
        <div className="flex flex-col items-center gap-y-1">
          <p className="text-black text-4xl text-center font-bold">
            현재 선택된 난이도가 없습니다.
          </p>
          <div className="flex flex-col items-center text-black text-lg text-center font-normal">
            <p>
              <span className="text-solar-600">우측 상단 별 아이콘</span>에서
              모드와 난이도를 선택해주세요.
            </p>
            <p>
              최소/최대 난이도를 동시에 선택하면 여러 난이도를 동시에 볼 수
              있어요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
