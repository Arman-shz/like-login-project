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

  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!firstName.trim()) newErrors.firstName = "نام را وارد کنید";
    if (!lastName.trim()) newErrors.lastName = "نام خانوادگی را وارد کنید";
    if (!phone.match(/^09\d{9}$/)) newErrors.phone = "شماره موبایل معتبر وارد کنید";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = { firstName, lastName, phone };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/like");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">ورود</h2>
        
        <div>
          <input
            type="text"
            placeholder="نام"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="نام خانوادگی"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="شماره موبایل"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

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
