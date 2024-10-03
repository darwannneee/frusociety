"use client"
  import React, { useState, useEffect, useRef } from 'react';
  import localFont from "next/font/local"
  import { Poppins } from "next/font/google"

  const Groovy_Craft = localFont({ src: './fonts/Groovy_Craft/Groovy_Craft.otf' })
  const Quadrophonic = localFont({ src: './fonts/Quadrophonic/Quadrophonic.otf' })
  const PoppinsFont = Poppins({
    weight: "400",
    subsets: ['latin']
  })

  const PoppinsFontBold = Poppins({
    weight: "900",
    subsets: ['latin']
  })

  const PoppinsFontSemiBold = Poppins({
    weight: "600",
    subsets: ['latin']
  })

  const PoppinsFontBoldItalic = Poppins({
    weight: "900",
    style: 'italic',
    subsets: ['latin']
  })

  export default function Home() {
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioReady, setAudioReady] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      audioRef.current = new Audio('/music/Hope.mp3');
      audioRef.current.loop = true;
      audioRef.current.autoplay = true;
      audioRef.current.muted = true;  // Mute to avoid autoplay restrictions
    
      audioRef.current.addEventListener('canplaythrough', () => {
        setAudioReady(true);
      });
    
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('canplaythrough', () => {});
        }
        audioRef.current = null;
      };
    }, []);

    const startApp = () => {
      setLoading(false);
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          if (audioRef.current) {
            audioRef.current.muted = false;  // Unmute after it starts
          }
        }).catch(error => {
          console.error("Autoplay failed:", error);
        });
      }
      setIsPlaying(true);
    };

    const togglePlay = () => {
      if (!audioRef.current || !audioReady) return;

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    };

    if (loading) {
      return (
        <div className="h-screen bg-[#1F1F1F] flex flex-col items-center justify-center" onClick={startApp}>
          <div className='flex gap-x-7'>
            <h1 className={`text-[80px] md:text-[146px] text-[#D54F35] leading-none ${Groovy_Craft.className}`}>FRU!</h1>
            <svg className='w-[10px] h-[80px] md:w-[20px] md:h-[120px]' viewBox="0 0 20 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="120" rx="10" fill="white"/>
            </svg>
            <svg className='animate-spin-slow w-[50px] md:w-[102px] md:h-[114px]' viewBox="0 0 102 114" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M90.9434 38.184C105.077 46.7469 105.077 67.2531 90.9434 75.816L33.8999 110.376C19.2381 119.259 0.499994 108.703 0.499995 91.5604L0.499998 22.4396C0.499999 5.29684 19.2382 -5.25943 33.8999 3.62354L90.9434 38.184Z" fill="white"/>
            </svg>

          </div>
          

          <h1 className='text-white opacity-20'>click white button to enter</h1>
        </div>
      );
    }

  return (
    <div className="h-screen bg-[#D54F35] text-[#F4E0C4] flex flex-col">
      <div className="flex justify-end p-4">
        <button 
          onClick={togglePlay}
          className={`bg-black text-white px-7 py-3 rounded-xl flex items-center ${PoppinsFontSemiBold.className}`}
          disabled={!audioReady}
        >
          {audioReady ? (isPlaying ? "PAUSE" : "PLAY") : "Loading..."} - FRU! 
          <div className="ml-3">
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="6" height="21" rx="3" fill="white"/>
                <rect x="10" width="6" height="21" rx="3" fill="white"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.139 8.78468C18.4344 9.56136 18.4344 11.4386 17.139 12.2153L3.52843 20.3756C2.19537 21.1749 0.5 20.2146 0.5 18.6603L0.5 2.33969C0.5 0.785395 2.19537 -0.174873 3.52843 0.624371L17.139 8.78468Z" fill="white"/>
              </svg>
            )}
          </div>
        </button>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center">
        <div>
          <h2 className={`text-lg md:text-2xl mb-4 ${Quadrophonic.className} text-left`}>UNDER CONSTRUCTION I THE EXPERIMENTAL</h2>
          <h1 className={`text-[11rem] md:text-[20rem] leading-none ${Groovy_Craft.className}`}>FRU!</h1>
          <h2 className={`text-lg md:text-2xl mt-4 ${Quadrophonic.className} text-right`}>FREE MINT I SUPPLY : 5,555 NFT I $FRU</h2>
        </div>
      </div>
      
      <div className="bg-black text-white p-4 text-center text-xl">
        <p className={`${PoppinsFont.className}`}>
          <span className={`${PoppinsFontBold.className}`}>FRU!</span> BUILD ON <span className={`${PoppinsFontBoldItalic.className}`}>$SEI</span>
        </p>
      </div>
    </div>
  );
}