import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

interface Vulnerabilidad {
  id: number;
  nombre: string;
  riesgo: string;
  descripcion: string;
}

export default function VulnerabilidadDetalle() {
  const [vul, setVul] = useState<Vulnerabilidad | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/vulnerabilidades/${id}`)
      .then((res) => res.json())
      .then(setVul);
    }
  }, [id]);

  const colores: Record<string, string> = {
    Crítico: "bg-danger text-white",
    Alto: "bg-warning text-dark",
    Medio: "bg-info text-dark",
    Bajo: "bg-success text-white",
  };

  return (
    <Layout title="Detalle de Vulnerabilidad">
    {vul ? (
      <div className="card bg-dark text-light shadow">
      <div className="card-body">
      <h2 className="card-title">{vul.nombre}</h2>
      <h6 className={`badge ${colores[vul.riesgo]} fs-6 py-2 px-3`}>
      Riesgo: {vul.riesgo}
      </h6>
      <p className="mt-3">{vul.descripcion}</p>
      </div>
      </div>
    ) : (
      <p>Cargando...</p>
    )}
    </Layout>
  );
}
