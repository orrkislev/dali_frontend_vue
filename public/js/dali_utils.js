var sizes=[];
sizes[0] = new create_size_key('quest_gallery',0,999,452,600); // small
sizes[1] = new create_size_key('quest_gallery',1000,1259,512,600); // 1024
sizes[2] = new create_size_key('quest_gallery',1260,1859,560,770); // 1366 - wide
sizes[3] = new create_size_key('quest_gallery',1860,4000,682,770); // HD

sizes[4] = new create_size_key('login',0,999,340,800);
sizes[5] = new create_size_key('login',1000,1259,340,800);
sizes[6] = new create_size_key('login',1260,1859,274,1100);
sizes[7] = new create_size_key('login',1860,4000,274,110);

sizes[8] = new create_size_key('dashboard_floating_menu',0,999,0,300);
sizes[9] = new create_size_key('dashboard_floating_menu',1000,1259,0,300);
sizes[10] = new create_size_key('dashboard_floating_menu',1260,1859,0,300);
sizes[11] = new create_size_key('dashboard_floating_menu',1860,4000,0,650);

sizes[12] = new create_size_key('students_table_main',0,999,450,650);
sizes[13] = new create_size_key('students_table_main',1000,1259,450,650);
sizes[14] = new create_size_key('students_table_main',1260,1859,550,750);
sizes[15] = new create_size_key('students_table_main',1860,4000,750,750);

sizes[16] = new create_size_key('students_table_names',0,999,0,200);
sizes[17] = new create_size_key('students_table_names',1000,1259,0,200);
sizes[18] = new create_size_key('students_table_names',1260,1859,0,200);
sizes[19] = new create_size_key('students_table_names',1860,4000,0,250);

sizes[20] = new create_size_key('example_games',0,999,0,840);
sizes[21] = new create_size_key('example_games',1000,1259,0,840);
sizes[22] = new create_size_key('example_games',1260,1859,0,920);
sizes[23] = new create_size_key('example_games',1860,4000,0,920);

sizes[24] = new create_size_key('game_head_div_example_games',0,999,-40,130);
sizes[25] = new create_size_key('game_head_div_example_games',1000,1259,-40,130);
sizes[26] = new create_size_key('game_head_div_example_games',1260,1859,0,160);
sizes[27] = new create_size_key('game_head_div_example_games',1860,4000,0,160);

function create_size_key(key,browser_min_w,browser_max_w,content_h,content_w) {
  this.key = key;
  this.browser_min_w = browser_min_w;
  this.browser_max_w = browser_max_w;
  this.content_h = content_h;
  this.content_w = content_w;
}


var waitstring = "";
function screen_size(key)
{
  obj = [0,0];
  for (var i = 0; i < sizes.length; i++)
  {
    if (sizes[i].key === key)
    {
	    	if ($(window).width()<=sizes[i].browser_max_w&&$(window).width()>=sizes[i].browser_min_w)
	    	{
  	    	obj = [sizes[i].content_h,sizes[i].content_w];
  	    	break;
	    	}
    	}
	}
  return(obj);//(content_hight,content_width)
}

function save_2_file(csvcontent,file_name,is_ie )
{
  if (is_ie === undefined) is_ie = false;
  if (is_ie == 'True')
    save_2_file_ie(csvcontent,file_name);
  else
    save_2_file_chrome(csvcontent,file_name );
}

function save_2_file_ie(content,file_name)
{

  var blob = new Blob([content],{
    type: "text/html;charset=utf-8,\uFEFF;",});
  navigator.msSaveBlob(blob,file_name + '.csv' );
}

function save_2_file_chrome(content,file_name)
{
	content = content.replace(/&#39;/g,"'"); // using regExp to replace all
	content = content.replace(/&#34;/g,"\"");
	content = content.replace(/&quot;/g,"\"");


  var csvContent = "data:text/csv;charset=utf-8,\uFEFF" + content;
  var encodedUri = encodeURI(csvContent);

  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", file_name + '.csv');
  link.click(); // This will download the file
  show_accessibility_popup('הקובץ הורד כבקשתך');
}


$(document).ready(function()
{
  $('div#teachers_reports_dialog').dialog
    ({
      autoOpen: false,
      width: 'auto',
      position: { my: 'left top', at: 'left top', of: "div#question_area"}, //DL-12
      show: 'blind',
      modal: true,
      buttons:
      {
        "סגירה": function()
        {
          $(this).dialog("close");
        }
      },
      close: function()
      {
        $(current_focused_element).focus();
      },
      create: function( event, ui ) {

        $(this).css("maxWidth", "950px");
      },
      open: function (event,ui) {
        //current_focused_element =   document.activeElement; // The focus is set before calling the dialog - and is onthe class line, not the actual report as this is closed after we start the report.
        $(".ui-icon-closethick").attr('aria-label','סגירה');

      },
    });
});


function show_static(content,div_id,close_popups,is_dialog, show_wait,post_app,params,post_action_call)
{
  if (close_popups === undefined) close_popups = false;
  if (is_dialog === undefined) is_dialog = false;
  if (show_wait === undefined) show_wait = false;
  if (params === undefined) params = {};
  if (post_action_call === undefined) post_action_call = null;
  // if (close_popups)   closeAllPopups();
  if (show_wait)
  {
    $("div#" + div_id).html(waitstring);
    if (is_dialog) $("div#" + div_id).dialog('open');
    if (typeof(params) == "object")
      if ('dialog_title_text' in params)
      {
        dialog_title_text = params.dialog_title_text;
        if ('dialog_title_div_name' in params) dialog_title_div_name = params.dialog_title_div_name;
        else dialog_title_div_name = null;
        accessibility_handle_popup_title(dialog_title_text,dialog_title_div_name);
      }
  }
  if (post_app === undefined) post_app = '/review/static/';
	$.post(post_app + content + "/",params,function(data)
	{
		$("div#" + div_id).html(data);
		if (is_dialog)
		{
		  $("div#" + div_id).dialog("option", "width",  'auto');
		  $("div#" + div_id).dialog('open');
		}
		else if ($("div#"+div_id).css('visibility') == 'hidden')
		{
		  $("div#"+div_id).css('visibility','visible');
		}
		if (post_action_call)
      post_action_call();
	});
}

openclose_vals = ['פתיחת טקסט חזרה','סגירת טקסט חזרה'];
function openclose_reminder(obj_id)
{
  $("div#reminder_div_" + obj_id).toggle(
      function ()
      {
        new_val = 1 - $("#openclose_reminder_button_" + obj_id).attr('myval');
        $("#openclose_reminder_button_" + obj_id).attr('myval',new_val);
        $("#openclose_reminder_button_" + obj_id).val(openclose_vals[new_val]);
      });
}

function show_video_item(code,size)
{
  if (size === undefined) size = 1;
  width = 400 * size;
  height = 300 * size;
  video_display=true;
  news_popup = "<iframe id='news_video_player' width='" + width + "' height='" + height + "' src='http://www.youtube.com/embed/" + code + "' frameborder='0' allowfullscreen> </iframe>";
  $('div#media_enlarge_view').html(news_popup);
  $('div#media_enlarge_view').dialog('open');
  $('div#media_enlarge_view').on( "dialogbeforeclose", function()
  {
    video_display=false;
    $('#news_video_player').attr("src","");
    return true;
  });  
}

function copy_text_2clipboard(text)
{
  if (!navigator.clipboard) 
  {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
}

