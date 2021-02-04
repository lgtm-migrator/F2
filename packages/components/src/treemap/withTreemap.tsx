import { jsx } from '@ali/f2-jsx';
import Component from '../component';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';

export default View => {
  return class Treemap extends Component {
    treemapLayout() {
      const { chart, props, layout } = this;
      const data = chart.get('data');
      const { width, height } = layout;
      const { xField, yField, space = 0 } = props;
      // const { space } = chart;
  
      const root = hierarchy({ children: data })
        .sum(function(d) { return d[yField]; })
        .sort((a, b) => b[yField] - a[yField]);
  
      const treemapLayout = treemap()
        // 默认treemapSquarify
        .tile(treemapBinary)
        .size([width, height])
        .round(false)
        // .padding(space)
        .paddingInner(space)
        // .paddingOuter(options.paddingOuter)
        // .paddingTop(options.paddingTop)
        // .paddingRight(options.paddingRight)
        // .paddingBottom(options.paddingBottom)
        // .paddingLeft(options.paddingLeft);
      const nodes = treemapLayout(root);
  
      return nodes.children.map(item => {
        const { data, x0, y0, x1, y1 } = item;
        return {
          data,
          x0,
          y0,
          x1,
          y1,
        }
      });
    }

    mount() {
      const { chart } = this;
      chart.polygon().position('_*_');
    }

    render() {
      const nodes = this.treemapLayout();
      const { props } = this;
      return <View
        nodes={ nodes }
        { ...props }
      />;
    }
  }
}
