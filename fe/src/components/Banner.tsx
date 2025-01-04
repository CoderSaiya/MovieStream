'use client'

import Image from "next/image";

export const Banner = () => {

  return (
    <div className="bg-sky-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="space-y-2 md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-semibold text-sky-900" data-aos="fade-right">
            Web movie and TV shows
          </h1>
          <p className="text-sky-700 text-lg" data-aos="fade-left">
            Watch your favorite movies and TV shows online. Enjoy high-quality streaming with no ads
          </p>
        </div>

        {/* Image Section */}
        <div className="relative mt-8 md:mt-0" data-aos="fade-up">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            {/* Placeholder drink image - replace src with your actual image */}
            <div className="relative w-24 h-24">
              <Image
                src="/images/banner.png"
                alt="Banner"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
            
            {/* Animated butterfly */}
            <div className="absolute -top-4 -right-4 animate-bounce">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-orange-400"
              >
                <path 
                  d="M12 2L15 8L12 14L9 8L12 2Z" 
                  fill="currentColor"
                />
                <path 
                  d="M12 14L15 20L12 22L9 20L12 14Z" 
                  fill="currentColor"
                />
                <path 
                  d="M12 14L18 11L20 14L18 17L12 14Z" 
                  fill="currentColor"
                />
                <path 
                  d="M12 14L6 11L4 14L6 17L12 14Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
