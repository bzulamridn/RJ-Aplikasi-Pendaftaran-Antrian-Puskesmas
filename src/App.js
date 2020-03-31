import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


// encoding is optional

function App() {

  const [total, setTotal] = useState('0');
  const [dipanggil, setDipanggil] = useState('0');
  const [sisa, setSisa] = useState('0');
  const [poli, setPoli] = useState([]);



  useEffect(() => {
    onload();
  }, [])

  async function onload() {
    await axios.get('http://localhost/api/indexpendaftaran')
      .then(res => {
        setPoli(res.data.poli)
      })
  }

  function panggil() {
    axios.get('http://localhost/api/panggil')
      .then(res => {
        if (res.data.status === '1') {
          setDipanggil(res.data.dipanggil);
          setSisa(res.data.sisa);
          setTotal(parseInt(dipanggil + sisa))
          console.log(res.data)
        } else {
          alert("Antrian Habis")
        }
      })
  }

  function print() {
    const open = window.open("http://localhost/printpos/print.php", '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    setTimeout(() => { open.close() }, 5000);
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-6" >

          <div className="container">
            <div className="row">
              <div className="col-md-4 col-xl-3">
                <div className="card bg-c-blue order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>{total}</span></h2>
                    <hr></hr>
                    <h6 className="text-center">Total Antrian</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-3">
                <div className="card bg-c-green order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>{dipanggil}</span></h2>
                    <hr></hr>
                    <h6 className="text-center">Antrian Dipanggil</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-3">
                <div className="card bg-c-yellow order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>486</span></h2>
                    <hr></hr>
                    <h6 className="text-center">Antian Online</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-3">
                <div className="card bg-c-pink order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>{sisa}</span></h2>
                    <hr></hr>
                    <h6 className="text-center">Antrian Tersisa</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">

            </div>
          </div>

        </div>
        <div className="col-lg-6">
          <div className="card bg-gr order-card">
            <div className="card-block">
              <div className="row">
                <div className="col-lg-6">
                  <button className="btn btn-success simpan" onClick={() => panggil()} style={{ width: '100%', height: 100 }}><i className='fa fa-microphone fa-2x'></i><span style={{ fontSize: 30, fontWeight: 'bold' }}> Panggil</span></button>
                </div>
                <div className="col-lg-6">
                  <button className="btn btn-danger simpan" style={{ width: '100%', height: 100 }}><i className='fa fa-refresh fa-lg'></i><span style={{ fontSize: 30, fontWeight: 'bold' }}> Ulang</span></button>
                </div>
              </div>
              <hr></hr>
              <div className="row" style={{ marginTop: 20 }}>
                <div className="col-lg-10">
                  <input type="text" className="form-control" placeholder="Nomor Rekam Medis Pasien" />
                </div>
                <div className="col-lg-2">
                  <button className="btn btn-info" style={{ width: '100%' }}> Cari</button>
                </div>
              </div>
              <hr></hr>
              <div className="row text-center" style={{ marginTop: 20 }}>
                <div className="col-lg-8 text-center">
                  <div className="id-card">

                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="row text-center" style={{ marginTop: 20, justifyContent:'center' }}>
                
                <div className="btn-group btn-group-toggle" data-toggle="buttons" style={{ alignSelf:'center' }}>
                  {poli.map((data, index) =>
                    <label className="btn btn-success" style={{ padding:25, justifyContent:'center', alignItems:'center' }}>
                    <input type="radio" key={index} name="options" id="option1" autocomplete="off" /> {data.nama_pelayanan}
                  </label>
                  )}
                </div>
        
              </div>
              <hr></hr>
              <div className="row text-center" style={{ marginTop: 20 }}>
                <div className="col-lg-12 text-center">
                  <button className="btn btn-primary simpan" onClick={() => print()}>Simpan dan Cetak Antrian</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
