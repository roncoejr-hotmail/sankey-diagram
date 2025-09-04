from flask import Flask, render_template, request
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
        t_array = raw_data[os.environ['field_id_2']]
    return t_array, 200

@app.route('/dataEp-sqlite', methods=['GET'])
def get_sql_data():
    t_level = request.args.get('level', 'beginner')
    connection = sqlite3.connect("{}/{}.db".format(os.environ['data_dir'], os.environ['data_file']))
    cursor = connection.cursor()
    cursor.execute("SELECT {}, {} FROM {} WHERE {} = '{}'".format( \
            os.environ['field_id_1'], \
            os.environ['field_id_2'], \
            os.environ['table_name'], \
            os.environ['field_id_1'], \
            t_level))
    rows = cursor.fetchall()


    if len(rows) > 0:
        raw_data = '{'
        raw_data += '\"{}\":'.format(os.environ['field_id_1'])
        raw_data += '{'
        raw_data += '\"{}\": ['.format(os.environ['field_id_2'])
        for row in rows:
            raw_data += ''.join(row[1]) + ","

        raw_data = raw_data[:-1]
        raw_data += "]}"
        raw_data += "}"
        print("*|*|**|*|**| {}: {}".format(t_level, raw_data))
        t_array = json.loads(raw_data)['{}'.format(os.environ['m_field_id'])]['{}'.format(os.environ['field_id_2'])]

        return t_array, 200
    else:
        print("*******| {}:".format(t_level))
        return json.loads('{"recordSet": [["", "", 0.0]]}'), 200

if __name__ == "__main__":
    app.run(debug=True)
