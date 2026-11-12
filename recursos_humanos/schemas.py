from marshmallow import Schema, fields, validate


class EmpleadoSchema(Schema):
    idEmpleado = fields.Int(dump_only=True)
    nombre = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    departamento = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    sueldo = fields.Decimal(
        required=True,
        places=2,
        as_string=True,
        validate=validate.Range(min=0),
    )