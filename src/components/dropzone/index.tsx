import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import ImageWorker from "./ImageWorker"
import encode from "@/utils/blurhash/encode"
import IMap from "@/models/IMap"

const ACCEPTED_FILE_TYPES: { [key: string]: boolean } = {
  "image/png": true,
  "image/jpeg": true,
  "image/jpg": true,
  "image/webp": true
}

export default function FileDropzone() {
  const [imgs, setImgs] = useState<IMap[]>([])
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback(async (accepted: File[]) => {
    setLoading(true)
    for (let file of accepted) {
      if (!ACCEPTED_FILE_TYPES[file.type]) {
        toast.error(`${file.type.split("/")[1]} is not an accepted filetype.`)
        // reject image
        continue
      }
      const imap = new IMap(file)
      // imap.getBlurHash()
      // // const encodedBH = IMap.encodeBlurHashToHex(imap.blurhash!)
      // imap.convertToWEBP(`${imap.file.name.split(".")[0]}&bh=${"replace_with_encoded_blurhash"}`)
      // await imap.compress()
      setImgs((prev) => [...prev, imap])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div className="w-full h-full pt-4">
      <div className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm border-slate-500 text-slate-500 cursor-pointer" {...getRootProps()}>
        <input
          accept="image/*"
          {...getInputProps()}
        />
        {isDragActive ?
          <p>Drop the images here...</p> :
          <p>Drag 'n' drop some images here!</p>
        }

      </div>
      <div className="w-full flex flex-wrap">
        {imgs.map((i: IMap, idx: number) => <ImageWorker key={idx} data={i} />)}
      </div>
    </div>
  )
}
