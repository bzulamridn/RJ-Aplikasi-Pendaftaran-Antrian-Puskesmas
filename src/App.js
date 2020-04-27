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
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

toast.configure({
  autoClose: 5000,
  draggable: true,
  //etc you get the idea
});



function App() {

  const classes = useStyles();
  const [isLogin, setLogin] = useState(false);
  const [isPageLoading, setIspageloading] = useState(false)
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
  const [indekx, setIndex] = useState('');
  const [kabkota, setKabkota] = useState(''); //sambas
  const [kodeFaskes, setKodeFaskes] = useState('');
  const [passwordfaskes, setPasswordfaskes] = useState('');
  const [datafaskes, setDatafaskes] = useState([])
  const [agamalist, setAgamalist] = useState([])
  const [pekerjaanlist, setPekerjaanlist] = useState([])
  const [statuskeluargalist, setStatuskeluargalist] = useState([])
  const [onesignalid, setOnesignalid] = useState('')
  const [onesignalsec, setOnesignalsec] = useState('')
  const [printerlist, setPrinterlist] = useState([])
  const [printer, setPrinter] = useState('')

  // useEffect(() => {
  //   onload();
  // }, [])


  function login() {
    axios.post('http://localhost:3000/loginfaskes', {
      faskesid: kodeFaskes,
      passwordfaskes: passwordfaskes
    })
      .then(res => {
        console.log(res.data)
        if (res.data.status !== '1') {
          console.log(res.data)

          toast.error("Id atau Password Anda Salah", {
            position: toast.POSITION.TOP_RIGHT
          });
        } else {
          setOnesignalid(res.data.data[0].onesignalid)
          setOnesignalsec(res.data.data[0].onesignalsec)
          index(res.data.data[0].local_api)
          setIspageloading(true)
          onload()
          setLogin(true)
        }
      })
  }

  async function onload() {
    await datapasien();
    await getdatafaskes();
    await getAttribut()
    setIspageloading(false)
  }

  async function index(url) {
    await axios.get(url + 'indexapi')
      .then(res => {
        console.log("Data Loket")
        console.log(res.data)
        setPrinterlist(res.data.printer)
        setDipanggil(res.data.data.dipanggil)
        setSisa(res.data.data.sisa)
      })
  }

  function datapasien() {
    axios.get('http://localhost:3000/pasien')
      .then(res => {
        setPasienList(res.data)
        console.log(res.data)
      })
  }

  function getAttribut() {
    axios.get('http://localhost:3000/attribut')
      .then(res => {
        console.log(res.data)
        setAgamalist(res.data.agama)
        setPekerjaanlist(res.data.pekerjaan)
        setStatuskeluargalist(res.data.statuskeluarga)
      })
  }

  function getdatafaskes() {
    axios.get('http://localhost:3000/faskesbyid/' + kodeFaskes)
      .then(res => {
        setDatafaskes(res.data[0])
        axios.get(res.data[0].local_api + "indexpendaftaran")
          .then(res => {
            setPoli(res.data.poli)
            console.log(res.data)
          })
      })
  }

  function panggil() {
    axios.get(datafaskes.local_api + "panggil/" + onesignalid + "/" + onesignalsec)
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
    console.log(onesignalid + " --- " + onesignalsec)
  }

  function ulang() {
    axios.get(datafaskes.local_api + "ulangpanggil/A/" + dipanggil + "/" + onesignalid + "/" + onesignalsec)
      .then(res => {
        toast.success("Berhasil Pannggil Ulang", {
          position: toast.POSITION.CENTER_CENTER
        });
      })
  }

  function simpanPasien() {
    console.log("tes")
    if (nik === '' || bpjs === '' || oldrm === '' || namapost === '' || jk === '' || alamatpost === '' || tempatlahir === '' || nohp === '' || namakepalakeluarga === '' || statusdalamkeluarga === '' || agama === '' || pekerjaan === '') {
      toast.error("Lengkapi Isian Anda", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      axios.post('http://localhost:3000/createpasien/', {
        nik: nik,
        bpjs: bpjs,
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
        kodefaskes: kodeFaskes,
      })
        .then(res => {
          datapasien();
          toast.success("Data Pasien Berhasil di Tambahkan", {
            position: toast.POSITION.TOP_RIGHT
          });
          resetform()
        })

    }

  }

  function resetform() {
    setNik('')
    setOldrm('')
    setNamapost('')
    setJk('')
    setBpjs('')
    setNohp('')
    setTempatlahir('')
    setNamakepalakeluarga('')
    setStatusdalamkeluarga('')
    setAgama('')
    setPekerjaan('')
    setAlamatpost('')
  }


  async function substrRM() {
    if (indekx === '') {

    } else {
      let str = indekx;
      let batas = str.indexOf('-');
      let indexpasien = await indekx.substring(0, batas)
      cariPasien(indexpasien)
    }

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
        const open = window.open("http://localhost/printpos/print.php?nomor=" + res.data.antrian + "&rm=" + rmfix + "&printer=" + printer , '_blank', 'location=yes,height=100,width=100,scrollbars=yes,status=yes');
        setTimeout(() => { open.close() }, 5000);
      })

  }

  return (
    <>
      {isLogin ?
        (<div className="row">
          {isPageLoading ?
            (
              <h1>Loading</h1>
            )
            :
            (
              <>
                <div className="col-lg-6" >
                  <AppBar position="static">
                    <Toolbar>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" className={classes.title} >
                        Tambah Data Pasien
                  </Typography>
                      
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
                              <TableCell ><FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Jenis Kelamin</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={jk}
                                  onChange={({ target }) => setJk(target.value)}
                                >
                                  <MenuItem value="Laki lai">Laki laki</MenuItem>
                                  <MenuItem value="Perempuan">Perempuan</MenuItem>
                                </Select>
                              </FormControl></TableCell>
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
                                    maxDate={tanggal}
                                    value={tanggal}
                                    onChange={value => {
                                      setTanggal(value);
                                      //handleChangeTo(value);
                                    }}
                                    KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                    }}
                                    format="yyyy MM dd"
                                  />
                                </MuiPickersUtilsProvider>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><TextField label="Nama Kepala Keluarga" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setNamakepalakeluarga(target.value)} /></TableCell>
                              <TableCell>
                                <FormControl className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-label">Status Dalam Keluarga</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={statusdalamkeluarga}
                                    onChange={({ target }) => setStatusdalamkeluarga(target.value)}
                                  >
                                    {statuskeluargalist.map((val, index) =>

                                      <MenuItem value={val.nama_status}>{val.nama_status}</MenuItem>

                                    )}

                                  </Select>
                                </FormControl>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <FormControl className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-label">Agama</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={agama}
                                    onChange={({ target }) => setAgama(target.value)}
                                  >
                                    {agamalist.map((val, index) =>

                                      <MenuItem value={val.nama_agama}>{val.nama_agama}</MenuItem>

                                    )}

                                  </Select>
                                </FormControl></TableCell>
                              <TableCell>
                                <FormControl className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-label">Pekerjaan</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pekerjaan}
                                    onChange={({ target }) => setPekerjaan(target.value)}
                                  >
                                    {pekerjaanlist.map((val, index) =>

                                      <MenuItem value={val.nama_pekerjaan}>{val.nama_pekerjaan}</MenuItem>

                                    )}

                                  </Select>
                                </FormControl></TableCell>
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
                        {datafaskes.nama_faskes}
                      </Typography>
                      <select
                        value={printer}
                        onChange={({ target }) => setPrinter(target.value)}
                      >
                        <option value=""> Printer </option>
                        {printerlist.map((data, index) =>
                          <option value={data.nama_printer}> {data.loket} </option>
                        )}
                      </select>
                      <Button color="inherit">Test Printer</Button>
                    </Toolbar>
                  </AppBar>
                  <div className="card" style={{ borderRadius: 0 }}>
                    <div className="row" style={{ backgroundColor: '#ecf0f1', padding: 20, marginRight: 0, marginLeft: 0 }}>
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
                            <h2 className="text-center"><span>0</span></h2>
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
                            onClick={() => ulang()}
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
                            options={pasienlist.map((option, index) => +index + "- " + option.rm + " " + option.nama + " " + option.bpjs)}
                            onChange={(e, v) => setIndex(v)}
                            renderInput={(params) => (
                              <TextField {...params} label="Nomor Rekam Medis / Nama Lengkap" margin="normal" variant="outlined" onChange={({ target }) => setIndex(target.value)} />
                            )}
                          />
                        </div>
                        <div className="col-lg-3" style={{ alignItems: 'center', marginTop: 20 }}>
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
              </>)
          }
        </div>)
        : (
          <Container component="main" maxWidth="xs">

            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login Form
            </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="ID Fasilitas Kesehatan"
                  onChange={({ target }) => setKodeFaskes(target.value)}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={({ target }) => setPasswordfaskes(target.value)}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => login()}
                >
                  Login
              </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Silahkan Menghubungi Admin Jika Lupa Password
                  </Link>
                  </Grid>

                </Grid>
              </form>
            </div>

          </Container>
        )
      }
    </>
  );
}

export default App;
