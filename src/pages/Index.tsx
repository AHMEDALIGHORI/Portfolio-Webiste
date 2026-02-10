import { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FloatingWorld from "@/components/world/FloatingWorld";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <CustomCursor />
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <FloatingWorld />
    </>
  );
};

export default Index;
