export default function downloadCSV(data) {
    if(data.length != 0){
    function convertJSONToCSV() {
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
        return header + '\n' + rows;
    }
    const csv = convertJSONToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download','CSV_Data.csv');
    downloadLink.click();
    }
}
export function searchFun(query, SetData) {
    const searchTerm = query.toLowerCase();
    const results = SetData.filter(item => {
      return Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm) ||
        typeof value === 'number' && value.toString().includes(searchTerm)
      );
    });
    return results;
  }
