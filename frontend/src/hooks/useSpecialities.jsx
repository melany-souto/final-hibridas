import { useEffect, useState } from "react"
import { getSpecialityById, getSpecialities } from "../services/specialities.service.js"

export function useSpecialities() {
    const [ specialities, setSpecialities ] = useState([])
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        getSpecialities()
            .then(specialities => {
                setSpecialities(specialities)
            })
            .catch(err => setError(err.message))
            .finally( () => setLoading(false) )
    }, [])

    return {specialities, error, loading}
}

export function useSpeciality(id){
    const [ speciality, setSpeciality ] = useState(null)
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(true)

   useEffect(() => {
    if (!id) return;
    
    setLoading(true)

    getSpecialityById(id)
        .then(speciality => setSpeciality(speciality))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
}, [id]) 

    return {speciality, error, loading}
}