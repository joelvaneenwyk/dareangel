import * as da from "./dareangel.dashboard";

var DareAngelDashboard: da.DareAngel.Dashboard;

document.addEventListener('DOMContentLoaded', function() {
    DareAngelDashboard = new da.DareAngel.Dashboard(document.getElementById("imagesCollection"));
});