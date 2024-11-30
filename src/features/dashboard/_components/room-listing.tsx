import { UserRoom } from "@/features/create-new/services/create-new.service";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

type RoomLisitingProps = {
  data: UserRoom[];
};

const RoomLisiting = ({ data }: RoomLisitingProps) => {
  return (
    <div className="mb-10">
      <h1 className="font-medium text-purple-500 self-start mb-10">
        AI Room Studio
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((room) => (
          <div key={room.id}>
            <ReactBeforeSliderComponent
              currentPercentPosition={95}
              firstImage={{
                imageUrl: room.originalImage,
              }}
              secondImage={{
                imageUrl: room.aiGeneratedImage,
              }}
            />
            <div className="py-4">
              <h1 className="text-sm">🏡 Room Type: {room.roomType}</h1>
              <h1 className="text-sm">🎨 Design Type: {room.designType}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomLisiting;
