import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";

interface Vulnerabilidad {
  id: number;
  nombre: string;
  riesgo: string;
  descripcion: string;
}

export default function Home() {
  const [data, setData] = useState<Vulnerabilidad[]>([]);

  useEffect(() => {
    fetch("/api/vulnerabilidades")
    .then((res) => res.json())
    .then(setData);
  }, []);

  const riesgos = ["Crítico", "Alto", "Medio", "Bajo"];
  const colores: Record<string, string> = {
    Crítico: "bg-danger text-white",
    Alto: "bg-warning text-dark",
    Medio: "bg-info text-dark",
    Bajo: "bg-success text-white",
  };

  return (
    <Layout title="INKA Security - Dashboard">
    <div className="row g-4 mb-4">
    {riesgos.map((riesgo) => {
      const cantidad = data.filter((v) => v.riesgo === riesgo).length;
      return (
        <div key={riesgo} className="col-md-3">
        <div className={`card text-center shadow ${colores[riesgo]}`}>
        <div className="card-body">
        <h5 className="card-title">{riesgo}</h5>
        <h2 className="fw-bold">{cantidad}</h2>
        </div>
        </div>
        </div>
      );
    })}
    </div>

    <h2 className="h4 mb-3">Vulnerabilidades Detectadas</h2>
    <div className="list-group">
    {data.map((v) => (
      <div
      key={v.id}
      className="list-group-item bg-dark border border-secondary text-light rounded mb-2 shadow-sm"
      >
      <div className="d-flex justify-content-between">
      <h5>{v.nombre}</h5>
      <span className={`badge ${colores[v.riesgo]}`}>{v.riesgo}</span>
      </div>
      <p className="mb-1 small">{v.descripcion}</p>
      <Link href={`/vulnerabilidad/${v.id}`} className="btn btn-outline-info btn-sm mt-2">
      Ver más →
      </Link>
      </div>
    ))}
    </div>
    </Layout>
  );
}
