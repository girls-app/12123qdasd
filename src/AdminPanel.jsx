
import { useState, useEffect } from "react";

const AdminPanel = ({ onLogout }) => {
  const [responses, setResponses] = useState([]);
  const [themes, setThemes] = useState([]);
  const [newTheme, setNewTheme] = useState({ geo: "", text: "", type: "", duration: "", pay: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("admin_responses")) || [];
    setResponses(saved);

    const storedThemes = JSON.parse(localStorage.getItem("themes")) || [];
    setThemes(storedThemes);
  }, []);

  const handleAddTheme = () => {
    const updated = [...themes, newTheme];
    setThemes(updated);
    localStorage.setItem("themes", JSON.stringify(updated));
    setNewTheme({ geo: "", text: "", type: "", duration: "", pay: "" });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#111", color: "#eee", minHeight: "100vh" }}>
      <h1>👑 Админ-панель</h1>
      <button onClick={onLogout} style={{ padding: "6px 12px", margin: "10px 0" }}>Выйти</button>

      
      <section style={{ marginTop: "30px" }}>
        <h2>📄 Темы</h2>
        {themes.map((t, i) => (
          <div key={i} style={{ borderBottom: "1px solid #444", padding: "10px 0" }}>
            <p><strong>Гео:</strong> {t.geo}</p>
            <p><strong>Описание:</strong> {t.text}</p>
            <p><strong>Типаж:</strong> {t.type}</p>
            <p><strong>Время:</strong> {t.duration}</p>
            <p><strong>Оплата:</strong> {t.pay}</p>
            <button onClick={() => {{
              const updated = [...themes];
              updated.splice(i, 1);
              setThemes(updated);
              localStorage.setItem("themes", JSON.stringify(updated));
            }}} style={{ marginTop: "5px", padding: "4px 8px" }}>Закрыть</button>
          </div>
        ))}
        <hr />

        <h2>➕ Добавить тему</h2>
        {["geo", "text", "type", "duration", "pay"].map((field) => (
          <input
            key={field}
            value={newTheme[field]}
            onChange={(e) => setNewTheme({ ...newTheme, [field]: e.target.value })}
            placeholder={field}
            style={{ display: "block", margin: "5px 0", padding: "8px", width: "100%" }}
          />
        ))}
        <button onClick={handleAddTheme} style={{ marginTop: "10px", padding: "8px 16px" }}>Добавить</button>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>📥 Отклики</h2>
        {responses.map((r, i) => (
          <div key={i} style={{ borderBottom: "1px solid #444", padding: "10px 0" }}>
            <p><strong>Тема:</strong> {r.geo} / {r.text}</p>
            <p><strong>Типаж:</strong> {r.type}</p>
            <p><strong>Время:</strong> {r.duration} — {r.pay}</p>
            <p><strong>Код аккаунта:</strong> {r.byCode}</p>
            <p><strong>Когда:</strong> {r.time}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminPanel;
