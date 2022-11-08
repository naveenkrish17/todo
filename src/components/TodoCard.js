import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const TodoCard = ({
  todoList,
  onTaskProgress,
  onTaskComplete,
  onTaskOpen,
  onTaskDiscard,
}) => {
  const status = !onTaskOpen
    ? "Open"
    : !onTaskProgress
    ? "InProgress"
    : "Completed";

  return (
    <div style={{ width: "30%" }}>
      <Typography variant="h4">
        {
          // eslint-disable-next-line eqeqeq
          status == "Open"
            ? "Open items"
            : // eslint-disable-next-line eqeqeq
            status == "InProgress"
            ? "In Progress items"
            : "Completed items"
        }
      </Typography>
      {todoList
        .filter((el) => {
          // eslint-disable-next-line eqeqeq
          return !onTaskOpen
            ? // eslint-disable-next-line eqeqeq
              el.status == "Open"
            : !onTaskProgress
            ? // eslint-disable-next-line eqeqeq
              el.status == "InProgress"
            : // eslint-disable-next-line eqeqeq
              el.status == "Completed";
        })
        .map((el) => {
          return (
            <>
              <Card
                sx={{
                  margin: 2,
                  // eslint-disable-next-line eqeqeq
                  width: status == "Completed" ? 350 : 200,
                  backgroundColor:
                    // eslint-disable-next-line eqeqeq
                    status == "Open"
                      ? "secondary.light"
                      : // eslint-disable-next-line eqeqeq
                      status == "InProgress"
                      ? "primary.light"
                      : "success.light",
                  "&:hover": {
                    backgroundColor: "warning.light",
                    opacity: [0.9, 0.8, 0.7],
                  },
                  p: 2,
                  border: "1px dashed grey",
                }}
              >
                <CardContent>
                  <Typography color="text.primary">{el.title}</Typography>
                  <br></br>
                  <Typography color="text.secondary">
                    Status : {el.status}
                  </Typography>
                </CardContent>
                {!onTaskOpen ? (
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        onTaskProgress(el);
                      }}
                    >
                      Progress
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        onTaskComplete(el);
                      }}
                    >
                      Complete
                    </Button>
                  </CardActions>
                ) : !onTaskProgress ? (
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        onTaskOpen(el);
                      }}
                    >
                      Open
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        onTaskComplete(el);
                      }}
                    >
                      Complete
                    </Button>
                  </CardActions>
                ) : !onTaskComplete ? (
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        onTaskProgress(el);
                      }}
                    >
                      Progress
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        onTaskOpen(el);
                      }}
                    >
                      Open
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        onTaskDiscard(el);
                      }}
                    >
                      Discard
                    </Button>
                  </CardActions>
                ) : (
                  <></>
                )}
              </Card>
            </>
          );
        })}
    </div>
  );
};
export default TodoCard;
