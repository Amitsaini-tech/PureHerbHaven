import React, { useState } from 'react';
import { categories } from '../utils/data';
import { Link } from 'react-router-dom';
import video from "../image/video.mp4"

const MidContainer = () => {
  const [selectedSub, setSelectedSub] = useState(categories[0].sub);

  const handleSubClick = (sub) => {
    setSelectedSub(sub);
  };

  return (
    <div>
      <div className="grid grid-cols-3">
        {categories.map(({ sub }) => (
          <div
            key={sub}
            className="w-full h-full flex items-center justify-center my-5 py-3 px-5 cursor-pointer"
            onClick={() => handleSubClick(sub)}
          >
            <span className="text-2xl font-medium">{sub}</span>
          </div>
        ))}
      </div>

      <div className=" w-full flex flex-row flex-wrap items-center justify-start gap-1 my-5 py-3 px-4">
        {categories
          .filter((category) => category.sub === selectedSub)
          .flatMap((category) => category.posts)
          .map((post) => (
            <div
              key={post.id}
              className="w-[21rem]  h-[36rem] flex flex-col items-center justify-start m-2"
            >
              <img src={post.imgsrc} alt="" className="w-[22rem] h-[29rem]" />
              <span className="text-md font-light my-2 capitalize">{post.title}</span>
              <span className="text-[12px] font-normal text-orange-700 capitalize">{post.Highlight}</span>
              <span className="text-lg font-mono my-2">{post.Price}</span>
              <br />
              <Link to={post.path}>
              <button
                type="button"
                className="w-[21rem] bg-red-200 hover:bg-red-300 h-10 font-mono"
              >
                Add to cart
              </button>
              </Link>
            </div>
          ))}

      </div>
      <div>
        <video src={video} autoPlay="true" loop="true" className="my-5 py-3 px-5"/>
      </div>
    </div>
  );
};

export default MidContainer;
