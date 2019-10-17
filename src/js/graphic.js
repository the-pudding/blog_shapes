const $section = d3.select('.test');
const $svg = $section.select('svg');

const context = d3.path();
const height = 300;
const padding = 100;
const scale = d3
  .scaleLinear()
  .domain([0, 29])
  .range([0, height]);

const testData = {
  maxHeight: 14.5,
  minHeight: 14,
  rivetHeight: 6.5,
  maxWidth: 16.5,
  minWidth: 13,
};

function drawShape(d) {
  context.moveTo(0, 0);
  // straight line down to max height
  context.lineTo(0, scale(d.maxHeight));
  // eventual curve
  // context.lineTo(scale(d.maxWidth), scale(d.minHeight));
  context.quadraticCurveTo(
    scale(d.maxWidth / 2),
    scale(d.maxHeight + 2),
    scale(d.maxWidth),
    scale(d.minHeight)
  );
  // straight line up
  context.lineTo(scale(d.maxWidth), scale(d.minHeight - d.rivetHeight));
  context.quadraticCurveTo(
    scale((d.maxWidth - d.minWidth) * 1.5),
    scale(d.rivetHeight),
    scale(d.maxWidth - d.minWidth),
    0
  );
  context.closePath();

  return context.toString();
}

function setup() {
  $svg
    .selectAll('.path__pocket-bg')
    .data([testData])
    .join(enter =>
      enter
        .append('path')
        .attr('class', 'path__pocket path__pocket-bg')
        .attr('d', drawShape)
        .attr('transform', `translate(${padding}, 0)`)
    );
}

function resize() {}

function init() {
  setup();
}

export default { init, resize };
