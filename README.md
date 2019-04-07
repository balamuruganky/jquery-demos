# Welcome to jquery-demos

The aim of the repository is to demonstrate the jquery packages that can be used in any web services like Flask, Django and Ruby on Rails, to help some of the use cases.

Installing Flask and venv on Ubuntu 18.04
=========================================

* sudo apt install python3-venv
* cd <path_to_project>   (eg. cd jquery-demos)
* python3 -m venv venv
* source venv/bin/active
* (venv) pip install Flask
* (venv) python -m Flask --version
* (venv) pip install Flask-WTF


Acivate venv and execute
========================

* cd <path_to_project>
* source venv/bin/activate
* (venv) export FLASK_APP=<path_to_project>/<start_application_python_script>   (eg. export FLASK_APP=~/jquery-demos/jquery-demos.py)
* (venv) flask run

Deactivate venv
===============

* deactivate


