const fsPromises = require('fs').promises;
const path = require('path');
const pkginfo = require('pkginfo');
const yaml = require('js-yaml');

module.exports = async (pluginConfig, context) => {
    const version = pkginfo(pluginConfig.packagePath).version;
    const filePath = path.join(pluginConfig.chartPath, 'Chart.yaml');
    const chartYaml = await fsPromises.readFile(filePath);
    const oldChart = yaml.load(chartYaml);

    const newChart = { ...oldChart };
    newChart[pluginConfig.versionProperty] = version;

    await fsPromises.writeFile(filePath, yaml.dumps(newChart));
};
