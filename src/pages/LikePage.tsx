import { useRecoilState, useRecoilValue } from "recoil";
import { likeCountAtom, userAtom } from "../states";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LikePage() {
  const user = useRecoilValue(userAtom);
  const [likeCount, setLikeCount] = useRecoilState(likeCountAtom);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const [isRed, setIsRed] = useState(false);
  const heartRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    setIsRed(true);
    setTimeout(() => setIsRed(false), 200);

    if (heartRef.current) {
      const rect = heartRef.current.getBoundingClientRect();
      const id = Date.now();
      setHearts((prev) => [
        ...prev,
        {
          id,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      ]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 relative overflow-hidden">
      <h2 className="text-white text-2xl font-bold mb-4 drop-shadow-lg">
        خوش آمدید {user?.firstName} {user?.lastName}
      </h2>

      <div
        ref={heartRef}
        className={`heart-3d text-9xl cursor-pointer select-none transition-all duration-200 ${
          isRed ? "text-red-500" : "text-white"
        }`}
        style={{
          textShadow: "0 4px 6px rgba(0,0,0,0.3), 0 0 15px rgba(255,0,0,0.4)",
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.4))",
          transform: isRed ? "scale(1.1) rotate(-2deg)" : "scale(1)",
        }}
        onClick={handleLike}
      >
        ❤
      </div>

      <p className="text-white mt-4 text-lg drop-shadow-md">
        تعداد لایک‌ها: {likeCount}
      </p>

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-red-500 text-4xl animate-float"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            transform: "translate(-50%, -50%)",
            filter: "drop-shadow(0 0 5px rgba(255,0,0,0.6))",
          }}
        >
          ❤
        </span>
      ))}

      <style>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(-50%, -250px) scale(1.4) rotate(15deg); opacity: 0; }
        }
        .animate-float {
          animation: float 0.7s ease-out forwards;
        }
        .heart-3d:hover {
          transform: scale(1.2) rotate(5deg) translateZ(20px);
          text-shadow: 0 8px 12px rgba(0,0,0,0.4), 0 0 25px rgba(255,0,0,0.8), 0 0 35px rgba(255,100,100,0.8);
          filter: drop-shadow(0 0 15px rgba(255,0,0,0.8));
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}
