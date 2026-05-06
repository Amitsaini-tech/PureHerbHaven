import React, { useState } from 'react'
import image1 from "../image/star circle.webp"
import image2 from "../image/TP_MP.webp"
import image3 from "../image/Crowd_Source.webp"
import { IoBulbOutline, IoTelescopeOutline } from "react-icons/io5";
import { theme } from '../utils/constants';

const Mid2Container = () => {
    const [selectedSub, setSelectedSub] = useState(theme[0].sub);

    const handleSubClick = (sub) => {
        setSelectedSub(sub);
    };
    return (
        <div className="w-full font-sans">
            {/* Section 1: We Embody */}
            <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-400 to-blue-200 flex flex-col justify-center items-center text-center">
                <h2 className="font-classic font-semibold text-4xl md:text-5xl text-gray-900 mb-6 tracking-wide">WE EMBODY</h2>
                <p className="max-w-4xl text-lg md:text-xl text-gray-800 leading-relaxed mb-10">
                    Transparency is in our DNA. That's why our formulas were developed exactly the way you'd expect: science backed, vegan and cruelty free! Designed for common skin needs in mind - the all-in-one solution.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    <img src={image1} alt="Star Circle" className="w-32 animate-spin-slow" style={{ animationDuration: '20s' }} />
                    <img src={image2} alt="Certifications" className="h-16 md:h-20 object-contain" />
                </div>
            </div>

            {/* Section 2: The Collective */}
            <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#FCD0C8] flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-24">
                <div className="w-full md:w-1/2 max-w-lg">
                    <img src={image3} alt="Crowd Source" className="w-full rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left max-w-lg">
                    <h2 className="font-classic font-semibold text-4xl md:text-5xl text-gray-900 mb-4 tracking-wide">THE JH COLLECTIVE</h2>
                    <p className="text-xl md:text-2xl text-amber-900 font-classic font-bold mb-4 leading-tight">
                        Our products are developed with insights from our most loyal customers.
                    </p>
                    <p className="text-lg text-gray-800 mb-10 leading-relaxed">
                        Join us on our mission to create proven solutions that go deeper than just the surface.
                    </p>
                    <div className="flex flex-wrap gap-8 w-full">
                        <button className="flex flex-col items-center group text-gray-900 hover:text-amber-800 transition-colors">
                            <IoTelescopeOutline className="text-5xl mb-2 group-hover:scale-110 transition-transform" />
                            <span className="underline uppercase font-semibold text-sm tracking-widest text-center">Crowdsourced<br/>Creations</span>
                        </button>
                        <button className="flex flex-col items-center group text-gray-900 hover:text-amber-800 transition-colors">
                            <IoBulbOutline className="text-5xl mb-2 group-hover:scale-110 transition-transform" />
                            <span className="underline uppercase font-semibold text-sm tracking-widest text-center">Share an<br/>Idea</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Section 3: Press/Theme */}
            <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center">
                <div className="max-w-4xl min-h-[150px] flex items-center justify-center text-center mb-12 px-4">
                    {theme
                        .filter((category) => category.sub === selectedSub)
                        .flatMap((category) => category.posts)
                        .map((post) => (
                            <div key={post.id} className="animate-fade-in">
                                <p className="text-2xl md:text-3xl font-semibold font-classic text-gray-800 italic leading-relaxed">
                                    {post.title}
                                </p>
                            </div>
                        ))}
                </div>
                
                {/* Theme Selectors */}
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-70">
                    {theme.map(({ sub }) => (
                        <div
                            key={sub}
                            className={`cursor-pointer transition-all duration-300 ${selectedSub === sub ? 'scale-110 opacity-100 drop-shadow-md' : 'hover:scale-105 hover:opacity-100 grayscale hover:grayscale-0'}`}
                            onClick={() => handleSubClick(sub)}
                        >
                            <img src={sub} alt="Press Logo" className="w-24 md:w-32 h-auto object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Mid2Container