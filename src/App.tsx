import './App.css'
import ColorCalculator from './components/colors'
import FileDropzone from './components/dropzone'
import Nav from './components/nav'
import { Toaster } from './components/ui/sonner'


function App() {

  return (
    <main className='bg-slate-800 w-screen h-screen overflow-hidden flex justify-center text-slate-50 dark'>
      <section className='max-w-screen-lg w-full'>
        <Nav />
        <div>
          <p className='pt-10 text-slate-400 bg-slate-800 max-w-[70ch]'>The <em>Color Calculator</em> allows you to input a brand color and recieve that brand's accessible colors against dark and light backgrounds.</p>
        </div>
        <ColorCalculator />
        <div>
          <p className='pt-10 text-slate-400 bg-slate-800 max-w-[70ch]'>Drag and drop your images here to <span className='text-slate-100'>convert them to webp</span> format, <span className='text-slate-100'>resize to your desired file size</span> (use the slider to choose between KB and MB), and automatically <span className='text-slate-100'>generate a BlurHash</span> for each image, which will be embedded in the filename.</p>
        </div>
        <FileDropzone />
        <Toaster />
      </section>
    </main>
  )
}

export default App
