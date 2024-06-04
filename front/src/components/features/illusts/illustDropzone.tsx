import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FaImage } from "rocketicons/fa";

export default function IllustDropzone({
  pushIllust,
  MAX_COUNT,
  formProps,
}: {
  pushIllust: (src: string) => void;
  MAX_COUNT: number;
  formProps: any;
}) {
  const MEGA_BITE = 1024 ** 2;
  const MAX_SIZE = 10 * MEGA_BITE;
  const handleDrop = (files: File[]) => {
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          pushIllust(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dropzone
      name="postIllust"
      multiple
      onDrop={(files) => handleDrop(files)}
      maxSize={MAX_SIZE}
      maxFiles={MAX_COUNT}
      accept={IMAGE_MIME_TYPE}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: "4px",
        height: "110px",
        border: "2px dashed rgb(148 163 184)",
      }}
      {...formProps}
    >
      <Dropzone.Idle>
        <FaImage className="icon-black opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
      </Dropzone.Idle>
    </Dropzone>
  );
}
