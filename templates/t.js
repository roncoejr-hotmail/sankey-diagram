//
//
//
// Draw Sankey Diagram using Google's Javascript charting library
//
//
//
function t_go() {
				  google.charts.load('current', {'packages':['sankey']});
				  google.charts.setOnLoadCallback(drawChart);

				  async function get_data(level = "beginner") {
					 await fetch(`http://127.0.0.1:5000/dataEp-sqlite?level=${level}`)
						.then(response => {
						    if(!response.ok) {
							   throw new Error(`An error occurred: ${response.status}`);
						    }
						    return response.text()
						})
						.then(data => {
							var o_data = new google.visualization.DataTable();
							o_data.addColumn('string', 'From');
							o_data.addColumn('string', 'To');
							o_data.addColumn('number', 'Weight');

						    o_data.addRows(JSON.parse(data));
							// Sets chart options.
							var options = {
							  width: 900,
							};

							// Instantiates and draws our chart, passing in some options.
							var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
							chart.draw(o_data, options);
							    // console.log(o_data);
						    })
						    .catch(error => {
							   console.error(`Problem occurred. ${error}`);
						});

				  }

				  function drawChart() {
						  var data = new google.visualization.DataTable();
						  data.addColumn('string', 'From');
						  data.addColumn('string', 'To');
						  data.addColumn('number', 'Weight');

						  const url = new URL(window.location.href);
						  const params = new URLSearchParams(url.search);
						  const level = params.get('level');
						  // data.addRows(response.text());
					 a_data = ""
					 if(!(level == null)) {
						  console.log(level)
						  the_data = get_data(level);
					 }
					 else {
						the_data = get_data();
					 }
					 if (typeof the_data === "string") {
						// a_data = JSON.parse(the_data)
						// a_data = Array.from(the_data)
						console.log("********it is a string")
					 }
					 else {
						// a_data = Array.from(the_data)
						console.log(the_data)
						console.log(`********it is NOT a string: ${typeof the_data}`)
					 }
						  // data.addRows(a_data);
						  // data.addRows(the_data);
				  }
}



//
//
//
// Draw Sankey Diagram using Plotly's Javascript library
//
//
//
function u_go() {
	   var data = {
		type: "sankey",
		orientation: "h",
		node: {
		  pad: 15,
		  thickness: 30,
		  line: {
		    color: "black",
		    width: 0.5
		  },
		 label: ["A1", "A2", "B1", "B2", "C1", "C2"],
		 color: ["blue", "red", "green", "yellow", "pink", "blue"]
		    },

		link: {
		  source: [0,1,0,2,3,3],
		  target: [2,3,3,4,4,5],
		  value:  [8,4,2,8,4,2]
		}
	   }

	   var data = [data]

	   var layout = {
		title: {
		  text: "Basic Sankey"
		},
		font: {
		  size: 10
		}


    }

	   Plotly.react('sankey_basic', data, layout)
	   // Plotly.react(document.getElementById('sankey_basic'), data, layout)


}



//
//
//
// Draw Sankey Diagram using Plotly's Javascript library
//
//
//
function w_go(labels, colors, values) {
	   link_targets = Object.keys(labels);
	   link_sources = [];
    for (i = 0; i < link_targets.length; i++) {
	   link_sources.push(0);

    }
	   console.log(link_targets);
	   var data = {
		type: "sankey",
		orientation: "h",
		node: {
		  pad: 15,
		  thickness: 30,
		  line: {
		    color: "black",
		    width: 0.5
		  },
		 label: labels,
		 color: colors
		    },

		link: {
		  source: link_sources,
		  target: link_targets.slice(1,link_targets.length),
		  value: values 
		}
	   }

	   var data = [data]

	   var layout = {
		title: {
		  text: "The Money Flow Illustrated"
		},
		  width: 1024,
		  height: 768,
		font: {
		  size: 10
		}


    }

    Plotly.react('sankey_basic', data, layout)
    // Plotly.react(document.getElementById('sankey_basic'), data, layout)


}


//
//
//
//
//
//
async function v_go() {
				    const url = new URL(window.location.href);
				    const params = new URLSearchParams(url.search);
				    const level = params.get('level');

				    await fetch(`http://127.0.0.1:5000/dataEp-sqlite?level=${level}`)
						.then(response => {
						    if(!response.ok) {
							   throw new Error(`An error occurred: ${response.status}`);
						    }
						    return response.text()
						})
						.then(data => {
							// Sets chart options.
						    df = new dfd.DataFrame(JSON.parse(data));
						    df.rename({"0": "source", "1": "target", "2": "value"}, { inplace: true });
						    arr_u = df['source'].unique();
						    const lst_source = arr_u.values;

						    const t_source = arr_u.values;
						    const t_target = df['target'].unique().values;
						    const t_values = df['value'].values;

						    const labels = Array.prototype.concat(t_source, t_target);
						    colors = ["red", "green", "blue", "yellow", "pink", "purple", "cyan", "magenta", "black", "white", "darkblue", "lightblue", "darkgreen", "darkred"];
						  
						    w_go(labels, colors, t_values);



						 })
						.catch(error => {
							 console.log(`A problem occurred. ${error}`);
						});
}
