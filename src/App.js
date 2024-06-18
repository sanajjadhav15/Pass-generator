import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import "./index.css";

const StyledContainer = styled(Container)({
  marginTop: "2rem",
  padding: "2rem",
  textAlign: "center",
  width: "350px",
});

const StyledFormGroup = styled(Box)({
  marginBottom: "1rem",
});

const PasswordDisplay = styled(Box)({
  marginTop: "1rem",
  padding: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "5px",
});

const CopyButton = styled(Button)({
  marginTop: "1rem",
});

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [hasCharacters, setHasCharacters] = useState(true);
  const [text, setText] = useState("Copy Password");

  const hasGeneratePassword = () => {
    let password = "";
    const numbers = "1234567890";
    const characters = "!@#$%^&*()_+";
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    charset += hasNumbers ? numbers : "";
    charset += hasCharacters ? characters : "";
    for (let i = 0; i < length; i++) {
      const ch = Math.floor(Math.random() * charset.length);
      password += charset.charAt(ch);
    }
    setPassword(password);
  };

  useEffect(() => {
    hasGeneratePassword();
  }, [length, hasNumbers, hasCharacters]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setText("Copied!");
    setTimeout(() => {
      setText("Copy Password");
    }, 1000);
  };

  return (
    <StyledContainer>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h5" style={{ paddingBottom: "1rem" }} gutterBottom>
          Password Generator
        </Typography>
        <StyledFormGroup>
          <TextField
            fullWidth
            type="number"
            label="Password Length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            variant="outlined"
            size="small"
          />
        </StyledFormGroup>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="1rem"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={hasNumbers}
                onChange={(e) => setHasNumbers(e.target.checked)}
                color="primary"
              />
            }
            label="Numbers"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={hasCharacters}
                onChange={(e) => setHasCharacters(e.target.checked)}
                color="primary"
              />
            }
            label="Special Characters"
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={hasGeneratePassword}
          style={{ marginBottom: "1rem" }}
        >
          Generate Password
        </Button>
        <PasswordDisplay>
          <TextField
            fullWidth
            value={password}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            size="small"
          />
        </PasswordDisplay>
        <CopyButton
          fullWidth
          variant="contained"
          color="secondary"
          onClick={copyPassword}
        >
          {text}
        </CopyButton>
      </Paper>
    </StyledContainer>
  );
}

export default App;
