import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../states";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone.match(/^09\d{9}$/)) {
      alert("لطفاً همه فیلدها را درست پر کنید");
      return;
    }
    const userData = { firstName, lastName, phone };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/like");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">ورود</h2>
        <input
          type="text"
          placeholder="نام"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="نام خانوادگی"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="tel"
          placeholder="شماره موبایل (مثال: 09123456789)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
