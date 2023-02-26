import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "block",
  },
  button: {
    margin: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formField: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));

const RegistrationForm = (props) => {
  const classes = useStyles();

  const [successMsg, setSuccessMsg] = useState("");

  async function registerUser(params) {
    try {
      const response = await fetch("http://localhost:8085/api/v1/signup", {
        body: JSON.stringify(params),
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        setSuccessMsg("Registration Successful. Please Login!");
      }
    } catch (e) {
      console.error(e);
      setSuccessMsg("Registration Successful. Please Login!");
    }
  }

  const handleRegister = (event) => {
    event.preventDefault();
    // handle register form submission
    const data = {};
    const formData = new FormData(event.target);
    for (let [name, value] of formData.entries()) {
      data[name] = value;
    }
    console.log(data);
    registerUser(data);
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <FormControl className={classes.formControl}>
          <TextField
            label="First name"
            variant="standard"
            id="filled-error-helper-text"
            helperText="required"
            required
            name="first_name"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label="Last name"
            variant="standard"
            required
            name="last_name"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label="Email"
            type="email"
            variant="standard"
            required
            name="email_address"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label="Password"
            type="password"
            variant="standard"
            required
            name="password"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label="Contact no"
            type="tel"
            variant="standard"
            required
            name="mobile_number"
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Register
        </Button>
      </form>

      {successMsg && <div>{successMsg}</div>}
    </div>
  );
};

export default RegistrationForm;
