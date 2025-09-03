from flask import Flask, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import sqlite3
import json
import re
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

@app.route('/')
def show_sankey_chart():
    # return 'Sankey would be here'
    return render_template('sankey-diag.html')

@app.route('/dataEp')
def get_json_data():
    with open('{}/{}-v1.json'.format(os.environ['data_dir'], os.environ['data_file']), 'r') as f:
        raw_data = json.load(f)
        t_array = raw_data['recordSet']
    return t_array, 200

@app.route('/dataEp-sqlite')
def get_sql_data():
    connection = sqlite3.connect("{}/{}.db".format(os.environ['data_dir'], os.environ['data_file']))
    cursor = connection.cursor()
    cursor.execute("SELECT {} FROM diag_data".format(os.environ['field_id']))
    rows = cursor.fetchall()
    raw_data = '{'
    raw_data += '\"{}\": ['.format(os.environ['field_id'])
    for row in rows:
        raw_data += ''.join(row[0]) + ","

    raw_data = raw_data[:-1]
    raw_data += "]}"
    print("{}".format(raw_data))
    t_array = json.loads(raw_data)['{}'.format(os.environ['field_id'])]

    return t_array, 200

if __name__ == "__main__":
    app.run(debug=True)
