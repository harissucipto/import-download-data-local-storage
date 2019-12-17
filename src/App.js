import React, { useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import JSONPretty from 'react-json-prettify';
import exportFromJSON from 'export-from-json';
import ReactFileReader from 'react-file-reader';

import Header from './components/Header';

function App() {
  const [tampil, setTampil] = useState(0);
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
    //
    setTampil(0);
    setNamaDB(namaDBBaru);
    getData(namaDBBaru);
    //
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
      <Header tampil={tampil} setTampil={setTampil} />
      <hr style={{ marginBottom: '20px' }} />
      {tampil === 1 && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <ReactFileReader
              handleFiles={handleFileUpload}
              multipleFiles={false}
              base64={true}
              fileTypes={['json']}
            >
              <button>Upload JSON Data</button>
            </ReactFileReader>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '30px',
              marginTop: '40px'
            }}
          >
            {dataBaru.length && (
              <React.Fragment>
                <div>
                  <input
                    placeholder="document name"
                    value={namaDBBaru}
                    onChange={e => setNamaDBBaru(e.target.value)}
                  />
                  <button onClick={handleSimpanDB}>upsert data</button>
                </div>
              </React.Fragment>
            )}
          </div>

          <JSONPretty json={dataBaru} />
        </div>
      )}
      {tampil === 0 && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <input
              value={namaDB}
              onChange={handleNamaDB}
              placeholder="document name"
            />
            <button onClick={handleGetData} style={{ marginRight: '20px' }}>
              Read Data
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '30px',
              marginTop: '40px'
            }}
          >
            <button onClick={handleDownload}>Download data JSON</button>
          </div>

          <JSONPretty json={data} />
        </div>
      )}
    </div>
  );
}

export default App;
