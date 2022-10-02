import PacmanLoader from "react-spinners/PacmanLoader";
import { useState } from "react";
function Loading() {
  const css = {
    margin: "20px",
  };
  const [size, setSize] = useState(80);
  // 調整loading大小
  window.addEventListener("resize", () => {
    if (window.screen.width <= 414) {
      setSize(() => 30);
    } else if (window.screen.width <= 820 && window.screen.width > 414) {
      setSize(() => 50);
    } else {
      setSize(() => 80);
    }
  });
  return <PacmanLoader color="#533f34" size={size} cssOverride={css} />;
}

export default Loading;
