import * as da from "./universal.dashboard";

var Dashboard: da.UniversalExtension.Dashboard;

document.addEventListener('DOMContentLoaded', function() {
    Dashboard = new da.UniversalExtension.Dashboard(document.getElementById("imagesCollection"));
});