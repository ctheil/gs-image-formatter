import encode from "@/utils/blurhash/encode"
import { Progress } from "../ui/progress"
import { useState } from "react"

type Props = {
  image: File
}

function getImageData(image: HTMLImageElement): ImageData | undefined {
  const canvas = document.createElement("canvas")
  canvas.width = image.width!
  canvas.height = image.height
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  ctx.drawImage(image, 0, 0)
  return ctx.getImageData(0, 0, image.width, image.height)
}
function GenerateBlurHash(image: HTMLImageElement): string | undefined {
  const data = getImageData(image)
  if (!data) return
  return encode(data.data, data.width, data.height, 4, 4)
}

type GeneratedImageData = {
  blurhash: string
}

// function DoImageWork(image: File, updateProgress: (value: number, text: string) => void) {
//   const image = new Image()
//   const numSteps = 3
//   // Generate blurhash
//   updateProgress(1 / numSteps, "Generating BlurHash")
//   const blurhash = GenerateBlurHash(image)
//
//
// }

export default function ImageWorker({ image }: Props) {
  const [progress, setProgress] = useState({ value: 0, text: "Uploading" })
  const [data, setData] = useState<GeneratedImageData>({ blurhash: "" })

  const src = URL.createObjectURL(image)

  return (
    <div className="max-w-[1000px] min-w-[300px] h-auto relative">
      <img src={src} />
      {progress.value > -1 && progress.value < 100 && <PreviewProgress progress={progress} />}
      <div className="absolute bottom-0 left-0 right-0 min-h-10 bg-gradient-to-t from-slate-900 to-slate-900/0 pt-20 flex flex-col p-4" >
        <PreviewProp title="Name" value={image.name.split(".")[0]} />
        <PreviewProp title="File-Type" value={image.name.split(".")[1]} />
        <PreviewProp title="Size" value={calcImageSize(image.size)} />

      </div>
    </div>
  )

}

type PreviewProps = {
  title: string,
  value: string,
  valueProps?: { [key: string]: any }
}

function PreviewProp({ title, value, valueProps }: PreviewProps) {
  return <div className="flex gap-2 overflow-hidden">
    <p className="text-md text-slate-400 font-bold">{title}:</p>
    <p className="text-md text-slate-100">{value}</p>
  </div>

}

/**
 * Returns the file size in KB (optimized for web)
  */
function calcImageSize(size: number): string {

  const kb = Math.ceil(size / 1000)
  if (kb < 1) {
    return "< 1kb"
  }

  return `${kb}kb`

}

/**
 * Progress should be percentage!
  */
function PreviewProgress(props: { progress: { value: number, text: string } }) {
  const { value, text } = props.progress
  if (value < 0 || value > 100) return

  return <div className="absolute bottom-0 left-0 right-0 top-0 bg-slate-900/50 flex flex-col items-center justify-center p-10">
    <Progress value={value} />
    <p className="pt-4 text-lg text-slate-100">{text}...</p>

  </div>

}
