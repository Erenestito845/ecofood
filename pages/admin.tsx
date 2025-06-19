import { useEffect, useState } from "react";
import Layout from "../components/Layout";

interface Vulnerabilidad {
  id: number;
  nombre: string;
  riesgo: string;
  descripcion: string;
}

export default function Admin() {
  const [data, setData] = useState<Vulnerabilidad[]>([]);
  const [form, setForm] = useState({ nombre: "", riesgo: "Medio", descripcion: "" });

  useEffect(() => {
    fetch("/api/vulnerabilidades")
    .then((res) => res.json())
    .then(setData);
  }, []);

  const agregar = async () => {
    const res = await fetch("/api/vulnerabilidades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    setData([...data, { ...form, id: result.id }]);
    setForm({ nombre: "", riesgo: "Medio", descripcion: "" });
  };

  const eliminar = async (id: number) => {
    await fetch("/api/vulnerabilidades", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setData(data.filter((v) => v.id !== id));
  };

  return (
    <Layout title="Administrar Vulnerabilidades">
    <h1 className="mb-4">Panel de Administración</h1>

    <form
    onSubmit={(e) => {
      e.preventDefault();
      agregar();
    }}
    className="glass p-4 rounded shadow mb-5 bg-dark text-light"
    >
    <div className="row g-3">
    <div className="col-md-4">
    <input
    type="text"
    className="form-control"
    placeholder="Nombre"
    required
    value={form.nombre}
    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
    />
    </div>
    <div className="col-md-4">
    <select
    className="form-select"
    value={form.riesgo}
    onChange={(e) => setForm({ ...form, riesgo: e.target.value })}
    >
    <option>Crítico</option>
    <option>Alto</option>
    <option>Medio</option>
    <option>Bajo</option>
    </select>
    </div>
    <div className="col-md-4">
    <input
    type="text"
    className="form-control"
    placeholder="Descripción"
    required
    value={form.descripcion}
    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
    />
    </div>
    <div className="col-12 text-end">
    <button type="submit" className="btn btn-success">
    Agregar
    </button>
    </div>
    </div>
    </form>

    <div className="list-group">
    {data.map((v) => (
      <div
      key={v.id}
      className="list-group-item bg-dark border border-secondary text-light d-flex justify-content-between align-items-center rounded mb-2"
      >
      <div>
      <h5 className="mb-1">{v.nombre}</h5>
      <small>{v.descripcion}</small>
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => eliminar(v.id)}>
      Eliminar
      </button>
      </div>
    ))}
    </div>
    </Layout>
  );
}
