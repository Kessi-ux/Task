import { Carousel } from "flowbite-react";
import { BiArrowToLeft } from "react-icons/bi";
import { BiArrowToRight } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";

export const Hero = () => {
  return (
    <>
    <div className="bg-gradient-to-b from-[#70CC6170] to-[#70EE6170]">
    <div className="flex justify-around items-center ">
      <div className="">
        <h2 className="font-poppins text-base font-medium leading-29 tracking-wide text-left text-white ml-3">FEYTI MEDICAL GROUP</h2>
        <h1 className="font-poppins text-[3.7rem] font-semibold leading-65 text-left ml-3">Building the Future of<br />Pharmaceuticals..!</h1>
        <p className="font-poppins text-base font-normal leading-26 text-left w-[25rem] ml-3">Seamlessly take Clinical Trials and monitor your progress with a doctor next to you</p>

        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel leftControl={<BiArrowToLeft />} rightControl={<BiArrowToRight />} slideInterval={5000}>
            <img src="public/pharm2.jpg" alt="pic" className="w-[500px] h-[340px]" />
            <img src="public/pharm3.jpg" alt="pic" className="w-[500px] h-[340px]" />
          </Carousel>
        </div>
      </div>
    </div>
    </div>
  
    </>
  )
}
