import { Button } from "@mantine/core";
import { MdShare } from "rocketicons/md";

export default function ShareButton() {
  const handleShare = () => {
    // TODO : シェアの処理
  };

  return (
    <Button onClick={handleShare} variant="transparent" className="p-0">
      <MdShare className="icon-blue-500 p-0" />
    </Button>
  );
}
