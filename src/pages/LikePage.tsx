import { useRecoilValue } from "recoil";
import { userAtom } from "../states";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LikePage() {
  const user = useRecoilValue(userAtom);
  const [hearts, setHearts] = useState<{ id: number; y: number }[]>([]);
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
       
        heartRef.current.style.transform = "rotateY(180deg) scale(1.1)";
      } else {
        
        heartRef.current.style.transform = "rotateY(-180deg) scale(1.1)";
      }

      setTimeout(() => {
        if (heartRef.current) {
          heartRef.current.style.transform = "";
        }
      }, 400);
    }

    setIsRed(true);
    setTimeout(() => setIsRed(false), 200);

    const id = Date.now();
    setHearts((prev) => [...prev, { id, y: 0 }]);
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
        }`}
        style={{
          textShadow: "0 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,0,0,0.5)",
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.4))",
        }}
        onClick={handleLike}
      >
        ❤
      </div>

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-red-500 text-4xl animate-float"
          style={{
            left: "50%",
            bottom: "50%",
            transform: "translateX(-50%)",
            filter: "drop-shadow(0 0 5px rgba(255,0,0,0.6))",
          }}
        >
          ❤
        </span>
      ))}

      <style>{`
        @keyframes float {
          0% { transform: translateX(-50%) translateY(0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translateX(-50%) translateY(-200px) scale(1.3) rotate(20deg); opacity: 0; }
        }
        .animate-float {
          animation: float 0.6s ease-out forwards;
        }
        .heart-3d {
          perspective: 800px;
        }
        .heart-3d:hover {
          transform: scale(1.15) rotateX(15deg) rotateZ(-5deg);
          text-shadow: 0 8px 16px rgba(0,0,0,0.4), 0 0 30px rgba(255,0,0,0.8);
          filter: drop-shadow(0 0 20px rgba(255,0,0,0.8));
        }
      `}</style>
    </div>
  );
}
