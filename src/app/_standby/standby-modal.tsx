import DataSetting from "./data-setting";
import OptionSetting from "./option-setting";

// 우측 상단 별 아이콘 클릭 시 나오는 모달로, 서열표 관련 기능을 담당하는 컴포넌트
export default function StandbyModal() {
  return (
    <div className="absolute top-16 right-0 flex flex-col z-50 mx-2 my-3 gap-y-3">
      <DataSetting />
      <OptionSetting />
    </div>
  )
}