import Papa from "papaparse";

const provinces = ["AB", "BC", "MB", "NB", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"]

async function fetchCsv(province) {
    const response = await fetch(`data/${province}.csv`);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value);
    return csv;
}

export async function getData(provinces, month, year) {
    var filteredData = await Promise.all(provinces.map(async province => {
        const response = Papa.parse(await fetchCsv(province.value), {
            header: true,
        });
    
        return response.data.filter(row => (row.Year == year && row.Month >= month) || (row.Month < month && row.Year == (year + 1)));
    }));

    return filteredData;
}

export async function getOverviewData(month, year) {
    var filteredData = await Promise.all(provinces.map(async province => {
        const response = Papa.parse(await fetchCsv(province), {
            header: true,
        });
    
        return response.data.filter(row => (row.Year == year && row.Month == month));
    }));

    return filteredData;
}