/*

unirsm_reunion  05.2019
irene trotta

@iretrtr

*/

var url = "https://spreadsheets.google.com/feeds/list/1DSKXXygKzY0yqjtigLUZx-f2HHtUABJ2TOJP5kAoDYQ/od6/public/values?alt=json";
var ogg = [];
var grid = 0;
var start = 0;
var div = 15;
var anno_apertura = 2005;
var angle = 0;
var rumore = 0;


function setup() {
  pixelDensity(displayDensity());
  createCanvas(windowWidth, windowWidth/16*9);
  loadJSON(url, gotSpreadsheet);
  // background(232, 227, 205);
  background(255);
  stroke(18, 12, 12);
  strokeWeight(0.5);
  strokeCap(SQUARE)
  fill(255);
}

function draw() {
  background(232, 227, 205);
  var no_studi_c = color(177,86,70);
  var magi_c = color(62, 103, 105);
  var spec_c = color(125, 163, 111);
  var master_c = color(205, 172, 50);
  var altro_c = color(125, 58, 76);
  var no_studi = 0;
  var magi = 0;
  var spec =0;
  var master = 0;
  var altro = 0;
  grid = width/(ogg.length+20);
  start = grid*2;
  for(var i =0; i<ogg.length; i++){
    if(ogg[i].post == "Non ho proseguito gli studi"){
      no_studi++;
    }else if(ogg[i].post == "Magistrale (non Unirsm)"){
      magi++;
    }else if(ogg[i].post == "Corso di specializzazione"){
      spec++;
    }else if(ogg[i].post == "Master"){
      master++;
    }else{
      altro++
    }
  }
  var grafico = grid*(no_studi+magi+spec+master+altro);
  line(grid*start,(height/div)-10*grid/4, grid*start+grafico+start, (height/div)-10*grid/4);
  line(grid*start,(height/div)+10*grid/4, grid*start+grafico+start, (height/div)+10*grid/4);
  push();
  drawingContext.setLineDash([5, 10]);
  line(grid*start,height/div, grid*start+grafico+start, height/div);
  pop();
  textAlign(CENTER, CENTER);
  fill(0);
  text(anno_apertura, grid*start/2, height/div);
  for(i=2; i<div; i++){
    if(i == div-1){
      textSize(grid*2); //dimensione testo
      push();
      textAlign(LEFT, CENTER);
      fill(no_studi_c);
      text("Non ho proseguito gli studi", grid*start, height/div*(i-1)+grid*2);
      fill(magi_c);
      text("Magistrale (non Unirsm)", grid*start+grid*no_studi, height/div*(i-1)+grid*2);
      fill(spec_c);
      text("Spec.", grid*start+grid*(no_studi+magi), height/div*(i-1)+grid*2);
      fill(master_c);
      text("Master", grid*start+grid*(no_studi+magi+spec), height/div*(i-1)+grid*2);
      fill(altro_c);
      text("Altro", grid*start+grid*(no_studi+magi+spec+master), height/div*(i-1)+grid*2);
      pop();
    }else if (i != div-2){
      line(grid*start,(height/div*i)-10*grid/4, grid*start+grafico+start, (height/div*i)-10*grid/4);
      push();
      drawingContext.setLineDash([5, 10]);
      line(grid*start,height/div*i, grid*start+grafico+start, height/div*i);
      pop();
      line(grid*start,(height/div*i)+10*grid/4, grid*start+grafico+start, (height/div*i)+10*grid/4);
      anno = anno_apertura+i-1;
      text(anno, grid*start/2, height/div*i);
    }
  }
  for (i=0; i<ogg.length; i++){
    ogg[i].muovi();
    ogg[i].mostra();
  }
  angle++;
}

function gotSpreadsheet(reunion){
  //console.log("ciao");
  //console.log(reunion.feed.entry.length);
  for (var i=0; i<reunion.feed.entry.length; i++){
    var o = {
                  //"index": reunion.feed.entry[i].gsx$index.$t,
                  "corso": reunion.feed.entry[i].gsx$corso.$t,
                  "anno": reunion.feed.entry[i].gsx$anno.$t,
                  "post": reunion.feed.entry[i].gsx$post.$t,
                  "sei": reunion.feed.entry[i].gsx$sei.$t,
                  "soddisfazione": reunion.feed.entry[i].gsx$soddisfazione.$t,
                  "lavoro": reunion.feed.entry[i].gsx$lavoro.$t,
                  "occupazione": reunion.feed.entry[i].gsx$occupazione.$t,
                  "parole": reunion.feed.entry[i].gsx$parole.$t,
                  "voto": reunion.feed.entry[i].gsx$voto.$t,
                  "amore": reunion.feed.entry[i].gsx$amore.$t,
                  "corrisposto": reunion.feed.entry[i].gsx$corrisposto.$t,
                  "amoreoggi": reunion.feed.entry[i].gsx$amoreoggi.$t,
                  "figli": reunion.feed.entry[i].gsx$figli.$t,
                  "numfigli": reunion.feed.entry[i].gsx$numfigli.$t
    }
    //console.log(o);
    ogg.push(new Oggetto(i, o.corso, o.anno, o.post,
                         o.sei, o.soddisfazione, o.lavoro, o.occupazione, o.parole,
                         o.voto, o.amore, o.corrisposto, o.amoreoggi, o.figli, o.numfigli));
  }
}

function Oggetto(_id, _corso, _anno, _post, _sei, _soddisfazione, _lavoro, _occupazione, _parole, _voto, _amore, _corrisposto, _amoreoggi, _figli, _numfigli){
  this.id = _id ;
  this.corso = _corso;
  this.anno = Number(_anno);
  this.post = _post;
  this.sei = _sei;
  this.soddisfazione = Number(_soddisfazione);
  this.lavoro = _lavoro;
  this.occupazione = _occupazione.split("; ");
  this.parole = _parole.split(", ");
  this.voto = Number(_voto);
  this.amore = _amore;
  this.corrisposto = _corrisposto;
  this.amoreoggi = _amoreoggi;
  this.figli = _figli;
  this.numfigli = Number(_numfigli);

  this.muovi = function(){
  }

  this.mostra = function() {
    push();
    var x1;
    var y1;
    x1 = grid*start + this.id * grid;

    if (this.anno == 2005){
      if (this.voto > 5){
        y1 = height/div-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div+(this.voto)*grid/4;
      }else{
        y1 = (height/div);
      }
    }
    if (this.anno == 2006){
      if (this.voto > 5){
        y1 = height/div*2-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*2+(this.voto)*grid/4;
      }else{
        y1 = (height/div*2);
      }
    }
    if (this.anno == 2007){
      if (this.voto > 5){
        y1 = height/div*3-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*3+(this.voto)*grid/4;
      }else{
        y1 = (height/div*3);
      }
    }
    if (this.anno == 2008){
      if (this.voto > 5){
        y1 = height/div*4-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*4+(this.voto)*grid/4;
      }else{
        y1 = (height/div*4);
      }
    }
    if (this.anno == 2009){
      if (this.voto > 5){
        y1 = height/div*5-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*5+(this.voto)*grid/4;
      }else{
        y1 = (height/div*5);
      }
    }
    if (this.anno == 2010){
      if (this.voto > 5){
        y1 = height/div*6-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*6+(this.voto)*grid/4;
      }else{
        y1 = (height/div*6);
      }
    }
    if (this.anno == 2011){
      if (this.voto > 5){
        y1 = height/div*7-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*7+(this.voto)*grid/4;
      }else{
        y1 = (height/div*7);
      }
    }
    if (this.anno == 2012){
      if (this.voto > 5){
        y1 = height/div*8-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*8+(this.voto)*grid/4;
      }else{
        y1 = (height/div*8);
      }
    }
    if (this.anno == 2013){
      if (this.voto > 5){
        y1 = height/div*9-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*9+(this.voto)*grid/4;
      }else{
        y1 = (height/div*9);
      }
    }
    if (this.anno == 2014){
      if (this.voto > 5){
        y1 = height/div*10-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*10+(this.voto)*grid/4;
      }else{
        y1 = (height/div*10);
      }
    }
    if (this.anno == 2015){
      if (this.voto > 5){
        y1 = height/div*11-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*11+(this.voto)*grid/4;
      }else{
        y1 = (height/div*11);
      }
    }
    if (this.anno == 2016){
      if (this.voto > 5){
        y1 = height/div*12-(this.voto)*grid/4;
      }else if(this.voto < 5){
        y1 = height/div*12+(this.voto)*grid/4;
      }else{
        y1 = (height/div*12);
      }
    }

    translate(x1, y1);

    if(this.post == "Non ho proseguito gli studi"){
      push();
      stroke(177,86,70);
      strokeWeight(0.5);
      line(0, height-y1-(grid*div), 0, 0);
      strokeWeight(grid);
      line(0, height-y1-(grid*div), 0, height-y1-(grid*div+grid));
      pop();
    }

    if(this.post == "Magistrale (non Unirsm)"){
      push();
      stroke(62, 103, 105);
      strokeWeight(0.5);
      line(0, height-y1-(grid*div), 0, 0);
      strokeWeight(grid);
      line(0, height-y1-(grid*div), 0, height-y1-(grid*div+grid));
      pop();
    }

    if(this.post == "Corso di specializzazione"){
      push();
      stroke(125, 163, 111);
      strokeWeight(0.5);
      line(0, height-y1-(grid*div), 0, 0);
      strokeWeight(grid);
      line(0, height-y1-(grid*div), 0, height-y1-(grid*div+grid));
      pop();
    }

    if(this.post == "Master"){
      push();
      stroke(205, 172, 50);
      strokeWeight(0.5);
      line(0, height-y1-(grid*div), 0, 0);
      strokeWeight(grid);
      line(0, height-y1-(grid*div), 0, height-y1-(grid*div+grid));
      pop();
    }

    if (this.post != "Master" && this.post!="Corso di specializzazione" && this.post!="Magistrale (non Unirsm)" && this.post!="Non ho proseguito gli studi"){
      push();
      stroke(125, 58, 76);
      strokeWeight(0.7);
      line(0, height-y1-(grid*div), 0, 0);
      strokeWeight(grid);
      line(0, height-y1-(grid*div), 0, height-y1-(grid*div+grid));
      pop();
    }

    if(this.sei == "Disoccupato"){
      push();
      stroke(0,76,153);
      strokeWeight(grid);
      line(0, height-y1-(grid*div-grid*5), 0, height-y1-(grid*div-grid*4));
      pop();
    }
    if(this.sei == "Dipendente"){
      push();
      stroke(0, 102, 204);
      strokeWeight(grid);
      line(0, height-y1-(grid*div-grid*6), 0, height-y1-(grid*div-grid*5));
      pop();
    }

    if(this.sei == "Libero professionista"){
      push();
      stroke(0, 128, 255);
      strokeWeight(grid);
      line(0, height-y1-(grid*div-grid*7), 0, height-y1-(grid*div-grid*6));
      pop();
    }

    if(this.sei == "Stagista"){
      push();
      stroke(51, 153, 255);
      strokeWeight(grid);
      line(0, height-y1-(grid*div-grid*8), 0, height-y1-(grid*div-grid*7));
      pop();
    }

    if(this.sei == "Sto ancora studiando"){
      push();
      stroke(102, 178, 255);
      strokeWeight(grid);
      line(0, height-y1-(grid*div-grid*9), 0, height-y1-(grid*div-grid*8));
      pop();
    }

    if(this.sei != "Sto ancora studiando" && this.sei != "Disoccupato" &&
        this.sei != "Stagista" && this.sei != "Libero professionista" && this.sei != "Dipendente"){
      push();
      stroke(153, 204, 255);
      strokeWeight(grid);
      line(0, height-y1-(grid*div-grid*10), 0, height-y1-(grid*div-grid*9));
      pop();
    }

    if (this.lavoro == "Si"){
      push();
      stroke(221, 187, 38);
      strokeWeight(2);
      noFill();
      if(this.corso == "Entrambe"){
        ellipse(0, 0, grid * 4, grid * 4);
      }else{
        ellipse(0, 0, grid * 3, grid * 3);
      }
      pop();
    }

    if (this.corso == "Triennale"){
      push();
      noStroke();
      fill(200,45,45);
      ellipse(0, 0, grid * 2, grid * 2);
      pop();
    }
    if (this.corso == "Magistrale"){
      push();
      noStroke();
      fill(45, 45, 200);
      ellipse(0, 0, grid * 2, grid * 2);
      pop();
    }
    if (this.corso == "Entrambe"){
      push();
      noStroke();
      fill(45, 45, 200); //colore magistrale
      ellipse(0, 0, grid * 3.2, grid * 3.2);
      fill(200,45,45); //colore triennale
      ellipse(0, 0, grid * 2, grid * 2);
      pop();
    }

    noStroke();
    fill(232, 227, 205);
    ellipse(0, 0, grid-1, grid-1);

    if (this.figli == "Si"){
      push();
      stroke(0);
      strokeWeight(1);
      noFill();
      let rad = grid * 3;
      ellipse(0, 0, rad*2, rad*2);
      if (this.numfigli > 10){
        let angle2 = 360/this.numfigli;
        for (var i=0; i<this.numfigli; i++){
          let x = cos(radians(angle2*i))*rad;
          let y = sin(radians(angle2*i))*rad;
          push();
          noStroke();
          fill(0);
          ellipse(x, y, grid-1, grid-1);
          pop();
          //line(x, y, 0, 0);
        }
      }else{
        let angle2 = 360/10;
        for (var i=0; i<this.numfigli; i++){
          let x = cos(radians(angle+angle2*i))*rad;
          let y = sin(radians(angle+angle2*i))*rad;
          push();
          noStroke();
          fill(0);
          ellipse(x, y, grid-1, grid-1);
          pop();
          line(x, y, 0, 0);
        }
      }
      pop();
    }
    pop();
  }
}
