define(['durandal/app','knockout','plugins/router','plugins/dialog','calendar/fullcalendar'], function (app,ko,router,dialog,fullcalendar) {
    
	return {
        winno: ko.observable(0),
		winname: ko.observable(""),
		activate:function(){},
    	attached:function(){
			
			if ( appConfig.app.dbs==null)
             {
                // dialog.showMessage('请先登入系统',"新同事");
                 router.navigate('#');
				 return ;
                 
             }


			// alert(appConfig.app.winno);

			// alert(appConfig.app.winname);
			this.winno(appConfig.app.winno);
            this.winname(appConfig.app.winname);
			jQuery(document).ready(function() {
	
				var date = new Date();
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();
				var calendar = jQuery('#calendar').fullCalendar({
					header: {
						left: 'prev,next today',
						center: 'title',
						right: 'month,agendaWeek,agendaDay'
					},
					height:600,
					monthNames:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '11月', '12月'],
					dayNamesShort:['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
					buttonText: {
						prev: '上个月',
						next: '下个月',
						prevYear: '&nbsp;&lt;&lt;&nbsp;',
						nextYear: '&nbsp;&gt;&gt;&nbsp;',
						today: '回到今天',
						month: 'month',
						week: 'week',
						day: 'day'
					},
					// events: [
					// 	{
					// 		title: 'Meeting',
					// 		start: new Date(y, m, d, 10, 30),
					// 		end: new Date(y, m, d, 14, 0),
					// 		allDay: false
					// 	}
					// ],
					selectable:true,
					dayClick: function(date) {
						var newDate=date.toString();
						var yyyy=date.getFullYear();
						var mm=date.getMonth();
						var dd=date.getDate();
						//alert(yyyy);alert(mm);alert(dd);
						$('#calendar').fullCalendar( 'gotoDate', yyyy,mm,dd );
						//$('#calendar').fullCalendar('changeView',"agendaDay")
					}
				});
				$('.fc-header-right').empty();
				//$('.fc-border-separate').attr('style','height:700px');
			});
        }
		
    }
	
})