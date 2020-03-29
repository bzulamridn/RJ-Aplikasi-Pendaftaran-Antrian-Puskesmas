import React from 'react';
import logo from './logo.svg';
import './App.css';


// encoding is optional

function App() {

  

  return (
    <div>
      <div className="row">
        <div className="col-lg-6" >

          <div className="container">
            <div className="row">
              <div className="col-md-4 col-xl-3">
                <div className="card bg-c-blue order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>486</span></h2>
                    <hr></hr>
                    <h6 className="text-center">Total Antrian</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-3">
                <div className="card bg-c-green order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>486</span></h2>
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
                    <h2 className="text-center"><span>486</span></h2>
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
                  <button className="btn btn-success simpan" style={{ width: '100%', height: 100 }}><i className='fa fa-microphone fa-2x'></i><span style={{ fontSize: 30, fontWeight: 'bold' }}> Panggil</span></button>
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
                <div className="col-lg-12 text-center">
                  <div className="id-card">

                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="row text-center" style={{ marginTop: 20 }}>
                <div className="col-lg-2 text-center">
                  <div className="btn-group-toggle " data-toggle="buttons">
                    <label className="btn btn-success circle text-center" style={{ alignItems: 'center', justifyContent: 'center', padding: 35 }}>
                      <input type="checkbox" checked autocomplete="off" /> GIGI
                    </label>
                  </div>
                </div>
                <div className="col-lg-2 text-center">
                  <div className="btn-group-toggle " data-toggle="buttons">
                    <label className="btn btn-success circle" style={{ alignItems: 'center', justifyContent: 'center', padding: 35 }}>
                      <input type="checkbox" checked autocomplete="off" /> GIGI
                    </label>
                  </div>
                </div>
                <div className="col-lg-2 text-center">
                  <div className="btn-group-toggle " data-toggle="buttons">
                    <label className="btn btn-success circle" style={{ alignItems: 'center', justifyContent: 'center', padding: 35 }}>
                      <input type="checkbox" checked autocomplete="off" /> KIA
                    </label>
                  </div>
                </div>
                <div className="col-lg-2 text-center">
                  <div className="btn-group-toggle " data-toggle="buttons">
                    <label className="btn btn-success circle" style={{ alignItems: 'center', justifyContent: 'center', padding: 35 }}>
                      <input type="checkbox" checked autocomplete="off" /> GIZI
                    </label>
                  </div>
                </div>
                <div className="col-lg-2 text-center">
                  <div className="btn-group-toggle " data-toggle="buttons">
                    <label className="btn btn-success circle" style={{ alignItems: 'center', justifyContent: 'center', padding: 35 }}>
                      <input type="checkbox" checked autocomplete="off" /> THT
                    </label>
                  </div>
                </div>
                <div className="col-lg-2 text-center">
                  <div className="btn-group-toggle " data-toggle="buttons">
                    <label className="btn btn-success circle" style={{ alignItems: 'center', justifyContent: 'center', padding: 35 }}>
                      <input type="checkbox" checked autocomplete="off" /> MATA
                    </label>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="row text-center" style={{ marginTop: 20 }}>
                <div className="col-lg-12 text-center">
                  <button className="btn btn-primary simpan" >Simpan dan Cetak Antrian</button>
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
