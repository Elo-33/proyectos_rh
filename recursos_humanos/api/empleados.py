from flask import request
from flask_restful import Resource
from marshmallow import ValidationError

from extensions import db
from models import Empleado
from schemas import EmpleadoSchema

empleado_schema = EmpleadoSchema()
empleados_schema = EmpleadoSchema(many=True)


class EmpleadoListResource(Resource):
    def get(self):
        empleados = Empleado.query.all()
        return empleados_schema.dump(empleados), 200

    def post(self):
        try:
            data = empleado_schema.load(request.get_json() or {})
        except ValidationError as err:
            return {"errores": err.messages}, 400

        empleado = Empleado(**data)
        db.session.add(empleado)
        db.session.commit()
        return empleado_schema.dump(empleado), 201


class EmpleadoResource(Resource):
    def get(self, id_empleado):
        empleado = db.session.get(Empleado, id_empleado)
        if empleado is None:
            return {"mensaje": "Empleado no encontrado"}, 404
        return empleado_schema.dump(empleado), 200

    def put(self, id_empleado):
        empleado = db.session.get(Empleado, id_empleado)
        if empleado is None:
            return {"mensaje": "Empleado no encontrado"}, 404

        try:
            data = empleado_schema.load(request.get_json() or {})
        except ValidationError as err:
            return {"errores": err.messages}, 400

        for campo, valor in data.items():
            setattr(empleado, campo, valor)
        db.session.commit()
        return empleado_schema.dump(empleado), 200

    def delete(self, id_empleado):
        empleado = db.session.get(Empleado, id_empleado)
        if empleado is None:
            return {"mensaje": "Empleado no encontrado"}, 404


        db.session.delete(empleado)
        db.session.commit()
        return {"mensaje": "Empleado eliminado"}, 200