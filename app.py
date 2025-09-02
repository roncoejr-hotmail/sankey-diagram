from flask import Flask, render_template
from flask_cors import CORS
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

if __name__ == "__main__":
    app.run(debug=True)
