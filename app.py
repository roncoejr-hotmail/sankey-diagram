from flask import Flask, render_template
from flask_cors import CORS
import sqlite3
import json
import re

app = Flask(__name__)
CORS(app)

@app.route('/')
def show_sankey_chart():
    # return 'Sankey would be here'
    return render_template('sankey-diag.html')

@app.route('/dataEp')
def get_json_data():
    with open('data/data-v1.json', 'r') as f:
        raw_data = json.load(f)
        # raw_data = f.read().strip()
        t_array = raw_data['recordSet']
        # t_array = re.sub(r'"', "'", t_string)
        # t_array = raw_data
    # print("{}".format(t_array))
    return t_array, 200

@app.route('/dataEp-sqlite')
def get_sql_data():
    connection = sqlite3.connect("data/data.db")
    cursor = connection.cursor()
    cursor.execute("SELECT recordSet FROM diag_data")
    rows = cursor.fetchall()
    raw_data = "{\"recordSet\": ["
    for row in rows:
        raw_data += ''.join(row[0]) + ","

    raw_data = raw_data[:-1]
    raw_data += "]}"
    print("{}".format(raw_data))
    t_array = json.loads(raw_data)['recordSet']

    return t_array, 200

if __name__ == "__main__":
    app.run(debug=True)
