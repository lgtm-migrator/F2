import data from './data.json';

const F2 = require('../../../../src/index');

const onStartCallback = jest.fn();

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

const chart = new F2.Chart({
  el: canvas,
  pixelRatio: window.devicePixelRatio
});

chart.source(data, {
  reportDate: {
    type: 'timeCat',
    tickCount: 3,
    range: [ 0, 1 ],
    mask: 'YYYY-MM-DD'
  },
  rate: {
    tickCount: 5
  }
});

chart.line()
  .position('reportDate*rate')
  .color('name');

chart.interaction('pinch', {
  onStart: onStartCallback
});
chart.interaction('pan');
chart.render();

describe('Interaction', () => {
  it('pinch', () => {
    // const interactionContext = chart.get('interactionContext');
    // interactionContext.start();
    // interactionContext.doZoom(0.5, 0.5, 1.5);

    chart.get('canvas').emit('pinchstart', {});
    expect(onStartCallback.mock.calls.length).toBe(1);
  });

  it('pan', () => {
    const interactionContext = chart.get('interactionContext');
    interactionContext.start();
    interactionContext.doMove(0.1);
  });
});