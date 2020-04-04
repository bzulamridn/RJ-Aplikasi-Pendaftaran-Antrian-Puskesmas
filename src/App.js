import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {

  const classes = useStyles();
  const [isLogin, setLogin] = useState(false);
  const [total, setTotal] = useState('0');
  const [dipanggil, setDipanggil] = useState('0');
  const [sisa, setSisa] = useState('0');
  const [poli, setPoli] = useState([]);
  const [skr, setSkr] = useState('Nomor Antrian');
  const [kode, setKode] = useState('');
  const [pasienlist, setPasienList] = useState([]);
  const [rm, setRm] = useState('');
  const [idantri, setIdantri] = useState('');
  const [rmfix, setRmfix] = useState('Nomor Rekam Medis');
  const [nama, setNama] = useState('Nama Lengkap');
  const [alamat, setAlamat] = useState('Alamat');
  const [umur, setUmur] = useState('Umur');
  const [tanggal, setTanggal] = useState(new Date());
  const [nik, setNik] = useState('')//nik
  const [oldrm, setOldrm] = useState('')//oldrm
  const [namapost, setNamapost] = useState('')//nama
  const [jk, setJk] = useState('')//jk
  const [tempatlahir, setTempatlahir] = useState('')//tempatlahir
  const [tanggallahir, setTanggallahir] = useState('')//tanggal lahir
  const [namakepalakeluarga, setNamakepalakeluarga] = useState('')//namakk
  const [statusdalamkeluarga, setStatusdalamkeluarga] = useState('')//status
  const [agama, setAgama] = useState('') //agama
  const [pekerjaan, setPekerjaan] = useState('')//pelerjaan
  const [alamatpost, setAlamatpost] = useState('')//alamat
  const [nohp, setNohp] = useState('')//nohp
  const [bpjs, setBpjs] = useState('');
  const [indekx, setIndex ] = useState('');
  const [kabkota, setKabkota] = useState('6101'); //sambas
  const [kodeFaskes, setKodeFaskes] = useState('610110003');


  useEffect(() => {
    onload();
  }, [])

  async function onload() {
    await axios.get('http://localhost/api/indexpendaftaran')
      .then(res => {
        setPoli(res.data.poli)
        console.log(res.data)
      })
    await datapasien();
  }

  function datapasien(){
    axios.get('http://localhost:3000/pasien')
      .then(res => {
        setPasienList(res.data)
        console.log(res.data)
      })
  }

  function panggil() {
    axios.get('http://localhost/api/panggil')
      .then(res => {
        if (res.data.status === '1') {
          if (res.data.dipanggil < 10) {
            setSkr('A00' + res.data.dipanggil)
          } else if (res.data.dipanggil > 9 && res.data.dipanggil < 100) {
            setSkr('A0' + res.data.dipanggil)
          } else {
            setSkr('A' + res.data.dipanggil)
          }

          setIdantri(res.data.data.kode_antrian)
          setDipanggil(res.data.dipanggil);
          setSisa(res.data.sisa);
          setTotal(parseInt(dipanggil + sisa))
          console.log(res.data)
        } else {
          alert("Antrian Habis")
        }
      })
  }

  function simpanPasien() {
    axios.post('http://localhost:3000/createpasien/', {
      nik: nik,
      bpjs : bpjs,
      old_rm: oldrm,
      nama: namapost,
      jenis_kelamin: jk,
      alamat: alamatpost,
      tempat_lahir: tempatlahir,
      tanggal_lahir: tanggal,
      no_hp: nohp,
      nama_kepala_keluarga: namakepalakeluarga,
      status: statusdalamkeluarga,
      agama: agama,
      pekerjaan: pekerjaan,
      kodefaskes : kodeFaskes,
      
    })
      .then(res => {
        console.log(res)
      })
  }

  // function YearMonthPicker({ handleChangeTo }) {
  //   setTanggal(val)
  // }


  async function substrRM() {
    let str = indekx;
    let batas = str.indexOf('-');
    let indexpasien = await indekx.substring(0, batas)
    cariPasien(indexpasien)
  }

  function cariPasien(val) {
    // axios.get('http://localhost/api/getpasienrm/' + val)
    //   .then(res => {
        setRmfix(pasienlist[val].rm)
        setNama(pasienlist[val].nama)
        setAlamat(pasienlist[val].alamat)
        setUmur("12")
      //})
  }
 
  function kodePrint(val) {
    setKode(val)
    console.log(val)
  }

  function simpanprint() {

    axios.get('http://localhost/api/antrianpoli/' + idantri + '/' + rmfix + '/' + kode)
      .then(res => {
        console.log(res)
        const open = window.open("http://localhost/printpos/print.php?nomor=" + res.data.antrian + "&rm=" + rmfix, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
        setTimeout(() => { open.close() }, 5000);
      })

  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-6" >
        <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title} >
                Tambah Data Pasien
                  </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <div className="container">

            <div className="row">
              <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="simple table" disableElevation>
                  <TableHead>
                   
                  </TableHead>
                  <TableBody>
                  <TableRow>
                      <TableCell><TextField label="Nomor Induk Kependudukan" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setNik(target.value)} /></TableCell>
                      <TableCell><TextField label="Nomor Rekam Medis Lama" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setOldrm(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell ><TextField label="Nama Lengkap" style={{ width: '100%' }} onChange={({ target }) => setNamapost(target.value)} /></TableCell>
                      <TableCell ><TextField label="Jenis Kelamin" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setJk(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><TextField label="Nomor BPJS" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setBpjs(target.value)} /></TableCell>
                      <TableCell><TextField label="Nomor Handphone" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setNohp(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><TextField label="Tempat Lahir" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setTempatlahir(target.value)} /></TableCell>
                      <TableCell>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            className="form-control"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Tanggal Lahir"
                            format="dd MMMM y"
                            maxDate={tanggal}
                            value={tanggal}
                            onChange={value => {
                              setTanggal(value);
                              //handleChangeTo(value);
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><TextField label="Nama Kepala Keluarga" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setNamakepalakeluarga(target.value)} /></TableCell>
                      <TableCell><TextField label="Status Dalam keluarga" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setStatusdalamkeluarga(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><TextField label="Agama" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setAgama(target.value)} /></TableCell>
                      <TableCell><TextField label="Pekerjaan" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setPekerjaan(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}><TextField label="Alamat" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setAlamatpost(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}> <Button variant="contained" color="primary" style={{ width: '100%', padding: 20 }} onClick={() => simpanPasien()}>Simpan Data Pasien</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

        </div>
        <div className="col-lg-6">
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title} >
                News
                  </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <div className="card" style={{ borderRadius: 0 }}>
            <div className="row" style={{ backgroundColor: '#ecf0f1', padding: 20, marginRight: 0,marginLeft: 0}}>
              <div className="col-md-3 ">
                <div className="card bg-c-blue order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>{total}</span></h2>
                    <hr></hr>
                    <h6 className="text-center">Total Antrian</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-c-green order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>{dipanggil}</span></h2>
                    <hr></hr>
                    <h6 className="text-center">Antrian Dipanggil</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="card bg-c-yellow order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>486</span></h2>
                    <hr></hr>
                    <h6 className="text-center">Antian Online</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-c-pink order-card">
                  <div className="card-block">
                    <h2 className="text-center"><span>{sisa}</span></h2>
                    <hr></hr>
                    <h6 className="text-center">Antrian Tersisa</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-block">


              <div className="row">
                <div className="col-lg-6">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ width: '100%', height: 80 }}
                    onClick={() => panggil()}
                    className={classes.button}
                  //startIcon={<SaveIcon />}
                  >
                    Panggil
                  </Button>
                </div>
                <div className="col-lg-6">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={{ width: '100%', height: 80 }}
                    onClick={() => panggil()}
                    className={classes.button}
                  //startIcon={<SaveIcon />}
                  >
                    Ulang
                  </Button>
                </div>
              </div>
              <hr></hr>
              <div className="row" style={{ marginTop: 20 }}>
                <div className="col-lg-9">
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={pasienlist.map((option, index) => +index+"- "+option.rm + " " + option.nama + " " + option.bpjs)}
                    onChange={(e, v) => setIndex(v)}
                    renderInput={(params) => (
                      <TextField {...params} label="Nomor Rekam Medis / Nama Lengkap" margin="normal" variant="outlined" onChange={({ target }) => setIndex(target.value)} />
                    )}
                  />
                </div>
                <div className="col-lg-3" style={{ alignItems: 'center',  marginTop: 20 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={{ width: '100%' }}
                    onClick={() => substrRM()}
                  //startIcon={<SaveIcon />}
                  >
                    Cari Pasien
                  </Button>
                </div>
              </div>
              <hr></hr>
              <div className="row text-center" style={{ marginTop: 20 }}>
                <div className="col-lg-7 text-center">
                  <TableContainer component={Paper} >
                    <Table className={classes.table} aria-label="simple table" disableElevation>
                      <TableHead>
                        <TableRow>
                          <TableCell>{skr}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{rmfix}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{nama}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{umur}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{alamat}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div className="col-lg-5 text-center">
                  <div className='row'>
                    <div clasname='col-lg-4'>
                      {poli.map((data, index) =>
                        <Button variant="contained" color="primary" onClick={() => kodePrint(data.kode_antrian)} style={{ padding: 20, borderRadius: 0 }} disableElevation> {data.nama_pelayanan}</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <hr></hr>
              <div className="row text-center" style={{ marginTop: 20 }}>
                <div className="col-lg-12 text-center">
                  <Button variant="contained" color="primary" style={{ padding: 20, width: '100%' }} onClick={() => simpanprint()}>Simpan dan Cetak Antrian</Button>
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
