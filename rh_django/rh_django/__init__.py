import pymysql

# Django comprueba la versión de mysqlclient; PyMySQL declara una antigua.
# Con esto le decimos que es compatible.
pymysql.version_info = (2, 2, 1, "final", 0)
pymysql.install_as_MySQLdb()