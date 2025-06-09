import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import bgImage from "assets/images/bg-presentation.jpg";
import axios from "axios";
import { useUser } from "context/UserContext"; // make sure path matches your project

function RegisterKid() {
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [ditelindja, setDitelindja] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useUser(); // ✅ Get user context
  const parentID = user?.userID;

  console.log("id", parentID);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3001/kids", {
        emri,
        mbiemri,
        ditelindja,
        parentID,
      });

      if (response.status === 201) {
        setSuccess("Kid registered successfully! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 3000);
      } else {
        setError("Failed to register kid.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba } }) =>
            `${linearGradient(rgba("#A1C4FD", 0.8), rgba("#C2E9FB", 0.8))}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.95)",
        }}
      />
      <MKBox
        px={1}
        width="100%"
        height="100vh"
        mx="auto"
        position="relative"
        zIndex={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: 400 }}
        >
          <Grid item xs={12}>
            <Card sx={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(161, 196, 253, 0.4)" }}>
              <MKBox
                variant="gradient"
                bgColor="light"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={3}
                mb={1}
                textAlign="center"
                sx={{
                  background: "linear-gradient(45deg, #89F7FE, #66A6FF)",
                  color: "white",
                  fontFamily: "'Comic Sans MS', cursive, sans-serif",
                  fontWeight: "bold",
                  fontSize: "1.8rem",
                  letterSpacing: "2px",
                  borderRadius: "20px 20px 0 0",
                }}
              >
                Register Your Kid
              </MKBox>
              <MKBox pt={4} pb={3} px={4}>
                <MKBox component="form" role="form" onSubmit={handleSubmit}>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="First Name"
                      fullWidth
                      value={emri}
                      onChange={(e) => setEmri(e.target.value)}
                      required
                      sx={{ "& input": { fontFamily: "'Comic Sans MS', cursive" } }}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Last Name"
                      fullWidth
                      value={mbiemri}
                      onChange={(e) => setMbiemri(e.target.value)}
                      required
                      sx={{ "& input": { fontFamily: "'Comic Sans MS', cursive" } }}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="date"
                      label="Date of Birth"
                      fullWidth
                      value={ditelindja}
                      onChange={(e) => setDitelindja(e.target.value)}
                      required
                      InputLabelProps={{ shrink: true }}
                      sx={{ "& input": { fontFamily: "'Comic Sans MS', cursive" } }}
                    />
                  </MKBox>
                  {error && (
                    <MKTypography
                      variant="body2"
                      color="error"
                      mt={2}
                      sx={{ fontFamily: "'Comic Sans MS'" }}
                    >
                      {error}
                    </MKTypography>
                  )}
                  {success && (
                    <MKTypography
                      variant="body2"
                      color="success"
                      mt={2}
                      sx={{ fontFamily: "'Comic Sans MS'" }}
                    >
                      {success}
                    </MKTypography>
                  )}
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                      disabled={isLoading}
                      sx={{
                        fontFamily: "'Comic Sans MS', cursive",
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #89F7FE, #66A6FF)",
                        boxShadow: "0 4px 10px #89F7FE",
                        "&:hover": {
                          background: "linear-gradient(45deg, #66A6FF, #89F7FE)",
                          boxShadow: "0 6px 12px #66A6FF",
                        },
                      }}
                    >
                      {isLoading ? "Registering..." : "Register Kid"}
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default RegisterKid;
