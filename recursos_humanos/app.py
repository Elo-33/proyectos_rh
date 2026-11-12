from flask import Flask

from extensions import db, migrate, cors
from api import api_bp
import models  # noqa: F401  (necesario para que Alembic detecte las tablas)


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "mysql+pymysql://root:admin@localhost:3306/recursos_humanos_db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["RESTFUL_JSON"] = {"ensure_ascii": False}

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    app.register_blueprint(api_bp)
    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5001)








