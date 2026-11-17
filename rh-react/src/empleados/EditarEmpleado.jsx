import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const urlBase = 'http://localhost:8080/api/empleados'

export default function EditarEmpleado() {
  const navegacion = useNavigate()
  const { id } = useParams()
  const [empleado, setEmpleado] = useState({
    nombre: '',
    departamento: '',
    sueldo: ''
  })

  const { nombre, departamento, sueldo } = empleado

  useEffect(() => {
    cargarEmpleado()
  }, [])

  const cargarEmpleado = async () => {
    const respuesta = await axios.get(`${urlBase}/${id}`)
    setEmpleado(respuesta.data)
  }

  const onInputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${urlBase}/${id}`, { nombre, departamento, sueldo: Number(sueldo) })
    navegacion('/')
  }

  return (
    <div className="container">
      <h3 className="text-center mb-4">Editar empleado</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Departamento</label>
          <input
            type="text"
            className="form-control"
            name="departamento"
            value={departamento}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sueldo</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="form-control"
            name="sueldo"
            value={sueldo}
            onChange={onInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={() => navegacion('/')}>
          Regresar
        </button>
      </form>
    </div>
  )
}