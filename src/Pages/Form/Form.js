import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { FormHelperText } from "@mui/material";
import { useHistory, useLocation } from "react-router";

const FormPage = () => {
    const [id, setId] = React.useState(null);
    const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
    const [religion, setReligion] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [validation, setValidation] = React.useState({
        name: true,
        gender: true,
        religion: true,
        address: true,
    });
    const history = useHistory();
    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            const data = location.state.data
            setId(data.id)
            setName(data.name)
            setDateOfBirth(new Date(data.dateOfBirth))
            setGender(data.gender)
            setReligion(data.religion)
            setAddress(data.address)
        }
    }, [location.state])

    const formSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let newValidation = {...validation}

        if (name === "") {
            newValidation.name = false
        }

        if (gender === "") {
            newValidation.gender = false
        }

        if (religion === "") {
            newValidation.religion = false
        }

        if (address === "") {
            newValidation.address = false
        }
        setValidation(newValidation)
        
        if (name !== "" && gender !== "" && religion !== "" && address !== "") {
            const formData = {name, dateOfBirth, gender, religion, address}
            
            if (id) {
                formData.id = id
            }
            
            event.target.reset();
            setGender("");
            setReligion("");
            setName("");
            setAddress("");
            history.push("/",{formData})
        }
    }

    const handleValidation = (event) => {
        if (event.target.value !== "") {
            setValidation({...validation, [event.target.name]: true});
        } else {
            setValidation({...validation,[event.target.name]: false});
        }
    }

    const handleReligionChange = (event) => {
        setReligion(event.target.value);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Typography sx={{ mb: 3 }} variant="h4">
                Tambah Data
            </Typography>
            <Paper
                sx={{
                    borderTop: "solid 7px",
                    borderColor: (theme) => theme.palette.warning.light,
                    p: (theme) => theme.spacing(2),
                    width: "100%",
                    mb: 2,
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark" && "transparent",
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Form Pendaftaran
                </Typography>
                <Box component="form" noValidate onSubmit={formSubmit} autoComplete="off">
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            required
                            error={validation.name ? false : true}
                            helperText={validation.name ? "" : "Nama harus diisi."}
                            id="input-name"
                            label="Nama"
                            variant="outlined"
                            name="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                handleValidation(e)
                            }}
                            onBlur={(e) => {
                                setName(e.target.value)
                                handleValidation(e)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                label="Tanggal Lahir"
                                value={dateOfBirth}
                                onChange={(newValue) => {
                                    setDateOfBirth(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        variant="outlined"
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }} component="fieldset">
                        <FormLabel component="legend">Jenis Kelamin</FormLabel>
                        <RadioGroup
                            onChange={e => {
                                setGender(e.target.value)
                                handleValidation(e)
                            }}
                            row
                            aria-label="gender"
                            name="gender"
                            value={gender}
                        >
                            <FormControlLabel
                                value="Laki-laki"
                                control={<Radio />}
                                label="Laki-laki"
                            />
                            <FormControlLabel
                                value="Perempuan"
                                control={<Radio />}
                                label="Perempuan"
                            />
                        </RadioGroup>
                        {validation.gender ? "" : (<FormHelperText error>Pilih Jenis Kelamin.</FormHelperText>)}
                    </FormControl>
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
                        <InputLabel id="religion-select-label">
                            Agama *
                        </InputLabel>
                        <Select
                            name="religion"
                            labelId="religion-select-label"
                            label="Agama *"
                            id="religion-select"
                            value={religion}
                            onChange={e => {
                                handleReligionChange(e)
                                handleValidation(e)
                            }}
                            onBlur={e => {
                                handleReligionChange(e)
                                handleValidation(e)
                            }}
                            error={validation.religion ? false : true}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Islam">Islam</MenuItem>
                            <MenuItem value="Katolik">Katolik</MenuItem>
                            <MenuItem value="Protestan">Protestan</MenuItem>
                            <MenuItem value="Hindu">Hindu</MenuItem>
                            <MenuItem value="Buddha">Buddha</MenuItem>
                            <MenuItem value="Konghucu">Konghucu</MenuItem>
                        </Select>
                        {validation.religion ? "" : (<FormHelperText error>Agama tidak boleh kosong.</FormHelperText>)}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            required
                            error={validation.address ? false : true}
                            multiline={true}
                            helperText={validation.address ? "" : "Alamat harus diisi."}
                            name="address"
                            rows={3}
                            id="input-address"
                            label="Alamat"
                            variant="outlined"
                            value={address}
                            onChange={e => {
                                setAddress(e.target.value)
                                handleValidation(e)
                            }}
                            onBlur={e => {
                                setAddress(e.target.value)
                                handleValidation(e)
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ mb: 1 }}>
                        <Button variant="contained" type="submit">Simpan</Button>
                    </FormControl>
                </Box>
            </Paper>
        </Box>
    );
};

export default FormPage;
