// import LogoTensura from "@/components/LogoTensura";
import bg from "../../public/images/background/homescreen.webp";
import PixelatedCursor from "@/components/PixelatedCursor";

export default function homescreen() {
  return(
    <div
      className="animated-background font-[family-name:var(--font-pixelify-sans)] h-[100dvh] bg-cover bg-center min-h-[100dvh] text-white p-8 sm:p-20 cursor-none flex items-center justify-center flex-col"
      // Mengoper URL gambar latar belakang ke pseudo-element ::before
      style={{ '--bg-image': `url(${bg.src})` } as React.CSSProperties}
    >
      {/* {LogoTensura()} */}
      <PixelatedCursor />
    </div>
  )
}