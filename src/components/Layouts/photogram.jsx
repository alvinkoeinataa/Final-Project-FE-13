import React from "react";

export const Photogram = () => {
  return (
    <>
      <div className="relative overflow-hidden md:flex w-1/2 bg-green-400 bg-opacity-30 justify-around items-center hidden" style={{ backgroundImage: "linear-gradient(green, rgb(74 222 128))" }}>
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">PHOTOGRAM</h1>
          <p className="text-white text-lg mt-2">The place you can share your photos</p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
    </>
  );
};
