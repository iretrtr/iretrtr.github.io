var list = [];
var notes_list = {fileName: [""], note: [""], displayName: [""], path: [""], id: [""]};
var url = "https://spreadsheets.google.com/feeds/list/1Cff1d0UUBNi1J2UuTkB6Mgwu5dm4DhMQ7AgGay0Rd7I/od6/public/values?alt=json"

$.getJSON(url, function(data) {
  //first row "title" column
  for (i=0; i<data.feed.entry.length; i++){
    var word = data.feed.entry[i].title.$t;
    list.push(word);
  }
  list.sort();

  for (i=0; i<list.length;i++){
    notes_list.fileName[i] = list[i];
    notes_list.note[i] = "[" + (i+1) + "]";
    notes_list.displayName[i] = list[i];
    notes_list.path[i] = "img/"+list[i]+".png";
    notes_list.id[i] = i+1;
    display_image(notes_list.path[i], notes_list.displayName[i], notes_list.note[i], notes_list.id[i]);
    legend(notes_list.note[i], notes_list.displayName[i], notes_list.id[i]);
  }
  highlight();
});


function cut_after_dot (file_name){
  var word = file_name;
  word = word.substring(0, word.indexOf('.'));
  return word;
}

function legend (note, img_name, id){
  $( "<p id="+id+" class='legend_text'>"+note+" "+img_name+"</p>" ).appendTo("#legend");
}

function display_image(img_path, img_name, note, id) {
  var x = document.createElement("IMG");
  x.setAttribute("src", img_path);
  //x.setAttribute("width", "304");
  x.setAttribute("height", "50");
  x.setAttribute("alt", img_name);
  x.setAttribute("id", id);
  var div = document.createElement("DIV");
  div.setAttribute("id", id);
  div.setAttribute("class", "child");
  $(div).appendTo("#main");
  //document.body.appendChild(x);
  $(x).appendTo(div);
  $( "<p class="+id+">"+note+"</p>" ).appendTo(div);
}

function highlight(){
  $("div.child").hover(function(){
    var class_n =$(this).attr("id");
    $("p."+class_n).css("background-color", "yellow");
    $("p#"+$(this).attr("id")).css("background-color", "yellow");
  }, function(){
    var class_n =$(this).attr("id");
    $("p."+class_n).css("background-color", "#ffffff");
    $("p#"+$(this).attr("id")).css("background-color", "#ffffff");
  });
  $("p.legend_text").hover(function(){
    $(this).css("background-color", "yellow");
    //console.log($(this).attr("id"));
    var class_n =$(this).attr("id");
    $("p."+class_n).css("background-color", "yellow");
  }, function(){
    $(this).css("background-color", "#ffffff");
    var class_n =$(this).attr("id");
    $("p."+class_n).css("background-color", "#ffffff");
  });
}
