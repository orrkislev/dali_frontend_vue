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

/*
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
  if (close_popups)   closeAllPopups();
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
*/