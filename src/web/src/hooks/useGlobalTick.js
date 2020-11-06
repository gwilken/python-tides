import { useRef, useEffect } from "react";


const useGlobalTick = globalSpeed => {
  const tickRef = useRef(0);
  let requestId;

  useEffect(() => {
    const loop = () => {
      requestId = requestAnimationFrame(loop) 
      tickRef.current += parseFloat(globalSpeed);
    }
    loop();
    return () => {
      cancelAnimationFrame(requestId)
    }
  });
  return tickRef;
}

export default useGlobalTick;

