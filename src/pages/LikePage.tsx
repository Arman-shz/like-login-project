import { useRecoilValue } from "recoil";
import { userAtom } from "../states";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LikePage() {
  const user = useRecoilValue(userAtom);
  const [hearts, setHearts] = useState<{ id: number }[]>([]);
  const [isRed, setIsRed] = useState(false);
  const heartRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLike = (e: React.MouseEvent) => {
    if (heartRef.current) {
      const rect = heartRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      if (clickX > rect.width / 2) {
        heartRef.current.classList.add("rotate-y");
        setTimeout(() => heartRef.current?.classList.remove("rotate-y"), 400);
      } else {
        heartRef.current.classList.add("rotate-y-left");
        setTimeout(() => heartRef.current?.classList.remove("rotate-y-left"), 400);
      }
    }

    setIsRed(true);
    setTimeout(() => setIsRed(false), 200);

    const id = Date.now();
    setHearts((prev) => [...prev, { id }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-tr from-pink-400 via-red-400 to-purple-500">
      <h2 className="text-white text-2xl font-bold mb-6 drop-shadow-lg">
        خوش آمدید {user?.firstName} {user?.lastName}
      </h2>

      <div
        ref={heartRef}
        className={`heart-3d text-9xl cursor-pointer select-none transition-all duration-300 ${
          isRed ? "text-red-500" : "text-white"
        } drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]`}
        onClick={handleLike}
      >
        ❤
      </div>

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute left-1/2 bottom-1/2 -translate-x-1/2 text-red-500 text-4xl animate-heartFloat drop-shadow-[0_0_5px_rgba(255,0,0,0.6)]"
        >
          ❤
        </span>
      ))}
    </div>
  );
}
