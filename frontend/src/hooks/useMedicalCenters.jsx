import { useEffect, useState, useCallback } from "react"
import { getMedicalCenters, getMedicalCentersByLocation } from "../services/MedicalCenters.service.js"

export function useMedicalCenters(ubicacion = "") {
  const [medicalCenters, setMedicalCenters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchData = useCallback(() => {
    setLoading(true)

    const request = ubicacion
      ? getMedicalCentersByLocation(ubicacion)
      : getMedicalCenters()

    request
      .then(data => setMedicalCenters(data))
      .catch(err => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [ubicacion])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { medicalCenters, loading, error, refresh: fetchData }
}