import Papa from "papaparse";

const provinces = ["AB", "BC", "CA", "MB", "NB", "NF", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"]

async function fetchCsv(province) {
    const response = await fetch(`data/${province}.csv`);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value);
    return csv;
}

export async function getData(province, month, year) {
    console.log(year.toString(), month.toString())
    const response = Papa.parse(await fetchCsv(province), {
        header: true,
    });

    const filteredData = response.data.filter(row => (row.Year == year && row.Month >= month) || (row.Month < month && row.Year == (year + 1)));

    return filteredData;
}
