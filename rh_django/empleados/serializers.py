from rest_framework import serializers

from .models import Empleado


class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = ['idEmpleado', 'nombre', 'departamento', 'sueldo']
        read_only_fields = ['idEmpleado']

    def validate_nombre(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('El nombre es obligatorio.')
        return value

    def validate_departamento(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('El departamento es obligatorio.')
        return value

    def validate_sueldo(self, value):
        if value <= 0:
            raise serializers.ValidationError('El sueldo debe ser mayor que 0.')
        return value