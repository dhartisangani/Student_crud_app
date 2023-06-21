import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Button,
  InputLabel,
  Select,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  InputBase,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import instance from "../../Services/AxiosInterCeptors";
import {
  API_BASE_URI,
  DELETE_STUDENT,
} from "../../Configs/AppConfig";
import { AllStudent } from "../../Types/Type";
import StudentTable from "../../Common/Student/StudentTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    thead: {
      fontWeight: "bold",
      fontSize: "18px",
      // [theme.breakpoints.down("lg")]: {
      //   // height: 'auto',
      //   width: 'auto',
      // },
    },
    total: {
      displpay: "flex",
      justifyContent: "center",
      width: 300,
      height: 300,
    },
    button: {
      textDecoration: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: "0px",
      position: "relative",
      textAlign: "center",
      padding: "10px",
      height: "40px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.primary,
      },
      "&.Mui-disabled": {
        background: "#eaeaea",
        color: "#c0c0c0",
        PointerEvent: "none",
        // onclick:"none"
      },
    },
    search: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    searchbar: {
      border: "2px solid",
      borderColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
    },
    searchInput: {
      marginRight: "10px",
      display: "flex",
      alignItems: "center",
      padding: "2px",
      // background: theme.palette.background.default,
      // color: theme.palette.text.primary,
    },
  })
);
const AllStudents = () => {
  const [students, setStudents] = useState<AllStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudent, setTotalStudent] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const [division, setDivision] = useState<string>("");
  const classes = useStyles();

  // Fetch all student data from api
  const fethStudents = async (
    searchValue: String,
    division: String,
    page: number,
    limit: number
  ) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      // Send a GET request to the API endpoint with search parameters
      const response = await instance.get(
        `${API_BASE_URI}?search=${searchValue}&division=${division}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // Extract the data from the response
      const data = await response.data;

      // Update the state variables with the received data
      setStudents(data.students);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);
      setTotalStudent(data.total_students);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error fetching Student Data:", error);
    }
  };

  useEffect(() => {
    fethStudents(searchValue, division, 1, rowsPerPage);
  }, []);

  //set debounce for delay search
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // serach handle
  const handleSearch = async (
    searchValue: string,
    division: String,
    page: number,
    limit: number
  ) => {
    try {
      let response;
      if (searchValue) {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");
        response = await instance.get(
          `${API_BASE_URI}?search=${searchValue}&division=${division}&page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } else {
        response = await fethStudents(searchValue, division, 1, limit);
      }

      if (response) {
        const data = await response.data;
        setStudents(data.students);
        setCurrentPage(data.current_page);
        setTotalPages(data.total_pages);
        setTotalStudent(data.total_students);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // set searchvalue when change value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    debouncedHandleSearch(searchValue, division, 1, rowsPerPage);
    setSearchValue(searchValue);
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 1000), []);

  // set pagevalue when page change
  const handlePageChange = (page: number) => {
    if (searchValue) {
      handleSearch(searchValue, division, page, rowsPerPage);
    } else {
      fethStudents(searchValue, division, page, rowsPerPage);
    }
  };

  // set rows per page value when rows value change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);

    if (searchValue) {
      handleSearch(searchValue, division, 1, newRowsPerPage);
    } else {
      fethStudents(searchValue, division, 1, newRowsPerPage);
    }
  };

  // Delete student data
  const handleDeleteStudent = async (studentId: string) => {
    try {
      const token: string = localStorage.getItem("token") as string;
      await instance.delete(`${DELETE_STUDENT}${studentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // set division value
  const handleDivisionChange = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const division = event.target.value as string;
    setDivision(division);
    setCurrentPage(1);

    try {
      const token = localStorage.getItem("token");
      const response = await instance.get(
        `${API_BASE_URI}?search=${searchValue}&division=${division}&page=1&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;
      setStudents(data.students);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);
      setTotalStudent(data.total_students);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Student Data:", error);
    }
  };


// enable loading when api is load
  if (isLoading) {
    return (
      <Typography variant="h4" gutterBottom align="center">
        Loading...
      </Typography>
    );
  }
  return (
    <Grid mb={28}>
      <Typography
        component={"div"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={5}
        mr={6}
        ml={6}
      >
        <Typography variant="h5">All Students :-</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Division</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={division}
            label="Division"
            onChange={handleDivisionChange}
            // onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            //   const selectEvent: SelectChangeEvent = event as SelectChangeEvent;
            //   setDivision(selectEvent.target.value);
            // }}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
            <MenuItem value={"D"}>D</MenuItem>
          </Select>
        </FormControl>
        <Grid item xs={12} md={6} sm={5} className={classes.search}>
          <Grid item xs={8} md={12} sm={4} className={classes.searchbar}>
            <InputBase
              fullWidth
              placeholder="Search hear.."
              inputProps={{ "aria-label": "search google maps" }}
              autoComplete="off"
              className={classes.searchInput}
              style={{
                background: "primary",
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2} md={1} sm={1}>
            <Button className={classes.button}>
              <SearchOutlinedIcon />
            </Button>
          </Grid>
        </Grid>

        <Link to={"/student/add"} className={classes.button}>
          Add New Student
        </Link>
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sm={12} m={5} justifyContent={"center"}>
          <Card>
            <TableContainer>
              {students?.length === 0 ? (
                <Typography variant={"h5"} align="center" m={5}>
                  No Students Data
                </Typography>
              ) : (
                <Table>
                  <TableHead style={{ position: "sticky" }}>
                    <TableRow>
                      <TableCell className={classes.thead}>Sr No.</TableCell>
                      <TableCell className={classes.thead}>
                        Student Id
                      </TableCell>
                      <TableCell className={classes.thead}>Image</TableCell>

                      <TableCell className={classes.thead}>
                        Student Name
                      </TableCell>
                      <TableCell className={classes.thead}>DOB</TableCell>
                      <TableCell className={classes.thead}>Standard</TableCell>
                      <TableCell className={classes.thead}>Division</TableCell>
                      <TableCell className={classes.thead}>Gender</TableCell>
                      <TableCell className={classes.thead}>
                        Mobile No.
                      </TableCell>
                      <TableCell className={classes.thead}>Edit</TableCell>
                      <TableCell className={classes.thead}>Delete</TableCell>
                      <TableCell className={classes.thead}>view</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {students?.map((item: any, index: any) => (
                      <StudentTable
                        item={item}
                        key={index}
                        srNo={index + 1}
                        onDelete={() => handleDeleteStudent(item._id)}
                      />
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={9}>
                        <TablePagination
                          style={{ display: "flex", justifyContent: "center" }}
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={totalStudent}
                          rowsPerPage={rowsPerPage}
                          page={currentPage - 1}
                          onPageChange={(_, page) => handlePageChange(page + 1)}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              )}
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default AllStudents;
