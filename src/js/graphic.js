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
const paddingLeft = 100;
const paddingTop = 35;
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

function handleResize() {
  // 1. update height of step elements
  const stepH = Math.floor(window.innerHeight * 0.75);

  $steps.style('height', `${stepH}px`);

  scroller.resize();
}

function handleStepEnter(response) {
  const { index } = response;

  if (index === 0) {
    $svg.style('background-image', `none`);
    $svg
      .selectAll('.path__pocket-bg')
      .transition()
      .duration(300)
      .attr('transform', `translate(0, 0)`);
    fold.hide(47, 48);
    fold.highlight(0, 0);
  }
  if (index === 1) {
    $svg.style('background-image', `url(assets/images/pocket.JPG)`);
    $svg
      .selectAll('.path__pocket-bg')
      .transition()
      .duration(300)
      .attr('transform', `translate(${paddingLeft}, ${paddingTop})`);

    fold.highlight(47, 48);
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

function drawShape(d) {
  context.moveTo(0, 0);
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
