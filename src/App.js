import React, { useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import JSONPretty from 'react-json-prettify';
import exportFromJSON from 'export-from-json';
import ReactFileReader from 'react-file-reader';

function App() {
  const [namaDB, setNamaDB] = useState('');
  const [data, setData] = useState({});
  const [namaDBBaru, setNamaDBBaru] = useState('');
  const [dataBaru, setDataBaru] = useState({});

  const getData = kunci => {
    const newData = reactLocalStorage.getObject(kunci);
    setData(newData);
  };
  const saveData = (kunci, value) => reactLocalStorage.setObject(kunci, value);

  const handleNamaDB = evt => setNamaDB(evt.target.value);
  const handleGetData = () => getData(namaDB);
  const handleSimpanDB = () => {
    saveData(namaDBBaru, dataBaru);
    setNamaDBBaru('');
    setDataBaru({});
  };

  const handleDownload = () => {
    const fileName = namaDB;
    const exportType = 'json';
    exportFromJSON({ data, fileName, exportType });
  };

  const handleFileUpload = files => {
    const data = files.fileList[0];
    const reader = new FileReader();
    reader.onload = async e => {
      const text = e.target.result;
      const json = JSON.parse(text);
      setDataBaru(json);
    };
    reader.readAsText(data);
  };

  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center' }}>Upload Data</h1>
        <ReactFileReader
          handleFiles={handleFileUpload}
          multipleFiles={false}
          base64={true}
          fileTypes={['json']}
        >
          <button>Upload JSON Data</button>
        </ReactFileReader>
        {dataBaru.length && (
          <React.Fragment>
            <div>
              <input
                placeholder="namaDB"
                value={namaDBBaru}
                onChange={e => setNamaDBBaru(e.target.value)}
              />
              <button onClick={handleSimpanDB}>Simpan</button>
            </div>
          </React.Fragment>
        )}
        <JSONPretty json={dataBaru} />
      </div>

      <div>
        <h1 style={{ textAlign: 'center' }}>
          Tampilkan Data JSON dari {namaDB}
        </h1>
        <input value={namaDB} onChange={handleNamaDB} />
        <button onClick={handleGetData} style={{ marginRight: '20px' }}>
          ambil data
        </button>
        <button onClick={handleDownload}>Download data JSON</button>
        <JSONPretty json={data} />
      </div>
    </div>
  );
}

export default App;
