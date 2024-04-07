import { Metadata } from "next";
import Image from "next/image";
import rightImage from "../asset/homepage/rightImage.png";
import women from "../asset/homepage/women.png";
import BottomImage from "../asset/homepage/bottom image.png";
import chooseUs from "../asset/homepage/chooseUs.png";
import CarouselComp from "@/components/carousal";
export const metadata: Metadata = {
  title: "Fashion | Fashion Boutique",
  description: "This is Fashion Boutique Home",
};

export default function Home() {
  return (
    <>
      <div className="flex flex-row items-center justify-center h-125 relative">
        <div className="box1 flex w-full h-125 absolute">
          <div className="bg-white h-full w-1/2"></div>
          <div className="h-full w-1/2 relative">
            <Image src={rightImage.src} fill={true} alt="Right Side Image" className="w-full h-[70%] object-cover md:h-full md:object-cover" />
          </div>
        </div>
        <div className="box2 z-10 absolute">
          <h1 className="text-center text-graydark dark:text-base-200 text-8xl lg:text-9xl xl:text-10xl font-bold">NEW FASHION</h1>
        </div>
        <div className="box3 z-20">
          <Image src={women.src} height={350} width={350} alt="Middle Image" className="" />
        </div>
      </div>
      <div className="bottomImage">
        <Image src={BottomImage} alt="Bottom Discount Image" />
      </div>
      <div className="flex justify-center">
        <CarouselComp />
      </div>
      <div className="flex w-full flex-col items-center h-auto mt-10">
        <div className="heading">
          <h1 className="text-3xl">Why To Choose Us</h1>
        </div>
        <div className="w-full flex justify-evenly mt-6">
          <div className="content w-1/4">
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Latest Trends</div>
              <div className="collapse-content">
                <p>
                  Explore our curated collection for the latest in fashion trends. From chic basics to statement pieces, we've got you covered with a diverse
                  range that reflects the current styles and seasonal must-haves, ensuring you always look and feel on point.
                </p>
              </div>
            </div>
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Quality Craftsmanship</div>
              <div className="collapse-content">
                <p>
                  We pride ourselves on the impeccable craftsmanship of our fashion pieces. Each item is meticulously crafted with premium materials and
                  attention to detail, guaranteeing both style and durability. From luxurious fabrics to exquisite embellishments, our collection exudes quality
                  and sophistication.
                </p>
              </div>
            </div>
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Personalized Service</div>
              <div className="collapse-content">
                <p>
                  Your satisfaction is our priority. Our dedicated team is here to provide personalized assistance every step of the way. Whether you need help
                  with sizing, styling advice, or tracking your order, we're committed to ensuring a seamless and enjoyable shopping experience tailored to your
                  needs.
                </p>
              </div>
            </div>
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Affordable Luxury</div>
              <div className="collapse-content">
                <p>
                  Indulge in luxury fashion without breaking the bank. We offer competitive prices and regular promotions, making high-end style accessible to
                  all. Experience the thrill of shopping for premium fashion pieces without the hefty price tag, and elevate your wardrobe with confidence and
                  affordability.
                </p>
              </div>
            </div>
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Community Connection</div>
              <div className="collapse-content">
                <p>
                  Join our vibrant fashion community and be part of something bigger. Connect with like-minded individuals, share style inspiration, and
                  celebrate self-expression in a supportive and empowering environment. Together, let's embrace individuality and celebrate the joy of fashion
                  in all its forms.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center h-[488px]	w-1/2">
            <Image src={chooseUs} alt="T-shirt" />
          </div>
        </div>
      </div>
    </>
  );
}
