import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function downloadCSV(data) {
    console.log(data)
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

export function downloadEXCEL(data) {
  console.log(data)
  if(data.length != 0){

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob_ = new Blob([excelBuffer], { type: 'application/octet-stream' });
  const downloadLink_ = document.createElement('a');
  downloadLink_.href = window.URL.createObjectURL(blob_);
  downloadLink_.setAttribute('download', 'Excel_Data.xlsx');
  downloadLink_.click();
  }
}

export function downloadPDF(data) {
  console.log(data)
  if(data.length != 0){

  const doc = new jsPDF();
  const columns = Object.keys(data[0]);
  const rows = data.map(obj => columns.map(col => obj[col]));
  doc.autoTable({
      head: [columns],
      body: rows
  });
  doc.save('PDF_Data.pdf');
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
