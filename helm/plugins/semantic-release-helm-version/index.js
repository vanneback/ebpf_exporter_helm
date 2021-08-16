const prepareChart = require('./lib/prepare');

let prepared = false;

async function prepare(pluginConfig, context) {
    if (!verified) {
        await verifyChart(pluginConfig, context);
    }

    await prepareChart(pluginConfig, context);
    prepared = true;
}

module.exports = {prepare};
