const axios = require('axios').default
const fs = require('fs')
const path = require('path')

const transformFeature = (feature) => {
    for (key in feature.properties) {
        if (feature.properties[key] == "TRUE") feature.properties[key] = true;
        else if (feature.properties[key] == "FALSE") feature.properties[key] = false;
    }

    return {
        ...feature.properties,
        coordinates: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
    }
}

axios('https://cycling.data.tfl.gov.uk/CyclingInfrastructure/data/points/cycle_parking.json').then(res => {
    /** @type {{
     *   type: string,
     *   geometry: { type: string, coordinates: [number, number] },
     *   properties: { FEATURE_ID: string, [keys]: string }
     * }[]} */
    const features = res.data.features;
    for (let i = 0; i < features.length; i++) {
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'features', features[i].properties.FEATURE_ID.slice(3) + '.json'), JSON.stringify(transformFeature(features[i])))
    }

    fs.writeFileSync(path.join(__dirname, '..', 'data', 'incprivate.json'), JSON.stringify(features.map(feature => [ feature.geometry.coordinates[1].toFixed(5), feature.geometry.coordinates[0].toFixed(5), feature.properties.FEATURE_ID.slice(3) ])));

    const publicFeaturesJSON = JSON.stringify(features.filter(feature => !(feature.properties.PRK_SECURE || feature.properties.PRK_LOCKER || feature.properties.PRK_HANGAR)).map(feature => [ feature.geometry.coordinates[1].toFixed(5), feature.geometry.coordinates[0].toFixed(5), feature.properties.FEATURE_ID.slice(3) ]));
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'features.js'), 'F=' + publicFeaturesJSON);
})