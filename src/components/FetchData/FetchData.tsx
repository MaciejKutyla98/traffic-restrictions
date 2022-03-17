export const FetchData = () => {
    const url = 'https://cors-anywhere.herokuapp.com/\n' +
        'https://www.archiwum.gddkia.gov.pl/dane/zima_html/utrdane.xml'
    const fetchData = () => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xml'
            }
        })
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                console.log(xml);
            })
            .catch(console.error);
    }


    fetchData()
    return (
        <div></div>
    );
}

export const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [19.252482, 52.065162]
            },
            properties: {
                title: 'Mapbox',
                description: 'Piątek Poland'
            }
        }
    ]
};