//Pseudocode einblenden function
function pseudocode(highlight_y, neuwrite, linechange){
            //svg Hintergrund Pseudocode
                var width = 450;
                var height = 260;
                var counter_width = 80;
                var counter_height = 40;
                var highlight_x = 8;
                var svg = d3.select("#Pseudocodecontainer")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
                if (neuwrite==1) {
                    svg.selectAll("svg").remove();
                }
                //Rahmen Pseudocode
                svg.append("rect")
                .attr("class", "pscrahmen")
                .attr("x", 5)
                .attr("y", 5)
                .attr("width", 440)
                .attr("height", 250)
                .attr("fill", "mint")
                .attr("stroke", "black")
                .attr("stroke-width", 3)
                .attr("fill-opacity","0.1")
                .attr("stroke-opacity","0.9");
                //Highlightzeile
                if (highlight_y > 7){
                svg.append("rect")
                .attr("x", highlight_x)
                .attr("y", highlight_y)
                .attr("width", 433)
                .attr("height", 22)
                .attr("fill", "lightblue")
                .attr("class", "zeile");
                }
                //Zeilen Pseudocode
                svg.append("text")
                .attr("x",10)
                .attr("y",25)
                .attr("class", "textzeile")
                .text("for i = 1 to N");
                svg.append("text")
                .attr("x",30)
                .attr("y",45)
                .attr("class", "textzeile")
                .text("for j = 1 to N");
                svg.append("text")
                .attr("x",50)
                .attr("y",65)
                .attr("class", "textzeile")
                .text("if there is an edge from i to j");
                svg.append("text")
                .attr("x",70)
                .attr("y",85)
                .attr("class", "textzeile")
                .text("dist[0][i][j] = the length of the edge from i to j ");
                svg.append("text")
                .attr("x",50)
                .attr("y",105)
                .attr("class", "textzeile")
                .text("else");
                svg.append("text")
                .attr("x",70)
                .attr("y",125)
                .attr("class", "textzeile")
                .text("dist[0][i][j] = INFINITY");
                svg.append("text")
                .attr("x",10)
                .attr("y",165)
                .attr("class", "textzeile")
                .text("for k = 1 to N");
                svg.append("text")
                .attr("x",30)
                .attr("y",185)
                .attr("class", "textzeile")
                .text("for i = 1 to N");
                svg.append("text")
                .attr("x",50)
                .attr("y",205)
                .attr("class", "textzeile")
                .text("for j = 1 to N");
                svg.append("text")
                .attr("x",70)
                .attr("y",225)
                .attr("class", "textzeile")
                .text("dist[k][i][j] = min(");
                svg.append("text")
                .attr("x",80)
                .attr("y",245)
                .attr("class", "textzeile")
                .text("dist[k-1][i][j], dist[k-1][i][k] + dist[k-1][k][j])");
        }

    //Highlight Pseudocodezeile malen function
    function drawHighlight(highlight_y){
        var highlight_x=8;
        var svg2 = d3.select("#Pseudocodecontainer");
        //alten Kram entfernen
        svg2.selectAll("svg").remove();
        //svg2.selectAll("rect.zeile").remove();
        //svg2.selectAll("text.textzeile").remove();
        //svg2.selectAll("rect.pscrahmen").remove();
        var width2 = 450;
        var height2 = 260;
        svg2.append("svg")
        .attr("width", width2)
        .attr("height", height2);
        //Rahmen Pseudocode
        svg2.append("rect")
        .attr("x", 5)
        .attr("y", 5)
        .attr("width", 440)
        .attr("height", 250)
        .attr("fill", "mint")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("fill-opacity","0.1")
        .attr("stroke-opacity","0.9");
        //neue Highlightzeile einblenden
        svg2.append("rect")
        .attr("x", highlight_x)
        .attr("y", highlight_y)
        .attr("width", 433)
        .attr("height", 22)
        .attr("fill", "lightblue")
        .attr("class", "zeile");
        //Zeilen Pseudocode
        svg2.append("text")
        .attr("x",10)
        .attr("y",25)
        .attr("class", "textzeile")
        .text("for i = 1 to N");
        svg2.append("text")
        .attr("x",30)
        .attr("y",45)
        .attr("class", "textzeile")
        .text("for j = 1 to N");
        svg2.append("text")
        .attr("x",50)
        .attr("y",65)
        .attr("class", "textzeile")
        .text("if there is an edge from i to j");
        svg2.append("text")
        .attr("x",70)
        .attr("y",85)
        .attr("class", "textzeile")
        .text("dist[0][i][j] = the length of the edge from i to j ");
        svg2.append("text")
        .attr("x",50)
        .attr("y",105)
        .attr("class", "textzeile")
        .text("else");
        svg2.append("text")
        .attr("x",70)
        .attr("y",125)
        .attr("class", "textzeile")
        .text("dist[0][i][j] = INFINITY");
        svg2.append("text")
        .attr("x",10)
        .attr("y",165)
        .attr("class", "textzeile")
        .text("for k = 1 to N");
        svg2.append("text")
        .attr("x",30)
        .attr("y",185)
        .attr("class", "textzeile")
        .text("for i = 1 to N");
        svg2.append("text")
        .attr("x",50)
        .attr("y",205)
        .attr("class", "textzeile")
        .text("for j = 1 to N");
        svg2.append("text")
        .attr("x",70)
        .attr("y",225)
        .attr("class", "textzeile")
        .text("dist[k][i][j] = min(");
        svg2.append("text")
        .attr("x",80)
        .attr("y",245)
        .attr("class", "textzeile")
        .text("dist[k-1][i][j], dist[k-1][i][k] + dist[k-1][k][j])");

        alert("geschrieben");
    }




/*    pseudocode.svg.append("text")
    .attr("x",10)
    .attr("y",25)
    .attr("class", "textzeile")
    .text("for i = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",30)
    .attr("y",45)
    .attr("class", "textzeile")
    .text("for j = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",50)
    .attr("y",65)
    .attr("class", "textzeile")
    .text("if there is an edge from i to j");
    pseudocode.svg.append("text")
    .attr("x",70)
    .attr("y",85)
    .attr("class", "textzeile")
    .text("dist[0][i][j] = the length of the edge from i to j ");
    pseudocode.svg.append("text")
    .attr("x",50)
    .attr("y",105)
    .attr("class", "textzeile")
    .text("else");
    pseudocode.svg.append("text")
    .attr("x",70)
    .attr("y",125)
    .attr("class", "textzeile")
    .text("dist[0][i][j] = INFINITY");
    pseudocode.svg.append("text")
    .attr("x",10)
    .attr("y",165)
    .attr("class", "textzeile")
    .text("for k = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",30)
    .attr("y",185)
    .attr("class", "textzeile")
    .text("for i = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",50)
    .attr("y",205)
    .attr("class", "textzeile")
    .text("for j = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",70)
    .attr("y",225)
    .attr("class", "textzeile")
    .text("dist[k][i][j] = min(");
    pseudocode.svg.append("text")
    .attr("x",80)
    .attr("y",245)
    .attr("class", "textzeile")
    .text("dist[k-1][i][j], dist[k-1][i][k] + dist[k-1][k][j])");
}

/*
function stepLine(){
    var highlight_x=8;
    var highlight_y=8;
    var zaehler = 0;
    //alert("new line!, highlight_y =");
    var testy = d3.select("#tester");
    testy.selectAll("yname").remove();
    testy.selectAll("ywert").remove();
    testy
    .append("text")
    .attr("class", "yname")
    .text("highlight_y=");
    testy
    .append("text")
    .attr("class", "ywert")
    .text(highlight_y);
    if (highlight_y < 245) {
    alert("if");
    //alten Kram rausnehmen
    pseudocode.svg.selectAll("rect.zeile").remove();
    pseudocode.svg.selectAll("text.textzeile").remove();
    //neue Highlightzeile einblenden
    pseudocode.svg.append("rect")
    .attr("x", highlight_x)
    .attr("y", highlight_y)
    .attr("width", 433)
    .attr("height", 22)
    .attr("fill", "lightblue")
    .attr("class", "zeile");
    //Zeilen Pseudocode neu schreiben
    pseudocode.svg.append("text")
    .attr("x",10)
    .attr("y",25)
    .attr("class", "textzeile")
    .text("for i = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",30)
    .attr("y",45)
    .attr("class", "textzeile")
    .text("for j = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",50)
    .attr("y",65)
    .attr("class", "textzeile")
    .text("if there is an edge from i to j");
    pseudocode.svg.append("text")
    .attr("x",70)
    .attr("y",85)
    .attr("class", "textzeile")
    .text("dist[0][i][j] = the length of the edge from i to j ");
    pseudocode.svg.append("text")
    .attr("x",50)
    .attr("y",105)
    .attr("class", "textzeile")
    .text("else");
    pseudocode.svg.append("text")
    .attr("x",70)
    .attr("y",125)
    .attr("class", "textzeile")
    .text("dist[0][i][j] = INFINITY");
    pseudocode.svg.append("text")
    .attr("x",10)
    .attr("y",165)
    .attr("class", "textzeile")
    .text("for k = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",30)
    .attr("y",185)
    .attr("class", "textzeile")
    .text("for i = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",50)
    .attr("y",205)
    .attr("class", "textzeile")
    .text("for j = 1 to N");
    pseudocode.svg.append("text")
    .attr("x",70)
    .attr("y",225)
    .attr("class", "textzeile")
    .text("dist[k][i][j] = min(");
    pseudocode.svg.append("text")
    .attr("x",80)
    .attr("y",245)
    .attr("class", "textzeile")
    .text("dist[k-1][i][j], dist[k-1][i][k] + dist[k-1][k][j])");
    //Hoehe Highlightzeile verschieben
    highlight_y=highlight_y+(20);
    //zaehler raufsetzen, entfernen, neu schreiben
    /*zaehler++;
    pseudocode.svg2.selectAll("text.counterzeile").remove();
    pseudocode.svg2.append("text")
    .attr("x",65)
    .attr("y",26)
    .attr("fill", "black")
    .attr("font-weight", "bold")
    .attr("text-anchor", "end")
    .attr("class", "counterzeile")
    .text(zaehler);
    */
    /*
    }
    else {
        alert("Ende erreicht!");
        svg.selectAll("rect.zeile").remove();
        highlight_y=8;
    }
}
*/
