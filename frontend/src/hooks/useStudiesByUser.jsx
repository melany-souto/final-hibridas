import { useCallback, useEffect, useState } from "react"
import { getStudiesByUser } from "../services/studies.service.js"

export function useStudiesByUser(userId) {
  const [studiesByUser, setStudiesByUser] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchStudies = useCallback(() => {

    setLoading(true)
    getStudiesByUser(userId)
      .then(data => {
        setStudiesByUser(data)
      })
      .catch(err => {
        setError(err.message || String(err))
      })
      .finally(() => setLoading(false))
  }, [userId])

  useEffect(() => {
    if (!userId) return
    fetchStudies()
  }, [fetchStudies])

  return { studiesByUser, error, loading, refresh: fetchStudies }
}