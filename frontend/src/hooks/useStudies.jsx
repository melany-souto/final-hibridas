import { useCallback, useEffect, useState } from "react"
import { getStudies } from "../services/studies.service.js"

export function useStudies(filter = "") {
  const [studies, setStudies] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchStudies = useCallback(() => {
    const normalized = (filter ?? "").toString().trim()

    setLoading(true)
    getStudies(filter)
      .then(data => {
        setStudies(data)
      })
      .catch(err => {
        setError(err.message || String(err))
      })
      .finally(() => setLoading(false))
  }, [filter])

  useEffect(() => {
    fetchStudies()
  }, [fetchStudies])

  return { studies, error, loading, refresh: fetchStudies }
}