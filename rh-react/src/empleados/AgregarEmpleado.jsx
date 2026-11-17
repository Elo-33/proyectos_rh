import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const urlBase = 'http://localhost:8080/api/empleados'

export default function AgregarEmpleado() {
  const navegacion = useNavigate()
  const [empleado, setEmpleado] = useState({
    nombre: '',
    departamento: '',
    sueldo: ''
  })

  const { nombre, departamento, sueldo } = empleado

  const onInputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.post(urlBase, { nombre, departamento, sueldo: Number(sueldo) })
    navegacion('/')
  }

  return (
    <div className="container">
      <h3 className="text-center mb-4">Agregar empleado</h3>
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
        <button type="submit" className="btn btn-success">Agregar</button>
      </form>
    </div>
  )
}
