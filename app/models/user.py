from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  firstname = db.Column(db.String(70), nullable = False)
  lasttname = db.Column(db.String(100), nullable = False)
  fakebankinfo= db.Column(db.Integer, nullable= False)
  hashed_password = db.Column(db.String(255), nullable = False)
  state = db.Column(db.String(13), nullable = False)

  transfers = db.relationship(
      "Transfer",
      back_populates="users"
  )

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def full_to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      'firstname': self.firstname,
      'lastname' : self.lastname,
      'fakebankinfo' : self.fakebankinfo,
      'state': self.state
    }

    def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }
