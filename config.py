import os
from flask import Flask, flash, request, redirect, url_for

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'QWERTYUIOPASDFGHJKLZXCVBNM!@#$%^)(*&^'