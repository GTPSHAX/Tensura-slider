import Image from "next/image";
import logo from "../../public/images/logo_tensura.png";

export default function LogoTensura(width: number = 60, height: number = 60, quality: number = 70, showText: boolean = true) {
  return (
    <div className="w-fit">
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-sky-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <Image
                  src={logo}
                  alt="Tensura Logo"
                  width={width}
                  height={height}
                  quality={quality}
                  className="relative z-10"
              />
            </div>
            {showText &&
                (
                    <div className="text-center md:text-left">
                        <p
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-sky-800 to-sky-900 bg-clip-text hover:from-sky-600 hover:to-sky-800 transition-all duration-300"
                            style={{
                                WebkitTextStroke: '1px white',
                            }}
                        >
                            Tensura: Slider
                        </p>
                        <p
                            className="text-center text-[10px] lg:text-sm text-sky-950 -mt-1 bg-gray-100 rounded-sm px-2 py-1 hover:bg-sky-100 transition-colors duration-300"
                        >
                             Sebuah game visual novel berbasis web
                        </p>
                    </div>
                )
            }
        </div>
    </div>
  );
}