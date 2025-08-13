import { useRecoilState, useRecoilValue } from "recoil";
import { likeCountAtom, userAtom } from "../states";
import { useEffect, useState } from "react";

export default function LikePage() {
  const user = useRecoilValue(userAtom);
  const [likeCount, setLikeCount] = useRecoilState(likeCountAtom);
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!user && storedUser) {
      // در صورت ریفرش صفحه کاربر را از لوکال استورج برگردان
    }
  }, []);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    const id = Date.now();
    setHearts([...hearts, { id, left: Math.random() * 80 + 10 }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 to-red-500 relative overflow-hidden">
      <h2 className="text-white text-2xl font-bold mb-4">
        خوش آمدید {user?.firstName} {user?.lastName}
      </h2>
      <div
        className="text-9xl cursor-pointer select-none transition-colors"
        onClick={handleLike}
      >
        ❤️
      </div>
      <p className="text-white mt-4 text-lg">تعداد لایک‌ها: {likeCount}</p>

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-red-500 text-4xl animate-float"
          style={{ left: `${heart.left}%`, bottom: "20%" }}
        >
          ❤️
        </span>
      ))}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-200px) scale(1.5); opacity: 0; }
        }
        .animate-float {
          animation: float 1.5s ease-in forwards;
        }
      `}</style>
    </div>
  );
}
