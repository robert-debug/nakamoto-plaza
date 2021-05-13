from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .transfer import Transfer
class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  firstname = db.Column(db.String(70), nullable = False)
  lastname = db.Column(db.String(100), nullable = False)
  fakebankinfo= db.Column(db.Integer, nullable= False)
  hashed_password = db.Column(db.String(255), nullable = False)
  state = db.Column(db.String(13), nullable = False)

  senders= db.relationship(
    'Transfer', 
  backref='sender', 
  foreign_keys='Transfer.sender_id',
  lazy='dynamic'
  )

  receivers= db.relationship(
    'Transfer', 
    backref='receiver', 
    foreign_keys='Transfer.receiver_id',
    lazy='dynamic'
  )

  vaults = db.relationship(
      "Vault", 
      uselist=False,
      back_populates="users"
  )

  transactions = db.relationship(
      "Transaction",
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
      "email": self.email,
      "firstname": self.firstname,
      "lastname": self.lastname
    }
