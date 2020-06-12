forked from https://github.com/Billiballa/grafana-echarts

# Grafana Apache Echarts Panel

- Using Apache Echarts to draw graphes in Grafana.
- Coding in React to suppport new Grafana version
- Code Editor for drawing echarts with echarts `option`
- Themes support for visualization

## How Use

1. Parsing queried data from Grafana data source to echart format `series`
2. Prepare echart `option` and embed `series` from step 1
3. Adjust theme or text color for specific visualization needs

## Further development

1. Prepare envirnment

In plugin folder, install dependencies and turn on dev mode

```BASH
yarn install
yarn dev
```

3. Build plugin in production mode

```BASH
yarn build
```

## Reference

Grafana Documentation

- [Grafana developer guide](https://grafana.com/docs/grafana/latest/developers/plugins/)
- [Grafana UI Library(storybook)](https://developers.grafana.com/ui/latest/index.html?path=/story/docs-overview-intro--page)

Echarts Documentation

- [Echarts document](https://echarts.apache.org/en/option.html)
- [Echarts examples](https://echarts.apache.org/examples/en/index.html)
- [Echarts theme builder](https://echarts.apache.org/en/download-theme.html)

Github Repos

- [Grafana simple-react-panel](https://github.com/grafana/simple-react-panel)
- [Grafana Echarts](https://developers.grafana.com/ui/latest/index.html?path=/story/docs-overview-intro--page) -> most helpful
