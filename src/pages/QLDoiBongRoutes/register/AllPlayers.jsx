import { Backdrop, Box } from "@mui/material";
import PlayerTable from "../../../components/form/PlayersList";
const AllPlayers = (props) => {
  const { isOpen, data, selectedList, setSelectedList, setIsOpen } = props;
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 1 }}
      open={isOpen}
    >
      <Box sx={{ padding: "2rem", mt: "2rem" }}>
        <PlayerTable
          hasCheckbox={true}
          data={data}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          number={6}
        ></PlayerTable>
      </Box>
    </Backdrop>
  );
};

export default AllPlayers;
