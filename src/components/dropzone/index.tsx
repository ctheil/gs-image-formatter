import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import ImageWorker from "./ImageWorker"
import encode from "@/utils/blurhash/encode"

const ACCEPTED_FILE_TYPES: { [key: string]: boolean } = {
  "image/png": true,
  "image/jpeg": true,
  "image/jpg": true,
  "image/webp": true
}

export default function FileDropzone() {
  const [imgs, setImgs] = useState<File[]>([])

  const onDrop = useCallback((accepted: File[]) => {
    for (let file of accepted) {
      if (!ACCEPTED_FILE_TYPES[file.type]) {
        toast.error(`${file.type.split("/")[1]} is not an accepted filetype.`)
        // reject image
        continue
      }
      // setImgs((prev) => [...prev, { file: file, progress: { value: 33, text: "Generating Blurhash" } }])
      setImgs((prev) => [...prev, file])
    }

  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div className="w-full h-full pt-4">
      <div className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm border-slate-500 text-slate-500 cursor-pointer" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ?
          <p>Drop the images here...</p> :
          <p>Drag 'n' drop some images here!</p>
        }

      </div>
      <div className="w-full flex ">
        {imgs.map((i: File, idx: number) => <ImageWorker key={idx} image={i} />)}
      </div>
    </div>
  )
}
