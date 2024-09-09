import { useEffect, useRef } from "react";

export function useImage() {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const image = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    canvas.current = document.getElementById("canvas") as HTMLCanvasElement
  }, [])

  function create(src = "") {
    const source = src === "" ? image.current?.src : src
    const newImage = new Image()
    if (!source || !canvas || !image) return
    newImage.src = source
    newImage.onload = () => {
      image.current = newImage
      if (!canvas.current) return
      canvas.current.width = newImage.width
      canvas.current.height = newImage.height
      context.current = canvas.current.getContext('2d', { alpha: false, willReadFrequently: true })
      context.current?.drawImage(newImage, 0, 0)
    }
  }

  return {
    create
  }
}
