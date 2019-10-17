// select your svg
const svg = d3.select('.pocket__svg');

// define your data (alternatively, this could be
// imported from csv or json)
const data = {
    maxHeight: 14.5,
    minHeight: 7.5,
    maxWidth: 16.5,
    minWidth: 13,
};

// we'll draw our path using d3.path()
const context = d3.path()

// define any dimensions
const height = 300; // height of the svg

// define a scale to adjust our actual
// pocket measurements to pixels
const scale = d3
    .scaleLinear()
    .domain([0, 16.5])
    .range([0, height]);

// write a function that will EVENTUALLY
// create a pocket shape
function drawShape(d) {
    return context.toString();
}

// write a function that will run to create your shape
function setup() {
    svg
        // follow d3's enter/update/exit pattern
        .selectAll('.path__pocket')
        .data([data]) // use our data
        .join(enter =>
            // using d3.v5's .join
            enter
                // append a path element to your SVG
                .append('path')
                // give that path element a class
                .attr('class', 'path__pocket')
                // generate 'd' (path shape) using drawShape()
                .attr('d', drawShape)
        );
}

// run the setup function
setup();
