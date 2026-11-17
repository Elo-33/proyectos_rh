import { Link } from 'react-router-dom'

export default function Navegacion() {
  return (
    <nav className="navbar navbar-expand bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand" to="/">Sistema RH</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/agregar">Agregar empleado</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
