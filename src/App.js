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
  const [total, setTotal] = useState('0');
  const [dipanggil, setDipanggil] = useState('0');
  const [sisa, setSisa] = useState('0');
  const [poli, setPoli] = useState([]);
  const [skr, setSkr] = useState('');
  const [kode, setKode] = useState('');
  const [pasienlist, setPasienList] = useState([]);
  const [rm, setRm] = useState('');
  const [idantri, setIdantri] = useState('');
  const [rmfix, setRmfix] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [umur, setUmur] = useState('');
  const [tanggal, setTanggal] = useState(new Date());


  useEffect(() => {
    onload();
  }, [])

  async function onload() {
    await axios.get('http://localhost/api/indexpendaftaran')
      .then(res => {
        setPoli(res.data.poli)
        console.log(res.data)
      })
    await axios.get('http://localhost/api/pasien')
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

  async function substrRM() {
    let rmx = await rm.substring(0, 8)
    setRmfix(rmx);
    cariPasien(rmx)
  }

  function cariPasien(val) {
    axios.get('http://localhost/api/getpasienrm/' + val)
      .then(res => {
        setNama(res.data.nama)
        setAlamat(res.data.alamat)
        setUmur(res.data.umur)
      })
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
              <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="simple table" disableElevation>
                  <TableHead>
                    <TableRow>
                      <TableCell><TextField label="Nomor Induk Kependudukan" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                      <TableCell><TextField label="Nomor Rekam Medis Lama" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell ><TextField label="Nama Lengkap" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                      <TableCell ><TextField label="Jenis Kelamin" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><TextField label="Tempat Lahir" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                      <TableCell>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            className="form-control"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Tanggal Lahir"
                            format="dd MMMM y"
                            value={tanggal}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><TextField label="Nama Kepala Keluarga" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                      <TableCell><TextField label="Status Dalam keluarga" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><TextField label="Agama" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                      <TableCell><TextField label="Pekerjaan" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}><TextField label="Alamat" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setRm(target.value)} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}> <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={() => simpanprint()}>Simpan Data Pasien</Button></TableCell>
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
          <div className="card" style={{ borderRadius:0 }}>
            <div className="card-block">
              <div className='row' style={{ marginBottom: 20 }}>
                <div className="col-lg-12">

                </div>
              </div>

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
                <div className="col-lg-10">
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={pasienlist.map((option) => option.no_rm + " - " + option.nama)}
                    onChange={(e, v) => setRm(v)}
                    renderInput={(params) => (
                      <TextField {...params} label="Nomor Rekam Medis / Nama Lengkap" margin="normal" variant="outlined" onChange={({ target }) => setRm(target.value)} />
                    )}
                  />
                </div>
                <div className="col-lg-2" style={{ alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={{ width: '100%' }}
                    onClick={() => substrRM()}
                  //startIcon={<SaveIcon />}
                  >
                    Ulang
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
                          <TableCell>Nomor Antrian</TableCell>
                          <TableCell align="right">{skr}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Nomor RM</TableCell>
                          <TableCell align="right">{rmfix}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Nama Lengkap</TableCell>
                          <TableCell align="right">{nama}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Umur</TableCell>
                          <TableCell align="right">{umur}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Alamat</TableCell>
                          <TableCell align="right">{alamat}</TableCell>
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
