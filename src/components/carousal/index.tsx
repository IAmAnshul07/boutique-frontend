"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";

const CarouselComp = () => {
  const carouselRef = useRef<HTMLDivElement>(null); // Specify the type of carouselRef

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        const scrollAmount = carouselRef.current.offsetWidth;
        carouselRef.current.scrollLeft += scrollAmount;
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 2000); // Adjust the interval duration as needed (2000ms = 2 seconds)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div ref={carouselRef} className="carousel carousel-center max-w-full p-4 space-x-4 rounded-box overflow-x-auto">
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/v/v/h/-original-imagydw5ph2kyzqq.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/f/l/s/xxl-anafts3143-arrow-newyork-original-imagp8q24zzr8usd.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/w/o/6/4xl-db1024-3bros-original-imagt7byhhrqdkym.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/k8ddoy80/t-shirt/b/k/2/xxl-11363874-wrogn-original-imafqejfyw7gnmbq.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/9/b/b/-original-imagxy7whcfb5fx9.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/o/q/x/-original-imagtvbfsfqpgvtz.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/v/v/h/-original-imagydw5ph2kyzqq.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/f/l/s/xxl-anafts3143-arrow-newyork-original-imagp8q24zzr8usd.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/w/o/6/4xl-db1024-3bros-original-imagt7byhhrqdkym.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/k8ddoy80/t-shirt/b/k/2/xxl-11363874-wrogn-original-imafqejfyw7gnmbq.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/9/b/b/-original-imagxy7whcfb5fx9.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/o/q/x/-original-imagtvbfsfqpgvtz.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
      <div className="carousel-item w-1/4">
        <Image
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/h/j/m/s-db1024-3bros-original-imagt7byhgagyuhf.jpeg?q=70"
          className="rounded-box object-cover w-full h-full"
          alt="carousel images"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default CarouselComp;
