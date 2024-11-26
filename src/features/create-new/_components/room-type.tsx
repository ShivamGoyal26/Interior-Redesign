import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  { title: "Living Room", value: "Living Room" },
  { title: "Bedroom", value: "Bedroom" },
  { title: "Kitchen", value: "Kitchen" },
  { title: "Office", value: "Office" },
  { title: "Bathroom", value: "Bathroom" },
];

type RoomTypeProps = {
  value: string;
  onRoomTypeChange: (value: string) => void;
  error?: string;
};

const RoomType = ({ value, onRoomTypeChange, error }: RoomTypeProps) => {
  return (
    <div>
      <label className="text-slate-500 mb-2 text-sm font-normal">
        Select Room Type <span className="text-destructive font-bold"> *</span>
      </label>
      <Select onValueChange={onRoomTypeChange} defaultValue={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
    </div>
  );
};

export default RoomType;
