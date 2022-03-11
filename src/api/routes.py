"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Role
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/role', methods=['GET'])
def role_list():
    roles = Role.query.all()
    response = [role.serialize() for role in roles]
    return jsonify(response), 200

@api.route('/user', methods=['GET'])
def user_list():
    users = User.query.all()
    response = [user.serialize() for user in users]
    return jsonify(response), 200

@api.route('/user', methods=['POST'])
def add_user():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role_id = data.get('role')
    if not name or not email or not password or not role_id:
        return jsonify({'message': 'Es necesario completar todos los campos para agregar un usuario'}), 401

    user = User(name=name, email=email, password=password, role_id=role, is_active=True)
    db.session.add(user)
    db.session.commit()
    if not user:
            return jsonify({'message': 'Error al crear el usuario'}), 401

    return jsonify({'message': 'Usuario creado correctamente'}), 200

