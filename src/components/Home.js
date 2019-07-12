import React from "react";
import AppBar from "@material-ui/core/AppBar"
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import MenuIcon from "@material-ui/icons/Menu";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { DatePicker } from "@material-ui/pickers";
import { Pie, HorizontalBar } from "react-chartjs-2";

import feedbacks from "../data/Feedback";

const styles = (theme) => ({
  root: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: 64,
    padding: 64,
    flex: 1,
    backgroundColor: "#f5f5f5"
  }
});

const filterFeedbacksByDate = (feedbacks, value) => {
  if (!value) return feedbacks;
  return feedbacks.filter(f => {
    let date = f.publishedAt;
    return date.getUTCFullYear() === value.getUTCFullYear() && date.getUTCMonth() === value.getUTCMonth() && date.getUTCDate() === value.getUTCDate();
  });
};

const getFeedbackByValue = (feedbacks, value) => {
  return feedbacks.filter(f => !!f.feedback).reduce((acc, current) => {
    if (current.feedback.shipping === value) { acc[0] += 1; }
    if (current.feedback.sav === value) { acc[1] += 1; }
    if (current.feedback.product === value) { acc[2] += 1; }
    return acc;
  }, [0,0,0]);
};

class Home extends React.Component {

  state = {
    filter: null
  };

  handleChange = (value) => {
    this.setState({ filter: value });
  };

  render() {
    const { classes } = this.props;
    const { filter } = this.state;
    const filtered = filterFeedbacksByDate(feedbacks, filter);

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              SortVoices - Homepage
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <Grid container spacing={10}>
            <Grid item xs={4}>
              <Card>
                <CardHeader
                  title={"Filter les résultats"}
                />
                <CardContent>
                  <DatePicker value={filter || new Date()} onChange={this.handleChange} />
                </CardContent>
              </Card>
              <br/>
              <Card>
                <CardHeader
                  title={"Volume d'avis clients"}
                />
                <CardContent>
                  <Pie data={{
                    datasets: [{
                      data: [
                        filtered.filter(f => !!f.feedback).length,
                        filtered.filter(f => !f.feedback).length
                      ],
                      backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                      ]
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                      'A laissé un avis',
                      'N\'a pas laissé d\'avis'
                    ]
                  }} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Card>
                <CardHeader
                  title={"Répartition des avis clients"}
                />
                <CardContent>
                  <HorizontalBar
                    data={{
                      datasets: [{
                        data: getFeedbackByValue(filtered, "POS"),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        label: "Positif"
                      }, {
                        data: getFeedbackByValue(filtered, "NEU"),
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        label: "Neutre"
                      }, {
                        data: getFeedbackByValue(filtered, "NEG"),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        label: "Négatif"
                      }],
                      // These labels appear in the legend and in the tooltips when hovering different arcs
                      labels: [
                        "Livraison",
                        "Service Client",
                        "Produit"
                      ]
                    }}
                    options={{
                      scales: {
                        xAxes: [{
                          ticks: {
                            min: 0
                          },
                          stacked: true
                        }],
                        yAxes: [{
                          ticks: {
                            min: 0
                          },
                          stacked: true
                        }]
                      }}}
                  />

                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

}

export default withStyles(styles)(Home);
