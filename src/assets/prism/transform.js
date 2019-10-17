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
        )
        // move our "pencil"
        .attr('transform', 'translate(200, 300)')
}