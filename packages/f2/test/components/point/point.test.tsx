import { jsx } from '../../../src';
import { Polar, Rect } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Point } from '../../../src/components';
import { createContext } from '../../util';

const url = 'https://gw.alipayobjects.com/os/antfincdn/6HodecuhvM/scatter.json';
const url2 = 'https://gw.alipayobjects.com/os/antfincdn/aN68ysvGFa/index.json';

describe('Point Chart', () => {
  it('基础点图', async () => {
    const res = await fetch(url);
    const data = await res.json();

    const context = createContext('基础点图');
    const chartRef = { current: null };
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'rect',
          }}
          scale={{}}
        >
          <Point x="height" y="weight" color="gender" size="weight" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('基础点图 - 极坐标', async () => {
    const res = await fetch(url);
    const data = await res.json();

    const context = createContext('基础点图 - 极坐标');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
          }}
          scale={{}}
        >
          <Point x="height" y="weight" color="gender" size="weight" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('气泡图 - 配置size入参', async () => {
    const res = await fetch(url2);
    const data = await res.json();
    const context = createContext('气泡图 - 配置size入参');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'rect',
          }}
          scale={{}}
        >
          <Point
            x="x"
            y="y"
            color="name"
            size={{
              field: 'z',
              range: [10, 20, 30, 40],
            }}
          />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
});
