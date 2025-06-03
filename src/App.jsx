
import { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";

const ACCESS_CODES = new Set(["RDRF4R", "P5VLT8", "WCK88M", "HECOXB", "TFRJD2", "Y8GGWW", "FFSAFY", "N9YZNU", "RNS325", "41RBD3", "4YRJRV", "WGWQ7S", "CO7A6C", "34P7VO", "0SLYGB", "I37R7Z", "8G3S5O", "ETNK3H", "NIBDXN", "RX1GSJ", "VLIEW0", "XCM4AM", "PDO2UM", "I4QJVF", "BS9C84", "K0DL2O", "MORB2G", "A22WFR", "W59PVO", "809WRZ", "H94VA0", "A8H0UQ", "NZW4KF", "OO5FNI", "EGPZOF", "EQ65SI", "2OLTOJ", "I2XNBP", "BTLQDJ", "KZCD60", "GNHC03", "GPEOW0", "VAVXFM", "092TJ4", "SEDUBB", "IKWZCZ", "Z3JLEF", "QAFB8B", "RBB1RX", "ZGVG79", "RK8AUI", "BTZ6AK", "AV332Z", "YISI1Y", "4S8WJH", "Z2X2LL", "E4031Q", "BS0FHG", "S9TSJN", "ED2XG0", "AKHMJP", "59WL7L", "ATEQ7P", "W9KOYF", "TRVIM9", "VHLJ2B", "KJ1C0E", "Y8K2CS", "H3NKQC", "F8H8LB", "IZIFPT", "Z6ZOTZ", "I3MVHP", "D7VUMC", "DNHMEX", "IFDSRU", "KKELNM", "5KK0UG", "LHPOR6", "5ONY75", "BBJ0ET", "4KENSZ", "FRTF65", "0BEWF5", "2X3O0E", "OV0X49", "NEPRGW", "3OSHNE", "QCU9OZ", "NOHZUI", "W2NC6H", "4W7CZ1", "1PE8K0", "4J1NDV", "HC8FVU", "L6AMDU", "RO7RHP", "6N7SJA", "NYFKGL", "RJZIZ6", "ADMIN123"]);
const ADMIN_CODE = "ADMIN123";

const generatedThemes = [
  {
    geo: "ЯПОНИЯ, ТОКИО",
    text: "Сегодня, моему русскоговорящему посту, тихий, спокойный.",
    type: "Смотрит любой",
    duration: "4 часа",
    pay: "700$"
  },
  {
    geo: "Дубай",
    text: "Арабский клиент, культурный и щедрый.",
    type: "Типаж: модельная внешность",
    duration: "2 часа",
    pay: "600$"
  },
  {
    geo: "Бали",
    text: "Пара из Европы, ищут яркий опыт.",
    type: "Типаж: открытая и активная",
    duration: "3 часа",
    pay: "900$"
  }
];

const getRandomThemes = () => {
  const shuffled = [...generatedThemes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const EscortOrdersApp = () => {
  const [code, setCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [themes, setThemes] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const savedCode = localStorage.getItem("access_code");
    if (savedCode && ACCESS_CODES.has(savedCode)) {
      setIsLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      setIsAdmin(savedCode === ADMIN_CODE);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setThemes(getRandomThemes());
      const interval = setInterval(() => {
        setThemes(getRandomThemes());
      }, 10 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    const cleanCode = code.trim().toUpperCase();
    if (ACCESS_CODES.has(cleanCode)) {
      localStorage.setItem("access_code", cleanCode);
      setIsLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      setIsAdmin(cleanCode === ADMIN_CODE);
      localStorage.setItem("isAdmin", cleanCode === ADMIN_CODE);
    } else {
      alert("Неверный код доступа");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_code");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCode("");
  };

  const handleRespond = (theme) => {
    const cleanCode = code.trim().toUpperCase();
    const entry = { ...theme, time: new Date().toLocaleString(), byCode: cleanCode };
    const updated = [...responses, entry];
    setResponses(updated);
    localStorage.setItem("admin_responses", JSON.stringify(updated));
    alert("Отклик отправлен!");
  };

  if (!isLoggedIn) {
    return (
      <div style={{minHeight: "100vh", backgroundColor: "#111", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "20px"}}>
        <h1>Введите код доступа</h1>
        <input value={code} onChange={(e) => setCode(e.target.value)} style={{padding: "10px", fontSize: "16px", marginBottom: "10px"}} />
        <button onClick={handleLogin} style={{padding: "10px 20px"}}>Войти</button>

        <div style={{textAlign: "center", marginTop: "40px"}}>
          <p>500$ — 3 месяца</p>
          <p>1000$ — 6 месяцев</p>
          <p>3000$ — неограниченный доступ</p>
          <p style={{marginTop: "10px"}}>Оплата и вопросы: <strong>@premiumsecretcall</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div style={{padding: "20px", backgroundColor: "#111", color: "#eee", minHeight: "100vh"}}>
      <div style={{textAlign: "right"}}>
        <button onClick={handleLogout} style={{padding: "6px 12px", backgroundColor: "#eee", color: "#000", borderRadius: "4px", border: "none", cursor: "pointer"}}>Выйти</button>
      </div>

      <h1 style={{textAlign: "center"}}>🚀 Доступ открыт</h1>

      <div style={{display: "grid", gap: "20px"}}>
        {themes.map((theme, idx) => (
          <div key={idx} style={{border: "1px solid #444", borderRadius: "8px", padding: "15px", backgroundColor: "#1a1a1a"}}>
            <h3>🌍 {theme.geo}</h3>
            <p>{theme.text}</p>
            <p><strong>{theme.type}</strong></p>
            <p>{theme.duration} — <strong>{theme.pay} чистыми</strong></p>
            <button
              onClick={() => handleRespond(theme)}
              style={{marginTop: "10px", padding: "8px 16px", backgroundColor: "#fff",
                color: "#000", border: "none", borderRadius: "5px", cursor: "pointer"}}
            >
              Откликнуться
            </button>
          </div>
        ))}
      </div>

      {isAdmin && responses.length > 0 && (
        <div style={{marginTop: "40px"}}>
          <h2>📥 Отклики (только для админа)</h2>
          {responses.map((res, i) => (
            <div key={i} style={{borderTop: "1px solid #444", padding: "10px 0"}}>
              <p><strong>{res.geo}</strong> — {res.time}</p>
              <p>{res.text} / {res.type} / {res.duration} — {res.pay}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EscortOrdersApp;
