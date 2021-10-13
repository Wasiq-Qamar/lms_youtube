import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#00bfa5",
    color: theme.palette.common.white,
    fontSize: 17,
    fontWeight: "bolder",
  },
  body: {
    fontSize: 15,
    fontWeight: "bolder",
  },
}))(TableCell);

export default StyledTableCell;
