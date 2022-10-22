import { useState, useEffect } from "react";
const screenHeight = Math.ceil(window.screen.height / 3);
export const ScrollToTop = () => {
  const handleClickScrollTop = () => window.scrollTo(0, 0);
  const [isScrollY, setIsScrollY] = useState(window.scrollY);
  useEffect(() => {
    window.addEventListener('scroll',()=>{
      setIsScrollY(window.scrollY);
    })
  });
  return (
    <>
      {isScrollY > screenHeight ? (
        <button
          className="scroll-top material-symbols-outlined"
          onClick={handleClickScrollTop}
        >
          assistant_navigation
        </button>
      ) : null}
    </>
  );
};
