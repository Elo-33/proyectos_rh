from rest_framework import generics

from .models import Empleado
from .serializers import EmpleadoSerializer


class EmpleadoListCreateView(generics.ListCreateAPIView):
    """GET /api/empleados   -> lista todos
       POST /api/empleados  -> crea uno nuevo"""
    queryset = Empleado.objects.all().order_by("idEmpleado")
    serializer_class = EmpleadoSerializer


class EmpleadoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PUT/PATCH/DELETE /api/empleados/<idEmpleado>"""
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    lookup_field = 'idEmpleado'