import scrollama from 'scrollama';
import 'intersection-observer';
import fold from './code-folding';

const scroller = scrollama();

const $section = d3.select('.steps');
const $svg = $section.select('.pocket svg');
const $steps = $section.selectAll('.step');
const allJS = d3.select('pre .language-javascript');

const context = d3.path();
const height = 300;
const paddingLeft = 130;
const paddingTop = 48;
const scale = d3
  .scaleLinear()
  .domain([0, 18.4])
  .range([0, height]);

const testData = {
  maxHeight: 15.5,
  minHeight: 7.5,
  maxWidth: 14,
  minWidth: 11,
};

function handleResize() {
  // 1. update height of step elements
  const stepH = Math.floor(window.innerHeight * 0.75);

  $steps.style('height', `${stepH}px`);

  scroller.resize();
}

function handleStepEnter(response) {
  const { index } = response;
  console.log(index);

  if (index === 0) {
    $svg.classed('pocket-bg', false);
    $svg
      .selectAll('.path__pocket-bg')
      .transition()
      .duration(300)
      .attr('transform', `translate(0, 0)`);

    fold.highlight(0, 0);
    fold.expandFunction(32, 46);
    fold.hide(47, 48);
  }
  if (index === 1) {
    $svg.classed('pocket-bg', true);
  }
  if (index === 2) {
    $svg.classed('pocket-bg', true);
    $svg
      .selectAll('.path__pocket-bg')
      .transition()
      .duration(300)
      .attr('transform', `translate(${paddingLeft}, ${paddingTop})`);

    fold.highlight(47, 48);
  }
  if (index === 3) {
    $svg.classed('pocket-bg', true);
    $svg.selectAll('.path__pocket').attr('d', d => drawShape(d, index));
  }
}

function setupScroll() {
  scroller
    .setup({
      step: '.scroll-text-intro .step',
      offset: 0.7,
      debug: true,
    })
    .onStepEnter(handleStepEnter);
}

function drawShape(d, step) {
  context.moveTo(0, 0);

  if (step === 3) {
    // straight line down to max height
    context.lineTo(0, scale(d.maxHeight));
  }
  if (step === 4) {
    // straight line down to max height
    context.lineTo(0, scale(d.maxHeight));
    // eventual curve
    context.lineTo(scale(d.maxWidth), scale(d.minHeight));
  }
  // // straight line down to max height
  // context.lineTo(0, scale(d.maxHeight));
  // // eventual curve
  // // context.lineTo(scale(d.maxWidth), scale(d.minHeight));
  // context.quadraticCurveTo(
  //   scale(d.maxWidth / 2),
  //   scale(d.maxHeight + 2),
  //   scale(d.maxWidth),
  //   scale(d.minHeight)
  // );
  // // straight line up
  // context.lineTo(scale(d.maxWidth), scale(d.minHeight - d.rivetHeight));
  // context.quadraticCurveTo(
  //   scale((d.maxWidth - d.minWidth) * 1.5),
  //   scale(d.rivetHeight),
  //   scale(d.maxWidth - d.minWidth),
  //   0
  // );
  // context.closePath();

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
        // .attr('transform', `translate(${padding}, 0)`)
        .attr('marker-end', 'url(#pencil)')
    );
}

function resize() {
  handleResize();
}

function init() {
  return new Promise((resolve, reject) => {
    setup();
    setupScroll();
    resize();
  });
}

export default { init, resize };
