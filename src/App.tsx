import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { decodeBlurHash } from './utils/decode-blurhash'
import { useImage } from './hooks/useImage'


function App() {

  function do_blurhash() {
    const imgs = document.querySelectorAll(".card-img")
    for (let img of imgs) {
      if (!img?.dataset?.blurhash) {
        continue
      }
      const d = decodeBlurHash(img.dataset.blurhash, img.of, img.clientHeight, 0)
    }
  }

  return (
    <>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          // @ts-ignore
          const hashValue = e.target[0].value as string
          const d = decodeBlurHash(hashValue, 10, 20, 0)
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          if (!ctx) return
          const imageData = ctx.createImageData(10, 20)
          imageData.data.set(d)
          ctx?.putImageData(imageData, 0, 0)
          document.body.append(canvas)

        }}>
          <input type="text" name="hash" />
          <button type="submit">Show Image</button>
        </form>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <img className="card-img" data-blurhash="L6G*f_VB={4.Q:0M5Sx^00~B?axv" src="https://cdn.prod.website-files.com/65c16ed56964fde6f58703a4/66df199c65511e0b1131f4d2_hayes_story-img.webp" />
    </>
  )
}

export default App
